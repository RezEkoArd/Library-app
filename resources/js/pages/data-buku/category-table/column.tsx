"use client"

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { router, useForm } from "@inertiajs/react";

export type Category = {
    id: string,
    nama_kategori: string;
    deskripsi: string;
}

export const columns: ColumnDef<Category>[] = [
    {
      accessorKey: "index",
      header: "No",
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "nama_kategori",
      header: "Name",
      cell: ({ getValue }) => {
        const value = getValue() as string;
        return (
          <div className="w-fit max-w-sm">
            <p className="line-clamp-2 text-sm leading-relaxed" title={value}>
              {value}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "deskripsi",
      header: "Description",
      cell: ({ getValue }) => {
        const value = getValue() as string;
        return (
          <div className="w-70 max-w-md">
            <p className="line-clamp-2 text-sm leading-tight" title={value}>
              {value}
            </p>
          </div>
        );
      },
    },
    {
        header: "Actions",
        id: "actions",
        cell: ({ row }) => {
          const categori = row.original
          const {processing, delete:destroy} = useForm();

          const handleEdit = () => {
           // Redirect ke halaman edit
            router.visit(`dashboard`);
          }

          const handleDelete = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
            e.preventDefault();
            if (confirm(`Do you want to delete - ${id}. ${id}`)) {
              destroy(route('data-buku.destroy', id));
              console.log('deleted', id)
          }

          }
   
            
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {/* <DropdownMenuItem>Edit</DropdownMenuItem> */}
                <DropdownMenuItem onClick={(e) => handleDelete(categori.id, e)}>
                  Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
    }
]