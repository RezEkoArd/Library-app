import AppLayout from '@/layouts/app-layout';
import { Anggota, FlashMessage, PagePropsAnggota, PagePropsPeminjaman, type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { DataTable } from './peminjaman-table/data-table';
import { columns } from './peminjaman-table/column-admin';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Peminjaman',
        href: '/Peminjaman',
    },
];


export default function PeminjamanIndexAdmin() {
    const {flash, peminjaman} = usePage<PagePropsPeminjaman>().props;

  useEffect(() => {
    if (flash.success) {    
      toast.success(flash.success, { duration: 3000 }); 
    }

    if (flash.errorMessage) {
      toast.error(flash.errorMessage, { duration: 3000 });
    }
  }, [flash]);


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Peminjaman" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border p-4">
                    <div className='w-full flex flex-row items-center justify-between mb-4'>
                        <h1 className='font-md text-2xl'>List Permintaan Peminjaman</h1>
                    </div>
                <DataTable columns={columns} data={peminjaman}/>
                </div>
            </div>
            
        </AppLayout>
    );
}