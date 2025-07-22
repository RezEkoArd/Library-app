<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KategoriBukuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now();

        $categories = [
            [
                'nama_kategori' => 'Fiksi',
                'deskripsi' => 'Buku yang berisi cerita imajinatif atau rekaan, tidak berdasarkan kejadian nyata.',
            ],
            [
                'nama_kategori' => 'Non-Fiksi',
                'deskripsi' => 'Buku yang didasarkan pada fakta, data, atau kejadian nyata.',
            ],
            [
                'nama_kategori' => 'Biografi',
                'deskripsi' => 'Buku yang menceritakan kisah hidup seseorang, baik tokoh terkenal maupun inspiratif.',
            ],
            [
                'nama_kategori' => 'Sains dan Teknologi',
                'deskripsi' => 'Buku yang membahas pengetahuan ilmiah dan kemajuan teknologi.',
            ],
            [
                'nama_kategori' => 'Sejarah',
                'deskripsi' => 'Buku yang membahas peristiwa-peristiwa penting di masa lalu.',
            ],
            [
                'nama_kategori' => 'Agama dan Spiritualitas',
                'deskripsi' => 'Buku yang membahas topik keagamaan, moralitas, dan kehidupan spiritual.',
            ],
            [
                'nama_kategori' => 'Anak-anak',
                'deskripsi' => 'Buku dengan cerita dan konten edukatif yang cocok untuk pembaca usia dini.',
            ],
            [
                'nama_kategori' => 'Pendidikan',
                'deskripsi' => 'Buku pelajaran, teori pendidikan, dan referensi akademik lainnya.',
            ],
            [
                'nama_kategori' => 'Bisnis dan Ekonomi',
                'deskripsi' => 'Buku yang membahas dunia usaha, manajemen, keuangan, dan pengembangan karier.',
            ],
            [
                'nama_kategori' => 'Sastra Klasik',
                'deskripsi' => 'Karya sastra terkenal dari zaman dahulu yang memiliki nilai sastra tinggi.',
            ],
        ];

        // Tambahkan timestamp created_at dan updated_at
        foreach ($categories as &$category) {
            $category['created_at'] = $now;
            $category['updated_at'] = $now;
        }

        DB::table('kategori_bukus')->insert($categories);
    }
}
