<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Perpanjangan extends Model
{
    protected $fillable = [
        'peminjaman_id',
        'anggota_id',
        'tanggal_perpanjangan',
        'tanggal_kembali_baru',
    ];

    public function peminjaman()
    {
        return $this -> belongsTo(Peminjaman::class);
    }

    public function anggota()
    {
        return $this -> belongsTo(Anggota::class);
    }   
}
