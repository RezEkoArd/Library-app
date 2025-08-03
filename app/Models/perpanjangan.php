<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class perpanjangan extends Model
{
    protected $fillable = [
        'peminjaman_id',
        'petugas_id',
        'tanggal_perpanjangan',
        'tanggal_kembali_baru',
    ];

    public function peminjaman()
    {
        return $this -> belongsTo(Peminjaman::class);
    }
}
