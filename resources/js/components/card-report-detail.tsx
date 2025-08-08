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
  import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useForm } from "@inertiajs/react";
import { generateYearOptions } from "@/lib/utils";
import { useState } from 'react';

function CardReportDetail() {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    
    const {data, setData, post, processing, errors, reset} = useForm({
        month: currentMonth.toString(),
        year: currentYear.toString(),
    })

    const handleChangeMonth = (value: string) => {
        setData('month', value);
    }
    const handleChangeYear= (value: string) => {
        setData('year', value);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        console.log(data);;
        // Karena tidak ada validasi, langsung download dengan Inertia
        const query = new URLSearchParams({
            month: data.month,
            year: data.year,
        }).toString();
    
        window.open(`/report-detail/export?${query}`, '_blank');
    

    }

  return (
<>
        <Card className='w-[400px]'>
            <CardHeader>
                <CardTitle>Export Detail Buku Peminjaman</CardTitle>
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
                                    <SelectValue placeholder="Select A year" />
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
    </>
  )
}

export default CardReportDetail