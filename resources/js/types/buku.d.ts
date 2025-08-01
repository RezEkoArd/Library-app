// Kategori buku
export interface KategoriBuku {
    id: number;
    nama_kategori: string;
    deskripsi: string;
    created_at: string;
    updated_at: string;
  }
  
  // Buku
  export interface Buku {
    id: number;
    kategori_id: number;
    isbn: string;
    judul_buku: string;
    penulis: string;
    penerbit: string;
    tahun_terbit: string;
    bahasa: string;
    stok_total: number;
    stok_tersedia: number;
    deskripsi: string;
    created_at: string;
    updated_at: string;
    kategoriBuku: KategoriBuku;
  }
  
  // Props untuk halaman
  export interface BukuIndexPageProps extends Record<string, any> {
    bukus: Buku[];
    search: string | null;
  }
  