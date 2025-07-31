<?php

namespace App\Http\Controllers;

use App\Models\Buku;
use App\Models\Peminjaman;
use Illuminate\Http\Request;
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
        $books = Buku::all();
        $anggotaId = auth()->guard('web')->user()->anggota->id;
        

        return Inertia::render('peminjaman/peminjaman-create', [
            'anggota_id' => $anggotaId,
            'books' => $books
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'anggota_id' => 'required|exists:anggotas,id',
            'tanggal_kembali_rencana' => 'required|date',
            'catatan' => 'nullable| string',
            'details' => 'required| array | min:1',
            'details.*.buku_id' => 'required|exists:bukus,id',
            'details.*.jumlah_pinjam' => 'required|integer|min:1',
            'details.*.kondisi_pinjam' => 'required|string',
            'details.*.catatan' => 'nullable|string',
        ]);

        $totalBuku = collect($validated['details'])->sum('jumlah_pinjam');


        $lastId = Peminjaman::max('id') ?? 0;
        $nextNumber = $lastId + 1;
        $kodePeminjaman = 'PMJ-' . $nextNumber;

        // Simpan data peminjaman
        $peminjaman = Peminjaman::create([
            'anggota_id' => $validated['anggota_id'],
            'petugas_id' => auth()->guard('web')->user()->id,
            'kode_peminjaman' => $kodePeminjaman,
            'tanggal_pinjam' => now(),
            'tanggal_kembali_rencana' => $validated['tanggal_kembali_rencana'],
            'tanggal_kembali_actual' => null,
            'total_buku' => $totalBuku,
            'status' => 'menunggu',
            'catatan' => $validated['catatan'],
            'price' => 0,
        ]);

        // Simpan semua detail buku
        $detailData = collect($validated['details'])->map(function ($detail) {
            return [
                'buku_id' => $detail['buku_id'],
                'jumlah_pinjam' => $detail['jumlah_pinjam'],
                'kondisi_pinjam' => $detail['kondisi_pinjam'],
                'kondisi_kembali' => '-',
                'catatan' => $detail['catatan'] ?? '',
            ];
        })->toArray();


        $peminjaman->details()->createMany($detailData);

        return redirect()->route('peminjaman')->with('success', 'Peminjaman berhasil disimpan.');        
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
}
