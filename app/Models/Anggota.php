<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class Anggota extends Model
{
    //
    protected $fillable = [
        'user_id',
        'nama_anggota',
        'nama_lengkap',
        'alamat',
        'no_telp',
        'email',
        'jenis_anggota',
        'status',
    ];

    public function user() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function peminjaman() {
        return $this->hasMany(Peminjaman::class);
    }
    
}
