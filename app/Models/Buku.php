<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Buku extends Model
{
    protected $fillable = [
        'kategori_id',
        'isbn',
        'judul_buku',
        'penulis',
        'penerbit',
        'tahun_terbit',
        'bahasa',
        'stok_total',
        'stok_tersedia',
        'deskripsi',
    ];

    public function kategoriBuku()
    {
        return $this->belongsTo(Kategori_buku::class, 'kategori_id');
    }

}
