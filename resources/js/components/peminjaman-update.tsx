"use client"

import { useState } from "react"
import { MoreHorizontal, Edit, ChevronDownIcon } from "lucide-react"
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { useForm } from "@inertiajs/react"

export function PeminjamanUpdate({ peminjaman }: { peminjaman: any }) {
  const [date, setDate] = useState<Date | undefined>(
    peminjaman.tanggal_kembali_actual ? new Date(peminjaman.tanggal_kembali_actual) : undefined
  )
  const [open, setOpen] = useState(false)

  
  const {data, setData, processing, errors, put } = useForm({
    tanggal_kembali_actual: '',
    status: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitted:", )
    // TODO: Kirim formData ke backend (via Inertia post/put)
  }

  return (
    <Sheet>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="p-2">
          <DropdownMenuItem asChild>
            <SheetTrigger className="w-full flex flex-row items-center justify-between">
              Edit
              <Edit className="ml-2 h-4 w-4" />
            </SheetTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <SheetContent>
        <SheetHeader>
          <SheetTitle className="mb-4">Update Peminjaman</SheetTitle>
          <SheetDescription asChild className="scroll-smooth">
            <div className="overflow-y-auto max-h-[calc(100vh-120px)] pr-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="w-full md:w-1/2">
                  <Label htmlFor="tanggal_kembali_actual">Tanggal Kembali Actual</Label>
                  <div className='flex mt-2'>
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    id="date"
                                    className="w-48 justify-between font-normal"
                                >
                                    {date ? date.toLocaleDateString(
                                        'id-ID',
                                        { day: '2-digit', month: 'long', year: 'numeric' }
                                    ) : "Select date"}
                                    <ChevronDownIcon />
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    captionLayout="dropdown"
                                    onSelect={(selectedDate) => {
                                        if (selectedDate) {
                                            setDate(selectedDate)
                                            setData("tanggal_kembali_actual", selectedDate.toISOString().split("T")[0]); 
                                            setOpen(false);
                                        }
                                    }}
                                />
                                </PopoverContent>
                            </Popover>
                        </div>
                  {errors.tanggal_kembali_actual && (
                    <div className="text-red-500 text-sm">{errors.tanggal_kembali_actual}</div>
                  )}
                </div>
                <Button type="submit">Submit</Button>
              </form>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
