import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { PagePropsDataBuku, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { DataTable } from './category-table/data-table';
import { columns } from './category-table/column';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Button } from '@/components/ui/button';
import CreateCategory from '@/components/category-create';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data buku',
        href: '/databuku',
    },
];

export default function DataBukuIndex() {
    const {categories, flash} = usePage<PagePropsDataBuku>().props;


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
                <div className="grid auto-rows-min gap-4 lg:grid-cols-2">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-1">
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
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
