<?php

namespace App\Http\Controllers;

use App\Exports\DetailPeminjamanReportExport;
use App\Exports\PeminjamanReportExport;
use App\Models\Peminjaman;
use App\Models\User;
use App\Http\Controllers\Carbon;
use App\Models\DetailPeminjaman;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon as SupportCarbon;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;


class ExcelExportController extends Controller
{

    public function index(Request $request) 
    {
        $month = $request->get('month', now()->month);
        $year = $request->get('year', now()->year);
        
        $peminjamans = Peminjaman::query()
            ->whereYear('created_at', $year)
            ->whereMonth('created_at', $month)
            ->with(['anggota', 'details', 'user', 'perpanjangan']) // jika diperlukan
            ->get();
    
        return Inertia::render('report/index', [
            'peminjamans' => $peminjamans,
        ]);
    }

    public function exportPeminjamanLaporan(Request $request) 
    {   
        // Validasi input Pengguna
        $month = (int) $request->query('month', date('n'));
        $year = (int)  $request->query('year', date('Y'));

        // Mengambil data
        $peminjamans = Peminjaman::query()
            ->whereYear('tanggal_pinjam', $year)
            ->whereMonth('tanggal_pinjam', $month)
            ->get();
            
        // Memanggil class export dan mengembalikan respons
        $exporter = new PeminjamanReportExport($peminjamans, $month, $year);

        return  $exporter->generate();
    }

    public function exportBukuDetailYangDipinjam(Request $request)
    {

        // Validasi input pengguna
        $month = (int) $request->query('month', date('n'));
        $year = (int)  $request->query('year', date('Y'));


        // Query
        $detailData = DetailPeminjaman::with([
            'peminjaman.anggota',
            'buku'
        ])  ->whereYear('created_at', $year)
            ->whereMonth('created_at', $month)
            ->get();

        // Selalu generate Excel, tidak peduli kosong atau tidak
        $exporter = new DetailPeminjamanReportExport($detailData, $month, $year);

        return $exporter->generate();
    }
}


