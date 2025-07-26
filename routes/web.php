<?php

use App\Http\Controllers\BukuController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\KategoriBukuController;
use App\Models\Kategori_buku;
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
