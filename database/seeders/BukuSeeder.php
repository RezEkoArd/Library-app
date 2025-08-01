<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BukuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('bukus')->insert([
            [
                'kategori_id' => 1,
                'isbn' => '978-602-03-1234-5',
                'judul_buku' => 'Pemrograman Web dengan Laravel',
                'penulis' => 'Ahmad Ramadhan',
                'penerbit' => 'Informatika Bandung',
                'tahun_terbit' => '2023',
                'bahasa' => 'Indonesia',
                'stok_total' => 10,
                'stok_tersedia' => 10,
                'deskripsi' => 'Panduan praktis membangun aplikasi web menggunakan Laravel.'
            ],
            [
                'kategori_id' => 2,
                'isbn' => '978-979-29-1234-1',
                'judul_buku' => 'Dasar-Dasar Pemrograman Python',
                'penulis' => 'Siti Nurhaliza',
                'penerbit' => 'Elex Media Komputindo',
                'tahun_terbit' => '2021',
                'bahasa' => 'Indonesia',
                'stok_total' => 10,
                'stok_tersedia' => 10,
                'deskripsi' => 'Cocok untuk pemula yang ingin belajar Python dari nol.'
            ],
            [
                'kategori_id' => 1,
                'isbn' => '978-623-45-6789-2',
                'judul_buku' => 'Belajar Java untuk Pemula',
                'penulis' => 'Budi Santoso',
                'penerbit' => 'Gramedia',
                'tahun_terbit' => '2020',
                'bahasa' => 'Indonesia',
                'stok_total' => 10,
                'stok_tersedia' => 10,
                'deskripsi' => 'Buku dasar Java dengan contoh kasus praktis.'
            ],
            [
                'kategori_id' => 3,
                'isbn' => '978-602-03-6789-0',
                'judul_buku' => 'Fiksi Detektif: Jejak Sang Pembunuh',
                'penulis' => 'Rina Kartika',
                'penerbit' => 'Bentang Pustaka',
                'tahun_terbit' => '2019',
                'bahasa' => 'Indonesia',
                'stok_total' => 10,
                'stok_tersedia' => 10,
                'deskripsi' => 'Cerita fiksi detektif yang penuh teka-teki dan ketegangan.'
            ],
            [
                'kategori_id' => 4,
                'isbn' => '978-602-45-9876-4',
                'judul_buku' => 'Psikologi Remaja Modern',
                'penulis' => 'Dr. Ika Susanti',
                'penerbit' => 'Andi Publisher',
                'tahun_terbit' => '2022',
                'bahasa' => 'Indonesia',
                'stok_total' => 10,
                'stok_tersedia' => 10,
                'deskripsi' => 'Membahas perilaku dan tantangan remaja masa kini.'
            ],
            [
                'kategori_id' => 2,
                'isbn' => '978-602-03-5432-1',
                'judul_buku' => 'Mahir HTML dan CSS',
                'penulis' => 'Doni Pratama',
                'penerbit' => 'Maxikom',
                'tahun_terbit' => '2021',
                'bahasa' => 'Indonesia',
                'stok_total' => 10,
                'stok_tersedia' => 10,
                'deskripsi' => 'Referensi dasar untuk membangun website statis.'
            ],
            [
                'kategori_id' => 1,
                'isbn' => '978-979-29-2345-6',
                'judul_buku' => 'Laravel Lanjut: Membangun REST API',
                'penulis' => 'Ahmad Fauzi',
                'penerbit' => 'Informatika Bandung',
                'tahun_terbit' => '2024',
                'bahasa' => 'Indonesia',
                'stok_total' => 10,
                'stok_tersedia' => 10,
                'deskripsi' => 'Teknik lanjut membuat REST API menggunakan Laravel 10.'
            ],
            [
                'kategori_id' => 5,
                'isbn' => '978-602-03-1122-3',
                'judul_buku' => 'Filsafat Ilmu: Dasar dan Aplikasi',
                'penulis' => 'Prof. Agus Salim',
                'penerbit' => 'Rajagrafindo Persada',
                'tahun_terbit' => '2018',
                'bahasa' => 'Indonesia',
                'stok_total' => 10,
                'stok_tersedia' => 10,
                'deskripsi' => 'Membahas dasar-dasar filsafat dan implementasinya di ilmu pengetahuan.'
            ],
            [
                'kategori_id' => 3,
                'isbn' => '978-602-03-3344-5',
                'judul_buku' => 'Kumpulan Cerpen: Senja dan Hujan',
                'penulis' => 'Arief Darmawan',
                'penerbit' => 'Gagas Media',
                'tahun_terbit' => '2020',
                'bahasa' => 'Indonesia',
                'stok_total' => 10,
                'stok_tersedia' => 10,
                'deskripsi' => 'Cerpen-cerpen romantis penuh makna dan emosi.'
            ],
            [
                'kategori_id' => 4,
                'isbn' => '978-623-45-1111-0',
                'judul_buku' => 'Self Healing untuk Jiwa yang Lelah',
                'penulis' => 'Nadia Safira',
                'penerbit' => 'Bhuana Ilmu Populer',
                'tahun_terbit' => '2023',
                'bahasa' => 'Indonesia',
                'stok_total' => 10,
                'stok_tersedia' => 10,
                'deskripsi' => 'Tips dan refleksi untuk menyembuhkan diri secara mental dan emosional.'
            ],
        ]);
    }
}
