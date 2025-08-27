<?php

namespace App\Http\Controllers;

use App\Models\Anggota;
use App\Models\Buku;
use App\Models\Peminjaman;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $jumlahbuku = Buku::count();
        $anggota = Anggota::count();
        $peminjaman = Peminjaman::where('status', 'Dipinjam')->count();
        $pengembalian = Peminjaman::where('status', 'Dikembalikan')->count();

        return Inertia::render('dashboard', [
            'jumlahbuku' => $jumlahbuku,
            'anggota' => $anggota,
            'peminjaman' => $peminjaman,
            'pengembalian' => $pengembalian
        ]);
    }
}
