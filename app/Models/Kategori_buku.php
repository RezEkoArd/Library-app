<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kategori_buku extends Model
{
    //
    protected $fillable = [
        'nama_kategori',
        'deskripsi'
    ];
}
