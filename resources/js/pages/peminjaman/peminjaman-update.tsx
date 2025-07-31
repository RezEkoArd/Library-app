import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  import {  ChevronDownIcon, Trash } from 'lucide-react';
  import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';

import { Book } from '../data-buku/book-table/column';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Peminjaman',
        href: '/Peminjaman',
    },
];

interface PeminjamanFormProps
{
    books: Book[];
    anggotaId: string;
    [key: string]: any; // ❗️izin semua property string
}

type Detail = {
    buku_id: number | '';
    jumlah_pinjam: number;
    kondisi_pinjam: string;
    catatan: string;
  };
  



export default function PeminjamanIndex() {

    const { peminjaman } = usePage<PeminjamanFormProps>().props;

    const [date, setDate] = useState<Date | undefined>(new Date())
    const [open, setOpen] = useState(false)

    const { data, setData, processing, errors, put } = useForm({
        tanggal_kembali_actual: peminjaman.tanggal_kembali_actual || '',
        status: peminjaman.status || '',
    });

      const handleSubmit = (e: React.FormEvent) => {
          e.preventDefault();
            put(`/peminjaman-edit/${peminjaman.id}`,{
                onSuccess: () => {
                    console.log("Peminjaman berhasil diupdate!");
                    // reset(); // jika mau reset form
                  },
                  onError: (errors) => {
                    console.error("Ada error validasi:", errors);
                  }
            });
      }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="w-full md:w-1/2">
                        <Label htmlFor="tanggal_kembali_actual">Tanggal Rencana Actual</Label>
                        {/* Calendar */}
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
                        {errors.tanggal_kembali_actual && <div className="text-red-500 text-sm">{errors.tanggal_kembali_actual}</div>}
                        </div>

                    <div className="w-full md:w-1/2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                            onValueChange={(value) => setData("status", value)}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder={peminjaman.status} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectItem value="menunggu">menunggu</SelectItem>
                                <SelectItem value="dipinjam">dipinjam</SelectItem>
                                <SelectItem value="terlambat">terlambat</SelectItem>
                                <SelectItem value="dikembalikan">dikembalikan</SelectItem>
                                <SelectItem value="hilang">hilang</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                        </Select>
                         {errors.status && <p className="text-sm text-red-600 mt-1">{errors.status}</p>}
                    </div>


                    <div className="flex items-center gap-4">
                        <Button type="submit" variant='outline' disabled={processing}  >
                            {processing ? 'Saving...' : 'Update Data'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}