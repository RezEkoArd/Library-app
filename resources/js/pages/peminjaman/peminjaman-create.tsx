import AppLayout from '@/layouts/app-layout';
import { FlashMessage, type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  import {  ChevronDownIcon, Trash } from 'lucide-react';
  import { Calendar } from '@/components/ui/calendar';
import { useEffect, useState } from 'react';

import { Book } from '../data-buku/book-table/column';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import {
    Card,
    CardContent,
  } from "@/components/ui/card"
import { toast } from 'sonner';

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
    flash: FlashMessage;
}

type Detail = {
    buku_id: number | '';
    jumlah_pinjam: number;
    kondisi_pinjam: string;
    catatan: string;
  };
  



export default function PeminjamanIndex() {

    const { anggota_id, books, flash } = usePage<PeminjamanFormProps>().props;

    const [date, setDate] = useState<Date | undefined>(new Date())
    const [open, setOpen] = useState(false)


    const { data, setData, post, processing, errors } = useForm({
        anggota_id: anggota_id,
        tanggal_kembali_rencana: '',
        catatan: '',
        details: [
        { buku_id: '', jumlah_pinjam: 1, kondisi_pinjam: 'baik', catatan: '' }
        ]
    });


  useEffect(() => {
    if (flash.success) {    
      toast.success(flash.success, { duration: 3000 }); 
    }

    if (flash.errorMessage) {
      toast.error(flash.errorMessage, { duration: 3000 });
    }
  }, [flash]);




    const handleAddDetail = ( ) => {
        setData('details', [...data.details, { buku_id: '', jumlah_pinjam: 1, kondisi_pinjam: 'baik', catatan: '' }])
    }

    const handleRemoveDetail = (index: number) => {
        const updated = [...data.details];
        updated.splice(index, 1);
        setData('details', updated);
    }


    const handleDetailChange = (
        index: number,
        key: keyof Detail,
        value: string | number
      ) => {
        const newDetails = [...data.details];
        (newDetails[index][key] as typeof value) = value;
        setData('details', newDetails);
      };
      
      const handleSubmit = (e: React.FormEvent) => {
          e.preventDefault();
            console.log(data)
            post('/peminjaman',{
                onSuccess: () => {
                    console.log("Peminjaman berhasil dikirim!");
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
                        <Label htmlFor="tanggal_kembali_rencana">Tanggal Rencana Kembali</Label>
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
                                            setData("tanggal_kembali_rencana", selectedDate.toISOString().split("T")[0]); 
                                            setOpen(false);
                                        }
                                    }}
                                />
                                </PopoverContent>
                            </Popover>
                        </div>
                        {errors.tanggal_kembali_rencana && <div className="text-red-500 text-sm">{errors.tanggal_kembali_rencana}</div>}
                        </div>

                    <div className="w-full md:w-1/2">
                        <Label htmlFor="catatan">Catatan Umum</Label>
                        <Textarea
                            id="catatan"
                            name="catatan"
                            value={data.catatan} 
                            onChange={(e) => setData('catatan', e.target.value)}
                            className="mt-1"
                            required
                            placeholder='Pinjam atas nama instansi'
                        />
                         {errors.catatan && <p className="text-sm text-red-600 mt-1">{errors.catatan}</p>}
                    </div>


                    <h3 className="font-semibold text-lg py-4">Detail Buku</h3>

                    {data.details.map((detail, index) => (
                      <Card key={index}  className='w-full lg:w-2/4 flex-row items-center justify-between gap-4 p-2 relative'>
                        <CardContent className=' w-full lg:w-2/4flex flex-col justify-between gap-6 space-y-4'> 
                                <Button
                                    type='button'
                                    variant='destructive'
                                    size='icon'
                                    className='h-8 w-8 cursor-pointer absolute top-2 right-2'
                                    onClick={() => handleRemoveDetail(index)}
                                >
                                    <Trash />
                                </Button>
                                <div>
                                    <Label htmlFor="buku" className='block text-sm'>Buku</Label>
                                    <Select
                                    value={String(detail.buku_id)}
                                    onValueChange={(value) => handleDetailChange(index, 'buku_id', parseInt(value))}
                                    >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih Buku"  />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                        {Array.isArray(books) && books.map((buku) =>  (
                                        <SelectItem key={buku.id} value={String(buku.id)}>
                                            {buku.judul_buku}
                                        </SelectItem>
                                        ))}
                                        </SelectGroup>
                                    </SelectContent>
                                    </Select>
                                </div>


                                <div>
                                    <Label htmlFor="jumlah_pinjam">Jumlah Pinjam</Label>
                                    <Input
                                        type='number'
                                        min={1}
                                        id="jumlah_pinjam"
                                        name="jumlah_pinjam"
                                        value={detail.jumlah_pinjam} 
                                        onChange={(e) => handleDetailChange(index, 'jumlah_pinjam', parseInt(e.target.value))}
                                        className="border rounded px-2 py-1 w-full"
                                    />
                                    {flash.errorMessage && <p className="text-red-600">{flash.errorMessage}</p>}
                                </div>

                                <div>
                                    <Label className="block text-sm">Kondisi Pinjam</Label>

                                    <Select
                                    value={String(detail.kondisi_pinjam)}
                                    onValueChange={(value) => handleDetailChange(index, 'kondisi_pinjam', value)}
                                    >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder={'Pilih Kondisi Pinjam'}  />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                        {['sangat baik', 'baik', 'rusak'].map((kondisi) => (
                                        <SelectItem key={kondisi} value={kondisi}>
                                            {kondisi.charAt(0).toUpperCase() + kondisi.slice(1)}
                                        </SelectItem>
                                        ))}
                                        </SelectGroup>
                                    </SelectContent>
                                    </Select>
                                </div >

                                <div>
                                    <Label className="block text-sm">Catatan Buku (opsional)</Label>
                                    <Textarea
                                    value={detail.catatan}
                                    onChange={(e) => handleDetailChange(index, 'catatan', e.target.value)}
                                    className="border rounded px-2 py-1 w-full h-8"
                                    />
                                </div>

                               
                          
                        </CardContent>
                        </Card>  
                       
                    ))}

                    <Button
                        type='button'
                        variant='outline'
                        onClick={handleAddDetail}
                    >
                        Tambah Buku
                    </Button>

                    <div className="flex items-center gap-4">
                        <Button type="submit" variant='outline' disabled={processing}  >
                            {processing ? 'Saving...' : 'Kirim Permintaan Peminjaman'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}