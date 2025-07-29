"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Peminjaman = {
  id: number
  anggota_id : number
  petugas_id : number,
  kode_peminjaman: string
  tanggal_pinjam: string // atau Date jika kamu parsing ke objek Date
  tanggal_kembali_rencana: string
  tanggal_kembali_actual: string | null
  total_buku: number
  status: string
  catatan: string
  price: number
}

export const columns: ColumnDef<Peminjaman>[] = [
  {
    accessorKey: "index",
    header: "No",
    cell: ({row}) => row.index + 1
  },
  {
    accessorKey: "petugas_id",
    header: "Petugas",
  },
  {
    accessorKey: "kode_peminjaman",
    header: "Kode Peminjaman",
  },
  {
    accessorKey: "tanggal_pinjam",
    header: "Tanggal Pinjam", //Date
  },
  {
    accessorKey: "tanggal_kembali_rencana",
    header: "Tanggal Kembali Plan", //Date
  },
  {
    accessorKey: "tanggal_kembali_actual",
    header: "Tanggal Kembali Actual", //Date
  },
  {
    accessorKey: "status",
    header: "Status",
  },
]