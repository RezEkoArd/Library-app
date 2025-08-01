// types/peminjaman.ts

export interface Peminjaman {
    id: number;
    anggota_id: number;
    petugas_id: number;
    kode_peminjaman: string;
    tanggal_pinjam: string;
    tanggal_kembali_rencana: string;
    tanggal_kembali_actual: string | null;
    total_buku: number;
    status: string;
    catatan: string;
    price: number;
    created_at: string;
    updated_at: string;
  
    anggota: Anggota;
    user: Petugas;
    details: DetailPeminjaman[];
  }
  
  export interface Anggota {
    id: number;
    nama_anggota: string;
    // tambahkan properti lain jika diperlukan
  }
  
  export interface Petugas {
    id: number;
    name: string;
    email: string;
  }
  
  export interface DetailPeminjaman {
    id: number;
    peminjaman_id: number;
    buku_id: number;
    jumlah_pinjam: number;
    kondisi_pinjam: string;
    kondisi_kembali: string;
    catatan: string;
    created_at: string;
    updated_at: string;
  
    buku: Buku;
  }
  
  export interface Buku {
    id: number;
    judul_buku: string;
    penulis: string;
    penerbit: string;
    tahun_terbit: string;
    // tambahkan kolom lain jika diperlukan
  }

export interface PeminjamanDetailPageProps extends Record<string, any>{
    peminjaman: Peminjaman;
}
