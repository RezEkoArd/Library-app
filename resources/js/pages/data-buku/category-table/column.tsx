"use client"

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react";

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
          const payment = row.original
     
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem className=" font-light text-sm text-black hover:bg-red-500"
                  onClick={() => navigator.clipboard.writeText(payment.id)}
                >
                  Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {/* <DropdownMenuItem>View customer</DropdownMenuItem> */}
                {/* <DropdownMenuItem>View payment details</DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
    }
  ]
  