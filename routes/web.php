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


    // Kategory buku
    // Route::get('/data-buku', [KategoriBukuController::class, 'index'])->name('data-buku');
    Route::post('/data-buku/category', [KategoriBukuController::class, 'store'])->name('data-buku.store');
    Route::delete('/data-buku/category/{id}', [KategoriBukuController::class, 'destroy'])->name('data-buku.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
