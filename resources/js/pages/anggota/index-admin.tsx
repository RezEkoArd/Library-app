import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PagePropsAnggota, PagePropsAnggotaAdmin } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { DataTable } from './anggota-table/data-table';
import { columns } from './anggota-table/column';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'List Permintaan Anggota',
        href: '/anggota-admin',
    },
];

const AdminIndex = () => {
    const { anggota } = usePage<PagePropsAnggotaAdmin>().props;


  return (
    <AppLayout breadcrumbs={breadcrumbs}>
    <Head title="Dashboard" />
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
            <div className="min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border p-4">
                <div className='w-full flex flex-col justify-between'>
                    <h1 className='font-md text-lg font-extralight mb-2'>List Permintaan Keanggotaan</h1>
                    <div>
                        <DataTable columns={columns} data={anggota || []} />
                    </div>
                </div>

            </div>
        </div>
    </AppLayout>
  )
}

export default AdminIndex