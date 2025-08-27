"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Edit, MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetTrigger,
  } from "@/components/ui/sheet"
import EditAnggota from "@/components/anggota-edit"
import { Badge } from "@/components/ui/badge"


export interface Anggota {

    id: string;
    nama_anggota: string;
    nama_lengkap: string;
    alamat: string;
    no_telp: string;
    email:string;
    jenis_anggota: string;
    status: number;
}

export const columns: ColumnDef<Anggota>[] = [
  {
    accessorKey: "index",
    header: "No",
    cell: ({row}) => row.index + 1,
  },
  {
    accessorKey: "nama_anggota",
    header: "Nama Anggota",
  },
  {
    accessorKey: "jenis_anggota",
    header: "Jenis Anggota",
  },
  {
    accessorKey: "no_telp",
    header: "No Telp",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status Keanggotaan",
    cell: ({row}) => {
      const status = row.original.status;
      let variant: "default" | "secondary" | "destructive" | "outline" | "aktif" | "tidakAktif"  = "secondary";

      if (status === 1) {
        variant = "aktif";
      } else if (status === 0) {
        variant = "tidakAktif";
      }

      return (
        <Badge variant={variant}>{status === 1 ? "Aktif" : "Tidak Aktif"}</Badge>
      );
    }
  },
  {
    accessorKey: "alamat",
    header: "Alamat",
    cell: ({row}) => (
    <div className="max-w-[200px] whitespace-normal break-words py-=">
      {row.original.alamat}
    </div>
      ),
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const anggota = row.original
 
      return (
        <div>
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" >
                    <Edit className="mr-2 h-4 w-4" />
                </Button>
            </SheetTrigger>
        <EditAnggota recentData={anggota}/>
        </Sheet>
        </div>
      )
  },
  },
]