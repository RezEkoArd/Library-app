import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { Perpanjangan } from "@/types";

export const columns: ColumnDef<Perpanjangan>[] = [
  {
    accessorKey: "index",
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "peminjaman.kode_peminjaman",
    header: "Kode Peminjaman",
    cell: ({ row }) => row.original.peminjaman?.kode_peminjaman ?? "-",
  },
  {
    accessorKey: "anggota.nama_anggota",
    header: "Nama Anggota",
    cell: ({ row }) => row.original.anggota?.nama_anggota ?? "-",
  },
  {
    accessorKey: "tanggal_perpanjangan",
    header: "Tgl. Perpanjangan",
    cell: ({ row }) => {
      const tgl = new Date(row.original.tanggal_perpanjangan);
      return tgl.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    },
  },
  {
    accessorKey: "tanggal_kembali_baru",
    header: "Tgl. Kembali Baru",
    cell: ({ row }) => {
      const tgl = new Date(row.original.tanggal_kembali_baru);
      return tgl.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    },
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => (
      <Link href={`/peminjaman/${row.original.peminjaman_id}/detail`}>
        <Button size="sm" variant="outline">
          Detail Peminjaman
        </Button>
      </Link>
    ),
  },
];
