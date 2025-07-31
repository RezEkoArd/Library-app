import AppLayout from '@/layouts/app-layout';
import { PagePropsPeminjaman, type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { DataTable } from './peminjaman-table/data-table';
import { columns } from './peminjaman-table/column';
import { BookX } from 'lucide-react';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Peminjaman',
        href: '/Peminjaman',
    },
];


export default function PeminjamanIndex() {
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
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border p-4">
                    <div className='w-full flex flex-row items-center justify-between mb-4'>
                        <h1 className='font-md text-2xl'>Riwayat Peminjaman buku kamu</h1>
                        
                    <Link href='peminjaman/create'>
                            <Button className='mt-4 cursor-pointer'>
                                Ajukan Peminjaman buku
                            </Button>
                            
                        </Link>

                    </div>
                    { peminjaman && peminjaman.length == 0 ? (
                        <div className='w-full min-h-[80vh] flex flex-col items-center justify-center'>
                            <BookX size={100} className="text-gray-400"/>

                            <h1 className='font text-xl font-light'>Belum ada peminjaman</h1>
                        </div>
                    ) : 
                        <DataTable columns={columns} data={peminjaman}/>
                    }
                </div>
            </div>
            
        </AppLayout>
    );
}