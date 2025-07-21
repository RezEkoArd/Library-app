<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use function PHPUnit\Framework\returnSelf;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Gunakan switch-case atau if-else untuk mengecek role
        switch ($user->role){
            case 'admin':
                // Jika role adalah 'admin', render komponen Admin/Dashboard.jsx
                //  Anda juga bisa mengirim data khusus untuk admin
                return Inertia::render('dashboard/dashboard_admin', [
                    'totalUser' => \App\Models\User::count(),
                    'pageTitle' => 'Dashboard Administrator',
                ]);

            case 'guru':
                // Jika role adalah 'guru', render komponen Guru/Dashboard.jsx
                //  Anda juga bisa mengirim data khusus untuk guru
                return Inertia::render('dashboard/dashboard_guru', [
                    // Contoh data untuk guru: daftar siswa di kelasnya
                    // 'students' => $user->students()->get(), 
                    'pageTitle' => 'Dashboard Guru',
                ]);

            case 'siswa':
                // Jika role adalah 'siswa', render komponen Siswa/Dashboard.jsx
                return Inertia::render('dashboard/dashboard_siswa', [
                    // Contoh data untuk siswa: nilai atau jadwal
                    // 'grades' => $user->grades()->get(),
                    'pageTitle' => 'Dashboard Siswa'
                ]);

            default: 
                // Jika role tidak terdefinisi, arahkan ke halaman default atau error
                return Inertia::render('ErrorPage');
        }
    }
}
