import CardBookComponent from '@/components/card-book';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { BukuIndexPageProps } from '@/types/buku';
import { Head, usePage, } from '@inertiajs/react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data buku',
        href: '/data-buku',
    },
];



export default function DataBuku() {

    const {bukus} = usePage<BukuIndexPageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border p-4">
                        <h1 className='font-semibold text-lg'>List Books</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {bukus.map((book) => (
                            <CardBookComponent key={book.id} book={book} />
                            ))}
                        </div>
                </div> 
            </div>
        </AppLayout>
    );
}


