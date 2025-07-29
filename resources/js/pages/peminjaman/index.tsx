import AppLayout from '@/layouts/app-layout';
import { Anggota, FlashMessage, PagePropsAnggota, PagePropsPeminjaman, type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { UserCheck2, UserRoundX } from 'lucide-react';
import {
    Sheet,
    SheetTrigger,
  } from "@/components/ui/sheet";
import { DataTable } from './peminjaman-table/data-table';
import { columns, Peminjaman } from './peminjaman-table/column';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Peminjaman',
        href: '/Peminjaman',
    },
];


export default function DataBukuIndex() {
    const {flash, peminjaman} = usePage<PagePropsPeminjaman>().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        user_id: '',
        tanggal_kembali_rencana: '',
        catatan: '',
        detail_peminjamans: []
    });

    console.log(peminjaman)



  useEffect(() => {
    if (flash.success) {    
      toast.success(flash.success, { duration: 3000 }); 
    }

    if (flash.errorMessage) {
      toast.error(flash.errorMessage, { duration: 3000 });
    }
  }, [flash]);



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('peminjaman.store'), {
        onSuccess: () => {
            reset();
            // setSelectedBooks([]);
        }
    });
};


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border p-4">
                    <div className='w-full flex flex-row items-center justify-between'>
                        <h1 className='font-md text-2xl'>List Permintaan Peminjaman</h1>
                    </div>
                    
                    <DataTable columns={columns} data={peminjaman}/>
                </div>
            </div>
            
        </AppLayout>
    );
}