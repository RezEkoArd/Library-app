import AppLayout from '@/layouts/app-layout';
import {  type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import CardReportPeminjaman from '@/components/card-report-peminjaman';
import { useEffect } from 'react';
import { toast } from 'sonner';
import CardReportDetail from '@/components/card-report-detail';


const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Export Peminjaman',
    href: '/report',
  },
];

interface FlashMessage {
    message: string,
    type: string,
}

export interface PagePropsReport extends Record<string, any>{
    flash: FlashMessage;
    errorMessage?: string;
}

export default function Index() {
    const {flash, errorMessage} = usePage<PagePropsReport>().props;

     // Gunakan useEffect untuk menampilkan flash message
     useEffect(() => {
        if (flash && flash.message) {
            console.log(flash);
            // Tampilkan pesan menggunakan sonner toast
            if (flash.type === 'success') {
                toast.success(flash.message);
            } else if (flash.type === 'error') {
                toast.error(flash.message);
            } else {
                toast(flash.message);
            }
        }
    }, [flash]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Perpanjangan" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4">
                <h1 className='font-semibold text-2xl mb-4'>Laporan List </h1>   
                        <div className='flex flex-wrap gap-4'>
                            <CardReportPeminjaman />
                            <CardReportDetail />
                        </div>
                </div>
            </div>
    </AppLayout>
  );
}