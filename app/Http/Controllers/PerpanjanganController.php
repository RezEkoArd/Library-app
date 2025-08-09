<?php

namespace App\Http\Controllers;

use App\Models\Peminjaman;
use App\Models\Perpanjangan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class PerpanjanganController extends Controller
{
    public function show($id)
    {
        $peminjaman = Peminjaman::findOrFail($id);
     
        return Inertia::render('perpanjangan/index', [
            'peminjaman' => $peminjaman,
        ]);
    }

    public function indexAdmin() {
        $perpanjangan = Perpanjangan::with(['peminjaman:id,kode_peminjaman', 'anggota:id,nama_anggota'])->get();
    
        return Inertia::render('perpanjangan/index-admin', [
            'perpanjangan' => $perpanjangan
        ]);
    }

    
    public function store(Request $request, string $id){

        $request->validate([
            'tanggal_kembali_baru' => 'required|date|after:peminjaman.tanggal_kembali_rencana',
        ]);

        $user = auth()->guard('web')->user();

    // ✅ Cek dulu apakah user punya data anggota
    if (!$user->anggota) {
        return redirect('/anggota')->with('errorMessage', 'Silakan lengkapi data anggota terlebih dahulu.');
    }

    $anggota = $user->anggota->id;
    $peminjaman = Peminjaman::findOrFail($id);

    // Simpan data perpanjangan
    Perpanjangan::create([
        'peminjaman_id' => $peminjaman->id,
        'anggota_id' => $anggota,
        'tanggal_perpanjangan' => now(), 
        'tanggal_kembali_baru' => $request->tanggal_kembali_baru,
    ]);

    $peminjaman->update([
        'tanggal_kembali_rencana' => $request->tanggal_kembali_baru
    ]);

    return redirect('peminjaman')->with('success', 'Perpanjangan berhasil disimpan');
    }
}
