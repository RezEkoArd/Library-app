export  interface Peminjaman {
      id: number;
      kode_peminjaman: string;
      tanggal_pinjam: string;
      tanggal_kembali_rencana: string;
      tanggal_kembali_actual: string | null;
      catatan: string | null;
      total_buku: number;
      status: string;
      created_at: string;
      updated_at: string;
    }