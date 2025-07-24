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
}
