<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetailPeminjaman extends Model
{
    protected $table = 'detail_peminjamen'; // ⬅️ tambahkan ini

    protected $fillable = [
        'peminjaman_id',
        'buku_id',
        'jumlah_pinjam',
        'kondisi_pinjam',
        'kondisi_kembali',
        'catatan',
    ];


    public function peminjaman()
    {
        return $this->belongsTo(Peminjaman::class);
    }

    public function buku()
    {
        return $this->belongsTo(Buku::class);
    }
};
