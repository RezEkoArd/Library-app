<?php

namespace App\Http\Controllers;

use App\Exports\PeminjamanReportExport;
use App\Models\Peminjaman;
use App\Models\User;
use App\Http\Controllers\Carbon;
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
        $validator = Validator::make($request->all(), [
            'month' => 'required|integer|between:1,12',
            'year' => 'required|integer|min:2000',
        ]);

        // Jika validasi gagal, kembalikan respon error
        if ($validator->fails()) {
            
            if ($request->expectsJson()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }
            
            // Jika request dari web
            return Inertia::render('report/index', [
                'errorMessage' => 'Data yang dimasukkan tidak valid.',
                'errors' => $validator->errors()
            ]);
        }

        $validated = $validator->validated();
        $month = $validated['month'];
        $year = $validated['year'];


        // Mengambil data
        $peminjamans = Peminjaman::query()
            ->whereYear('tanggal_pinjam', $year)
            ->whereMonth('tanggal_pinjam', $month)
            ->get();

        
        //Perbaikan cek dan kirim respons sesuai kebutuhan
        if ($peminjamans->isEmpty())
        {
            return Inertia::render('report/index', [
                'errorMessage' => 'Tidak ada data peminjaman untuk periode yang dipilih.'
            ]);
        }

        // Memanggil class export dan mengembalikan respons
        $exporter = new PeminjamanReportExport($peminjamans, $month, $year);

        return  $exporter->generate();
    }
}
