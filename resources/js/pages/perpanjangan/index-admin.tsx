import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PerpanjanganIndexPageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Handshake } from 'lucide-react';
import { DataTable } from './perpanjangan-table/data-table';
import { columns } from './perpanjangan-table/column';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Perpanjangan List',
        href: '/perpanjangan',
    },
];

export default function indexAdmin() {
    const { perpanjangan } = usePage<PerpanjanganIndexPageProps>().props //usePage<BukuIndexPageProps>().props;

    console.log(perpanjangan);


  return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Perpanjangan" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border p-4">
                    <div className='w-full flex flex-row items-center justify-between mb-4'>
                        <h1 className='font-md text-2xl'>Riwayat Perpanjangan</h1>
                    </div>
                        { perpanjangan && perpanjangan.length == 0 ? (
                            <div className='w-full min-h-[80vh] flex flex-col items-center justify-center'>
                                <Handshake size={100} className="text-gray-400"/>

                                <h1 className='font text-xl font-light'>Belum ada peminjaman</h1>
                            </div>
                        ) : 
                            <DataTable columns={columns} data={perpanjangan}/>
                        }  
                </div>
            </div>
            </div>
        </AppLayout>
  )
}


