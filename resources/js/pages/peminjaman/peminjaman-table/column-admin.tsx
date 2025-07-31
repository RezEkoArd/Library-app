"use client"

import { ColumnDef } from "@tanstack/react-table"
import {  Delete, Edit, MoreHorizontal,} from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"




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
  anggota?: {
    id: number;
    nama_anggota: string;
    // tambahkan field lain kalau perlu
  };

}

export const columns: ColumnDef<Peminjaman>[] = [
  {
    accessorKey: "index",
    header: "No",
    cell: ({row}) => row.index + 1
  },
  {
    accessorKey: "anggota_id",
    header: "Anggota",
    cell: ({ row }) => {
      const anggota = row.original.anggota;
      return <span>{anggota?.nama_anggota ?? '-'}</span>;
    }
  
  },
  {
    accessorKey: "kode_peminjaman",
    header: "Kode Peminjaman",
  },
  {
    accessorKey: "tanggal_pinjam",
    header: "Tanggal Pinjam", //Date
    cell: ({ getValue }) => {
      const rawDate = getValue() as string;
      const formattedDate = new Date(rawDate).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "tanggal_kembali_rencana",
    header: "Tanggal Kembali Plan", //Date
    cell: ({ getValue }) => {
      const rawDate = getValue() as string;
      const formattedDate = new Date(rawDate).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "tanggal_kembali_actual",
    header: "Tanggal Kembali Actual",
    cell: ({ getValue }) => {
      const rawDate = getValue() as string | null;

      if (!rawDate) return <span>-</span>; // Kalau null/undefined, tampilkan "-"

      const dateObj = new Date(rawDate);
      const isValid = !isNaN(dateObj.getTime());

      const formattedDate = isValid
        ? dateObj.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })
        : "-";

      return <span>{formattedDate || "-" }</span>;
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue() as string;
  
      const statusMap: Record<string, { label: string; variant?: "default" | "secondary" | "destructive" | "outline" }> = {
        menunggu: { label: "Menunggu", variant: "secondary" },
        dipinjam: { label: "Dipinjam", variant: "default" },
        terlambat: { label: "Terlambat", variant: "destructive" },
        dikembalikan: { label: "Dikembalikan", variant: "outline" },
        hilang: { label: "Hilang", variant: "destructive" },
      };
  
      const badge = statusMap[status] ?? { label: status, variant: "secondary" };
  
      return <Badge variant={badge.variant}>{badge.label}</Badge>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
        const peminjaman = row.original

        return (
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="flex items-center justify-between">
                Edit 
                <span>
                  <Edit className="ml-2 h-4 w-4" />
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center justify-between">
                Delete 
                <span>
                  <Delete className="ml-2 h-4 w-4" />
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>  
        )
    }
  },

]