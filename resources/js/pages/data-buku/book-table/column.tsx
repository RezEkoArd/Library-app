"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit2, MoreHorizontal, Pen, Trash2 } from "lucide-react"
import { router, useForm } from "@inertiajs/react"
import {
  Sheet,
  SheetTrigger,
} from "@/components/ui/sheet"


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
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const book = row.original
      const {delete:destroy} = useForm();
      // console.log(book);

      const handleDelete = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (confirm(`Do you want to delete book - ${id}. ${id}`)) {
          destroy(route('data-buku.destroy', id));
        }
      }
 
      return (
        <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
            <>
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="p-2">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
                onClick={(e) => handleDelete(book.id, e)}
              >
                Delete 
                <span>
                  <Trash2 />
                </span>
              </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.visit(route('data-buku.edit', book.id))}>
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]