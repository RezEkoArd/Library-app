<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kategori_buku extends Model
{

    protected $fillable = [
        'nama_kategori',
        'deskripsi'
    ];

    public function bukus()
    {
        return $this->hasMany(Buku::class, 'kategori_id');
    }

}