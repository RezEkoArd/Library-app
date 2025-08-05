import AppLayout from '@/layouts/app-layout';
import { FlashMessage, type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { PageProps as InertiaPageProps, router } from '@inertiajs/core';
import { Peminjaman } from '@/types/report';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { generateYearOptions } from '@/lib/utils';
import { Button } from '@/components/ui/button';


const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Export Peminjaman',
    href: '/report',
  },
];

export interface PagePropsReport extends Record<string, any>{
    flash: FlashMessage;
    errorMessage?: string;
}

export default function Index() {
    const {flash, errorMessage} = usePage<PagePropsReport>().props;


    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const {data,setData, post, processing, errors,reset} = useForm({
        month: currentMonth.toString(),
        year: currentYear.toString(),
    })


    const handleChangeMonth = (value: string) => {
        setData('month', value);
    }
    const handleChangeYear= (value: string) => {
        setData('year', value);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Method 1: Menggunakan window.location untuk download
        const params = new URLSearchParams({
            month: data.month,
            year: data.year
        });
        
        window.location.href = `/report/export?${params.toString()}`;

        // Method 2: Alternative menggunakan fetch (uncomment jika ingin menggunakan ini)
 /*
        fetch('/report/export', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                return response.blob();
            }
            throw new Error('Network response was not ok');
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `report_peminjaman_${data.month}_${data.year}.xlsx`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat mengunduh file');
        });
        */
    }



  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Perpanjangan" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4">
                <h1 className='font-semibold text-2xl mb-4'>Laporan List </h1>   
                        
                        <div className='flex flex-wrap gap-4'>
                            <Card className='w-[400px]'>
                                <CardHeader>
                                    <CardTitle>Export Laporan Peminjaman</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-4">
                                            <Label htmlFor="month" className="block text-gray-700 font-bold mb-2">Bulan</Label>
                                            <Select value={data.month}
                                                onValueChange={handleChangeMonth}
                                                required>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Select A month" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                    <SelectLabel>Month</SelectLabel>
                                                    <SelectItem value="1">Januari</SelectItem>
                                                    <SelectItem value="2">Februari</SelectItem>
                                                    <SelectItem value="3">Maret</SelectItem>
                                                    <SelectItem value="4">April</SelectItem>
                                                    <SelectItem value="5">Mei</SelectItem>
                                                    <SelectItem value="6">Juni</SelectItem>
                                                    <SelectItem value="7">Juli</SelectItem>
                                                    <SelectItem value="8">Agustus</SelectItem>
                                                    <SelectItem value="9">September</SelectItem>
                                                    <SelectItem value="10">Oktober</SelectItem>
                                                    <SelectItem value="11">November</SelectItem>
                                                    <SelectItem value="12">Desember</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                                </Select>
                                        </div>

                                        <div className="mb-6">
                                        <Label htmlFor="year" className="block text-gray-700 font-bold mb-2">Year</Label>
                                            <Select value={data.year}
                                                onValueChange={handleChangeYear}
                                                required>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Select A month" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                    <SelectLabel>Year</SelectLabel>
                                                    {generateYearOptions(2020, 2030).map(({value, label }) => (
                                                        <SelectItem key={value} value={value}>{label}</SelectItem>
                                                    ))} 
                                                    </SelectGroup>
                                                </SelectContent>
                                                </Select>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <Button
                                                type="submit"
                                                onSubmit={handleSubmit}
                                                variant="secondary"
                                                disabled={processing}
                                                className='cursor-pointer'
                                            > 
                                                {processing ? 'Mengekspor...' : 'Ekspor ke Excel'}
                                            </Button>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                        
                </div>
            </div>
    </AppLayout>
  );
}