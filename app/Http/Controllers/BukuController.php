<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Buku;
use App\Models\Kategori_buku;

class BukuController extends Controller
{
    public function index(Request $request) {

        // get search value
        $searchQuery = $request->input('search');

        //* $request->input('search'): Mengambil nilai dari parameter search di URL (contoh: /databuku?search=pemrograman).

        // Query Filter buku jika ada parameter 'search'
        $books = Buku::with('kategoriBuku')
            ->when($searchQuery, function ($query, $search) {
                return $query->where('judul_buku', 'like', "%{$search}%")
                            ->orWhere('penulis','like',"%{$search}%")
                            ->orWhere('penerbit','like',"%{$search}%")
                            ->orWhere('isbn','like',"%{$search}%");
            })
            ->latest()
            ->get();


        //Kirim data dan filter yang sedang aktif ke halaman buku
        return Inertia::render('data-buku/index',[
            'books' => $books,
            'categories' => Kategori_buku::all(),
            // Kirim kembali query filter
            'filters' => $request->only(['search'])
        ]);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'kategori_id' => 'required',
            'isbn' => 'required',
            'judul_buku' => 'required',
            'penulis' => 'required',
            'penerbit' => 'required',
            'tahun_terbit' => 'required',
            'bahasa' => 'required',
            'stok_total' => 'required',
            'stok_tersedia' => 'required',
            'deskripsi' => 'required',
        ]);

        $buku = Buku::create([
            'judul_buku' => $request->judul_buku,
            'kategori_id' => $request->kategori_id,
            'penulis' => $request->penulis,
            'penerbit' => $request->penerbit,
            'isbn' => $request->isbn
        ]);

        return redirect()->back()->with('success', 'Buku berhasil ditambahkan.');
    }
}
