<?php

namespace App\Http\Controllers;

use App\Models\Buku;
use App\Models\Peminjaman;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PeminjamanController extends Controller
{

    public function indexAdmin() {
        $peminjaman = Peminjaman::with( ['anggota','user'] )->get();
        return Inertia::render('peminjaman/index-admin', [
            'peminjaman' => $peminjaman
        ]);
    }

    public function index() {
        $user = auth()->guard('web')->user();
        $anggota = $user->anggota;

        if (!$anggota) {
            return redirect()->back()->with('errorMessage', 'Kamu belum terdaftar sebagai anggota.');
        }

        $anggotaId = $anggota->id;


        $books = Buku::all();

        $peminjaman = Peminjaman::with(['details','anggota','user'])
        ->where('anggota_id', $anggotaId)
        ->get();

        return Inertia::render('peminjaman/index', [
            'peminjaman' => $peminjaman,
            'bukus' => $books,
            'anggota_id' => $anggotaId,
        ]);
    }

    public function create() {
        $user = auth()->guard('web')->user();

    // Cek apakah user sudah menjadi anggota
    if (!$user->anggota) {
        return redirect('/anggota')->with('warning', 'Silakan lengkapi data anggota terlebih dahulu.');
    }

    $anggotaId = $user->anggota->id;
    $books = Buku::all();

    return Inertia::render('peminjaman/peminjaman-create', [
        'anggota_id' => $anggotaId,
        'books' => $books,
    ]);
    }

    public function store(Request $request)
{
    $validated = $request->validate([
        'anggota_id' => 'required|exists:anggotas,id',
        'tanggal_kembali_rencana' => 'required|date',
        'catatan' => 'nullable|string',
        'details' => 'required|array|min:1',
        'details.*.buku_id' => 'required|exists:bukus,id',
        'details.*.jumlah_pinjam' => 'required|integer|min:1',
        'details.*.kondisi_pinjam' => 'required|string',
        'details.*.catatan' => 'nullable|string',
    ]);

    try {
        DB::transaction(function () use ($validated) {
            $totalBuku = collect($validated['details'])->sum('jumlah_pinjam');
            $nextId = (Peminjaman::max('id') ?? 0) + 1;

            $peminjaman = Peminjaman::create([
                'anggota_id' => $validated['anggota_id'],
                'petugas_id' => auth()->guard('web')->user()->id,
                'kode_peminjaman' => 'PMJ-' . $nextId,
                'tanggal_pinjam' => now(),
                'tanggal_kembali_rencana' => $validated['tanggal_kembali_rencana'],
                'tanggal_kembali_actual' => null,
                'total_buku' => $totalBuku,
                'status' => 'menunggu',
                'catatan' => $validated['catatan'],
                'price' => 0,
            ]);

            $detailData = [];

            foreach ($validated['details'] as $detail) {
                $buku = Buku::where('id', $detail['buku_id'])->lockForUpdate()->first();

                if ($buku->stok_tersedia < $detail['jumlah_pinjam']) {

                    throw new Exception("Stok buku \"{$buku->judul_buku}\" tidak mencukupi.");
                }

                $buku->decrement('stok_tersedia', $detail['jumlah_pinjam']);

                $detailData[] = [
                    'buku_id' => $buku->id,
                    'jumlah_pinjam' => $detail['jumlah_pinjam'],
                    'kondisi_pinjam' => $detail['kondisi_pinjam'],
                    'kondisi_kembali' => '-',
                    'catatan' => $detail['catatan'] ?? '',
                ];
            }

            $peminjaman->details()->createMany($detailData);
        });

        return redirect()->route('peminjaman')->with('success', 'Peminjaman berhasil disimpan.');
    } catch (Exception $e) {
        return redirect('/peminjaman/create')
            ->withInput()
            ->with('errorMessage', $e->getMessage() ?? 'Terjadi kesalahan saat menyimpan.');
    }
}



    public function edit(string $id) {
        $books = Buku::all();;
        $peminjaman = Peminjaman::with(['details','anggota','user'])->find($id);
        // dd($peminjaman);

        return Inertia::render('peminjaman/peminjaman-update', [
            'peminjaman' => $peminjaman,
            'books' => $books
        ]);
    }


    public function update(Request $request, $id) {
        $validated = $request -> validate([
            'tanggal_kembali_actual' => 'nullable|date',
            'status' => 'required|string',
        ]);

        $peminjaman = Peminjaman::findOrFail($id);
        $peminjaman->update($validated);

        return redirect('/peminjaman-admin')->with('success', 'Peminjaman berhasil di update.');
    }

    public function delete($id) {
        $peminjaman = Peminjaman::findOrFail($id);

        $peminjaman->delete();
        // Opsi: kamu bisa juga mengecek apakah status belum dikembalikan, dsb.
        if ($peminjaman->status === 'dikembalikan') {
            return redirect()->back()->with('errorMessage', 'Data peminjaman yang sudah dikembalikan tidak bisa dihapus.');
        }


        return redirect('/peminjaman-admin')->with('errorMessage', 'Peminjaman berhasil di hapus.');
    }

    public function show($id) {
        $peminjaman = Peminjaman::with([
            'anggota',
            'user',
            'details.buku' //Detail_peminjaman dan relasi ke buku
        ])->findOrFail($id);

        return Inertia::render('peminjaman/peminjaman-detail', [
            'peminjaman' => $peminjaman
        ]);
    }   
}


