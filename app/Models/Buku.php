<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Buku extends Model
{
    protected $guarded = [];

    public function kategoriBuku()
    {
        return $this->belongsTo(Kategori_buku::class, 'kategori_id');
    }

}
