<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Peminjaman extends Model
{
  protected $fillable = [
    'anggota_id',
    'petugas_id',
    'kode_peminjaman',
    'tanggal_pinjam',
    'tanggal_kembali_rencana',
    'tanggal_kembali_actual',
    'total_buku',
    'status',
    'catatan',  
    'price'
  ]; 

  protected $casts = [
    'tanggal_pinjam' => 'date',
    'tanggal_kembali_rencana' => 'date',
    'tanggal_kembali_actual' => 'date',
    'price' => 'integer',
    'total_buku' => 'integer',
  ];


//   Relasi nya 
  public function details(): HasMany
  {
    return $this->hasMany(DetailPeminjaman::class, 'peminjaman_id');
  }

}
