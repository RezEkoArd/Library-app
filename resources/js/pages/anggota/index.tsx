import AppLayout from '@/layouts/app-layout';
import { PagePropsAnggota, type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { UserCheck2, UserRoundX } from 'lucide-react';
import {
    Sheet,
    SheetTrigger,
  } from "@/components/ui/sheet"
import CreateAnggota from '@/components/create-anggota';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Anggota',
        href: '/databuku',
    },
];

export default function DataBukuIndex() {
    const {flash, anggota} = usePage<PagePropsAnggota>().props;


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
                    <div className='w-full flex flex-row items-center justify-between'>
                        <h1 className='font-md text-2xl'>Form Anggota</h1>
                    </div>
                    
                    {
                      anggota && anggota.status === 1 ? (
                        renderAnggotaData()
                      ) : anggota && anggota.status === 0 ? (
                        renderPendingApproval()
                      ) : (
                        renderRegistrationForm()
                      )
                    }
                </div>
            </div>
        </AppLayout>
    );
}


const renderAnggotaData = () => (
    <>
    <div className='grid lg:grid-cols-2 mt-4'>
        <div className='w-full flex flex-col p-2 gap-3'>
            <Label className='text-sm tfo'>Nama Anggota : </Label>    
            <p className='font-extralight text-sm text-gray-500'>Rezky Eko Ardianto</p>
        </div>
        <div className='w-full flex flex-col p-2 gap-3'>
            <Label className='text-sm tfo'>Nama Lengkap : </Label>    
            <p className='font-extralight text-sm text-gray-500'>Rezky Eko Ardianto</p>
        </div>
    </div>
    <div className='grid lg:grid-cols-2 mt-4'>
        <div className='w-full flex flex-col p-2 gap-3'>
            <Label className='text-sm tfo'>Email : </Label>    
            <p className='font-extralight text-sm text-gray-500'>rezekoard@gmail.com</p>
        </div>
        <div className='w-full flex flex-col p-2 gap-3'>
            <Label className='text-sm tfo'>No Telphone : </Label>    
            <p className='font-extralight text-sm text-gray-500'>081314254541</p>
        </div>
    </div>
    <div className='grid lg:grid-cols-2 mt-4'>
        <div className='w-full flex flex-col p-2 gap-3'>
            <Label className='text-sm tfo'>Jenis Anggota : </Label>    
            {/* Anggota / Siswa */}
            <p className='font-extralight text-sm text-gray-500'>Anggota</p> 
        </div>
        <div className='w-full flex flex-col p-2 gap-3'>
            <Label className='text-sm tfo'>Alamat : </Label>    
            <p className='font-extralight text-sm text-gray-500'>Jl. Abdul Muis No.36 Blok G-H, RT.2/RW.8, Petojo Sel., Kecamatan Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10160</p>
        </div>
    </div>
    </>
);


const renderPendingApproval = () => (
    <div className='min-h-[80vh] w-full flex flex-col items-center justify-center'>
        <UserCheck2 size={100}/>
        <h1 className='font-semibold text-2xl'>Permintaan Pendaftaran Telah dikirim.</h1>
        <p>mohon tunggu 1x24 jam</p>
    </div>
)

const renderRegistrationForm = () => (
    <div className='min-h-[80vh] w-full flex flex-col items-center justify-center'>
        <UserRoundX size={100} className="text-gray-400"/>
        <h1 className='font-semibold text-2xl'>Belum Terdaftar</h1>
        <p className='text-gray-500 mt-2 text-center max-w-md'>
            Anda belum mendaftar sebagai anggota perpustakaan. 
            Daftarkan diri Anda untuk dapat meminjam buku.
        </p>

        <div className='mt-6'>
            <Sheet>
                <SheetTrigger asChild>
                    <Button size="lg" className="px-8">
                        Daftar Sekarang
                    </Button> 
                </SheetTrigger>
                <CreateAnggota />
            </Sheet>
        </div>
    </div>
)
