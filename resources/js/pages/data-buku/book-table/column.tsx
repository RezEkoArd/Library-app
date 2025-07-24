"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Book = {
  id: string
  isbn: string
  judul_buku: string
  penulis: string
  penerbit: string
  tahun_terbit: number
  bahasa: string
  stok_total: number
  stok_tersedia: number
  deskripsi: string
  kategori_buku?: {  
    id: string
    nama_kategori: string
  }

}

export const columnsBook: ColumnDef<Book>[] = [
  {
    accessorKey: "index",
    header: "No",
    cell: ({row}) => row.index + 1,
  },
  {
    // Gunakan accessorFn untuk nested data
    accessorFn: (row) => row.kategori_buku?.nama_kategori || "Tidak ada kategori",
    header: "Category",
    id: "kategori",
  },
  {
    accessorKey: "isbn",
    header: "ISBN",
  },
  {
    accessorKey: "judul_buku",
    header: "Judul",
  },
  {
    accessorKey: "penulis",
    header: "Penulis",
  },
  {
    accessorKey: "penerbit",
    header: "Penerbit",
  },
  {
    accessorKey: "tahun_terbit",
    header: "Terbit",
  },
  {
    accessorKey: "bahasa",
    header: "Bahasa",
  },
  {
    accessorKey: "stok_total",
    header: "Stock Total",
  },
  {
    accessorKey: "stok_tersedia",
    header: "Stock Tersedia",
  },
  {
    accessorKey: "deskripsi",
    header: "Deskripsi",
  },
]