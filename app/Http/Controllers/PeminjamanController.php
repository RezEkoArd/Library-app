<?php

namespace App\Http\Controllers;

use App\Models\Buku;
use App\Models\Peminjaman;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PeminjamanController extends Controller
{
    public function index() {
        $peminjaman = Peminjaman::with( ['anggota','user'] )->get();

        return Inertia::render('peminjaman/index', [
            'peminjaman' => $peminjaman
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'anggota_id' => 'required|exists:anggotas, id',
            'tanggal_kembali_rencana' => 'required|date',
            'catatan' => 'nullable| string',
            'details' => 'required| array | min:1',
            'details.*.buku_id' => 'required|exists:bukus,id',
            'details.*.jumlah_pinjam' => 'required|integer|min:1',
            'details.*.kondisi_pinjam' => 'required|string',
            'details.*.catatan' => 'nullable|string',
        ]);

        $totalBuku = collect($validated['details'])->sum('jumlah_pinjam');

        // Simpan data peminjaman
        $peminjaman = Peminjaman::create([
            'anggota_id' => $validated['anggota_id'],
            'petugas_id' => auth()->guard('web')->user()->id,
            'kode_peminjaman' => 'PMJ-' . time(),
            'tanggal_kembali_rencana' => $validated['tanggal_kembali_rencana'],
            'tanggal_kembali_actual' => null,
            'total_buku' => $totalBuku,
            'status' => 'dipinjam',
            'catatan' => $validated['catatan'],
            'price' => 0, // Default value  
        ]);

        // Simpan semua detail buku
        $datailData = collect($validated['details'])->map(function ($detail) {
            return [
                'buku_id' => $detail['buku_id'],
                'jumlah_pinjam' => $detail['jumlah_pinjam'],
                'kondisi_pinjam' => $detail['kondisi_pinjam'],
                'kondisi_kembali' => '-',
                'catatan' => $detail['catatan'] ?? '',
            ];
        })->toArray();


        $peminjaman->details()->createMany($datailData);

        return response()->json([
            'message' => 'Peminjaman berhasil disimpan.',
            'data' => $peminjaman->load('details'),
        ], 201);
        
    }
}
