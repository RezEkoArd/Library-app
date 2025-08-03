<?php

namespace App\Http\Controllers;

use App\Models\Peminjaman;
use App\Models\perpanjangan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PerpanjanganController extends Controller
{
    public function show($id)
    {
        $peminjaman = Peminjaman::findOrFail($id);
        $petugas_id = auth()->guard('web')->user()->id;
    
        return Inertia::render('perpanjangan/index', [
            'peminjaman' => $peminjaman,
            'petugas_id' => $petugas_id
        ]);
    }


    public function store(Request $request, string $id){

        $request->validate([
            'tanggal_kembali_baru' => 'required|date|after:peminjaman.tanggal_kembali_rencana',
        ]);

        $peminjaman = Peminjaman::findOrFail($id);

        // Simpan Peminjaman
        perpanjangan::create([
            'peminjaman_id' => $peminjaman->id,
            'petugas_id' => auth()->guard('web')->user()->id,
            'tanggal_perpanjangan' => now(), 
            'tanggal_kembali_baru' => $request->tanggal_kembali_baru,
        ]);

        $peminjaman->update([
            'tanggal_kembali_rencana' => $request->tanggal_kembali_baru
        ]);

        return redirect('peminjaman')->with('success', 'Perpanjangan berhasil disimpan');
    }
}
