import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { PagePropsDataBuku, type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { DataTable } from './category-table/data-table';
import {
    Sheet,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Button } from '@/components/ui/button';
import CreateCategory from '@/components/category-create';
import { columns } from './category-table/column';
import { columnsBook } from './book-table/column';
import { DataTableBook } from './book-table/data-table';
import { Input } from '@/components/ui/input';
import CreateBook from '@/components/book-create';
import { DashboardPieChart } from '@/components/dashboard-piechart';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data buku',
        href: '/databuku',
    },
];

export default function DataBukuIndexAdmin() {
    const {books, categories,  flash, filters, chartData, } = usePage<PagePropsDataBuku>().props;

    const [search, setSearch] = useState(filters.search || '');

    const isInitialMount = useRef(true);

    useEffect(() => {
        // BARU: Logika untuk melewati render pertama
        if (isInitialMount.current) {
            isInitialMount.current = false; // Set ke false agar tidak berjalan lagi di render berikutnya
            return; // Hentikan eksekusi useEffect di render pertama
        }

        // Logika debounce (opsional tapi sangat disarankan)
        const handler = setTimeout(() => {
            // Hanya jalankan jika panjang karakter >= 3 atau input kosong
            if (search.length >= 3 || search.length === 0) {
                const url =  new URL(window.location.href);
                url.searchParams.set('search', search);

                router.get(
                    url.pathname + url.search,
                    {},
                    {
                        preserveState: true,
                        replace: true,
                    }
                );
            }
        }, 300); // Beri jeda 300ms

        // Cleanup function untuk membersihkan timeout
        return () => {
            clearTimeout(handler);
        };

    }, [search]); // Dependensi tetap pada 'search'

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
                <div className="grid auto-rows-min gap-4 lg:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-12 col-span-2">
                        <div className='flex items-center justify-between mb-4'>
                            <h1 className='font-semibold text-lg'>List Category Book</h1>
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline">Create</Button>
                                </SheetTrigger>
                                <CreateCategory />
                            </Sheet>
                        </div>
                        <DataTable columns={columns} data={categories}/>
                    </div>
                    <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">  
                    <DashboardPieChart />
                </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border p-4">
                    <div className='flex items-center justify-between mb-4 '>
                            <h1 className='font-semibold text-lg'>List Books</h1>
                            <Input
                                type="text"
                                placeholder="Cari buku (judul, penulis, isbn...)"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="max-w-sm"
                            />
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline">Create</Button>
                                </SheetTrigger>
                                <CreateBook categories={categories}/>
                            </Sheet>
                        </div>
                    <DataTableBook columns={columnsBook} data={books} />
                </div>
            </div>
        </AppLayout>
    );
}
