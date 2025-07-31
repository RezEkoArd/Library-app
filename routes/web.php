<?php

use App\Http\Controllers\AnggotaController;
use App\Http\Controllers\BukuController;
use App\Http\Controllers\KategoriBukuController;
use App\Http\Controllers\PeminjamanController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Dashboard

//? ini untuk mencegah user ke halaman login jika sudah login
Route::get('/dashboard', function() {
    if (Auth::check()) {
        return redirect()->route('dashboard');
    }
    return Inertia::render('auth/login');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Peminjaman Admin
    Route::get('/peminjaman-admin', [PeminjamanController::class, 'indexAdmin'])->name('peminjaman-admin');

    // Peminjaman Siswa
    Route::get('/peminjaman', [PeminjamanController::class, 'index'])->name('peminjaman');
    Route::get('/peminjaman/create', [PeminjamanController::class, 'create'])->name('peminjaman.create');
    Route::post('/peminjaman', [PeminjamanController::class, 'store'])->name('peminjaman.store');
    Route::put('/peminjaman-edit/{id}', [PeminjamanController::class, 'update'])->name('peminjaman.update');
    Route::get('/peminjaman-edit/{id}/edit', [PeminjamanController::class, 'edit'])->name('peminjaman.edit');
    Route::delete('/peminjaman/{id}', [PeminjamanController::class, 'delete'])->name('peminjaman.destroy');


    // Anggota User 
    Route::get('/anggota', [AnggotaController::class, 'index'])->name('anggota.index');  
    Route::post('/anggota', [AnggotaController::class, 'store'])->name('anggota.store');

    Route::get('/anggota-admin', [AnggotaController::class, 'indexAdmin'])->name('anggota-admin.index');
    Route::put('/anggota-admin/{id}', [AnggotaController::class, 'updateAdmin'])->name('anggota-admin.update');

    // Buku
    Route::get('/data-buku', [BukuController::class, 'index'])->name('data-buku');
    Route::post('/data-buku', [BukuController::class, 'store'])->name('data-buku.store');
    Route::delete('/data-buku/book/{id}', [BukuController::class, 'destroy'])->name('data-buku.destroy');
    Route::get('/data-buku/book/edit/{id}', [BukuController::class, 'edit'])->name('data-buku.edit');
    Route::put('/data-buku/book/{id}', [BukuController::class, 'update'])->name('data-buku.update');
    

    // Chart Data
    Route::get('/api/chart/buku-kategori', [BukuController::class, 'getChartData']);
    Route::get('/api/chart/buku-stok', [BukuController::class, 'getStockChartData']);

    // Kategory buku
    Route::post('/data-buku/category', [KategoriBukuController::class, 'store'])->name('data-buku.store');
    Route::delete('/data-buku/category/{id}', [KategoriBukuController::class, 'destroy'])->name('data-kategori.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
