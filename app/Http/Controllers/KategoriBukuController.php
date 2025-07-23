<?php

namespace App\Http\Controllers;

use App\Models\Kategori_buku;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KategoriBukuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $categories = Kategori_buku::all();

        return Inertia::render('data-buku/index',[
            'categories' => $categories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
      try{
        $validated = $request->validate([
            'nama_kategori' => 'required|string|max:50',
            'deskripsi' => 'required|string|max:255',
        ]);

        //Simpan
        Kategori_buku::create([
            'nama_kategori' => $validated['nama_kategori'],
            'deskripsi' => $validated['deskripsi'],
        ]);
        
        return redirect()->back()->with('success', 'Category berhasil ditambahkan.');

      } catch (\Exception $e) {
        return redirect()->back()->with('errorMessage', 'Gagal menambahkan user: ' . $e->getMessage());
      }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // dd($id);
        $category = Kategori_buku::find($id);

        if(!$category) {
            return back()->withErrors(['errorMessage' => 'Category no found.']);
        }

        $category->delete();
        return redirect()->back()->with('success', 'Category berhasil dihapus.');

    }
}
