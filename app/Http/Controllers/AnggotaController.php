<?php

namespace App\Http\Controllers;

use App\Models\Anggota;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;    // Jika diperlukan


class AnggotaController extends Controller
{
    //
    public function index()
    {
        $id = auth()->guard('web')->user()->id;

        $anggota = Anggota::where('user_id', $id)->first(); 

        return Inertia::render('anggota/index',[
            'anggota' => $anggota
        ]);
    }

    /**
     * Tentukan jenis anggota berdasarkan role user
     */
    private function getJenisAnggotaByRole($role)
    {
        switch (strtolower($role)) {
            case 'siswa':
                return 'Siswa';
            case 'guru':
                return 'Guru';
            case 'staff':
                return 'Staff';
            case 'user':
            default:
                return 'Anggota Umum';
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_anggota' => 'required|string|max:255',    
            'nama_lengkap' => 'required|string|max:255',
            'alamat' => 'required|string|max:255',
            'no_telp' => 'required|string|min:10|max:13',
            'email' => 'required|string|email|max:100|unique:anggotas,email',
        ]);

        // status default 1
        // Jenis anggota tergantung dengan role akun
        // user_id tergantung dengan user yang login

        // * Cek user apakah sudah memiliki data anggota
        $existingAnggota = Anggota::where('user_id', auth()->guard('web')->user()->id)->first();
        if ($existingAnggota) {
            return redirect()->back()->with('errorMessage', 'Anda sudah memiliki data anggota.');
        }

        // Get user login
        $user = auth()->guard('web')->user();

        // tentukan jenis anggota berdasarkan role
        $jenisAnggota = $this->getJenisAnggotaByRole($user->role);

        // gabungkan data
        $dataAnggota = array_merge($validated, [
            'user_id' => $user->id,
            'jenis_anggota' => $jenisAnggota,
            'status' => false,
        ]);

        try {
            Anggota::create($dataAnggota);
            return redirect()->back()->with('success', 'Pendaftaran anggota berhasil! Menunggu persetujuan admin.');
        } catch (\Exception $e) {
            return redirect()->back()->with('errorMessage', 'Terjadi kesalahan saat menyimpan data anggota.');
        }
    }
}
