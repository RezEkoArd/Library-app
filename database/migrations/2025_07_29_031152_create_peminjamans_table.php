<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('peminjamans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('petugas_id')->constrained('anggotas')->onDelete('cascade');
            $table->string('kode_peminjaman');
            $table->date('tanggal_peminjaman');
            $table->date('tanggal_kembali_rencana');
            $table->date('tanggal_kembali_actual');
            $table->integer('total_buku');
            $table->string('catatan');
            $table->integer('price');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('peminjamans');
    }
};
