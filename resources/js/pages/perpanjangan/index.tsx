import AppLayout from '@/layouts/app-layout';
import { FlashMessage, type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Perpanjangan Peminjaman',
        href: '/peminjaman',
    },
];

export interface Peminjaman {
    id: number;
    kode_peminjaman: string;
    tanggal_kembali_rencana: string;
    // jika ingin menambahkan properti lain, seperti `anggota`, `user`, dll, boleh juga.
}

export interface PagePropsPerpanjangan extends Record<string, any> {
    flash: FlashMessage;
    peminjaman: Peminjaman;
    petugasId: number;
}

export default function PerpanjanganForm() {
    const { peminjaman,petugasId,  flash } = usePage<PagePropsPerpanjangan>().props;

    const [date, setDate] = useState<Date | null>(null);
    const [open, setOpen] = useState(false);

    // validasi tanggal
    const [customError, setCustomError] = useState<string | null>(null);


    const { data, setData, post, reset, processing, errors } = useForm({
        tanggal_kembali_baru: '',
    });
    // console.log(peminjaman)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!date) {
            setCustomError('Tanggal wajib di pilih')    
            return
        }

        const tanggalBaru = new Date(date);
        const tanggalRencana = new Date(peminjaman.tanggal_kembali_rencana);

        if (tanggalBaru <= tanggalRencana){
            setCustomError("Tanggal kembali baru harus lebih besar dari tanggal rencana sebelumnya.");
            return;
        }

        // Valid
        setCustomError(null);


        post(`/peminjaman/${peminjaman.id}/perpanjangan`, {
            onSuccess: () => reset(),  
        })
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Perpanjangan" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4">
                    <div className='w-full flex flex-row items-center justify-between mb-4'>
                        <h1 className='font-semibold text-2xl'>Form Perpanjangan Peminjaman</h1>
                        <p className="text-muted-foreground text-sm">Kode: <strong>{peminjaman.kode_peminjaman}</strong></p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="w-full md:w-1/2">
                            <Label htmlFor="tanggal_kembali_baru">Tanggal Kembali Baru</Label>
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
                                            ) : "Pilih tanggal"}
                                            <ChevronDownIcon />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={date || undefined}
                                            captionLayout="dropdown"
                                            onSelect={(selectedDate) => {
                                                if (selectedDate) {
                                                    setDate(selectedDate);
                                                    setData("tanggal_kembali_baru", selectedDate.toISOString().split("T")[0]);
                                                    setOpen(false);
                                                }
                                            }}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            {errors.tanggal_kembali_baru && <p className="text-sm text-red-600 mt-1">{errors.tanggal_kembali_baru}</p>}
                            {customError && <p className="text-sm text-red-600 mt-1">{customError}</p>}
                        </div>

                        <Button type="submit" disabled={processing} className="mt-4">
                            {processing ? "Menyimpan..." : "Perpanjang Sekarang"}
                        </Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
