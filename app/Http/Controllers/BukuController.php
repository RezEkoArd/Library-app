<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Buku;
use App\Models\Kategori_buku;

class BukuController extends Controller
{
    public function indexAdmin(Request $request) {

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
        return Inertia::render('data-buku/index-admin',[
            'books' => $books,
            'categories' => Kategori_buku::all(),
            // Kirim kembali query filter
            'filters' => $request->only(['search'])
        ]);
    }

    public function index(Request $request) {
        $search = $request->input('search');

        $bukus = Buku::with('kategoriBuku')
            ->when($search, function ($query, $search) {
                $query->where('judul_buku', 'like', "%{$search}%")
                    ->orWhere('penulis', 'like', "%{$search}%")
                    ->orWhere('penerbit', 'like', "%{$search}%")
                    ->orWhere('isbn', 'like', "%{$search}%");
            })
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('data-buku/index', [
            'bukus' => $bukus,
            'search' => $search,
        ]);
    }

    public function show(string $id) {
        $book = Buku::with('kategoriBuku')->find($id);

        return Inertia::render('data-buku/show', [
            'book' => $book,
        ]);
    }



    public function store(Request $request) {

        $validated = $request->validate([
            'kategori_id' => 'required|exists:kategori_bukus,id',
            'isbn' => 'required|string|max:20',
            'judul_buku' => 'required|string|max:255',
            'penulis' => 'required|string|max:255',
            'penerbit' => 'required|string|max:255',
            'tahun_terbit' => 'required|integer',
            'bahasa' => 'required|string|max:100',
            'stok_total' => 'required|integer|max:255',
            'stok_tersedia' => 'required|integer|max:255',
            'deskripsi' => 'required|string|max:255',
        ]);

        Buku::create($validated);

        return redirect()->back()->with('success', 'Buku berhasil ditambahkan.');
    }

    public function edit(string $id) {
        $categories = Kategori_buku::all();
        $book = Buku::find($id)->with('kategoriBuku')->first();

        return Inertia::render('data-buku/edit-buku',[
            'book' => $book,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, string $id) {
        $validated = $request->validate([
            'kategori_id' => 'required|exists:kategori_bukus,id',
            'isbn' => 'required|string|max:20',
            'judul_buku' => 'required|string|max:255',
            'penulis' => 'required|string|max:255',
            'penerbit' => 'required|string|max:255',
            'tahun_terbit' => 'required|integer',
            'bahasa' => 'required|string|max:100',
            'stok_total' => 'required|integer|max:255',
            'stok_tersedia' => 'required|integer|max:255',
            'deskripsi' => 'required|string|max:255',
        ]);

        $book = Buku::find($id);
        $book->update($validated);
        return redirect()->route('data-buku')->with('success', 'Buku berhasil di update.');
    }

    public function destroy(string $id) {
        $book = Buku::find($id);

        if(!$book) {
            return back()->withErrors(['errorMessage' => 'Book no found.']);
        }

        $book->delete();
        return redirect()->back()->with('success', 'Book berhasil di hapus.');
    }
}
