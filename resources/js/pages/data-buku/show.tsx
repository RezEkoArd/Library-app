import AppLayout from '@/layouts/app-layout';
import {  PagePropsDataBukuDetail, type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
    BookOpen, 
    Calendar, 
    User, 
    Building, 
    Globe, 
    Hash, 
    Package, 
    Tag,
    FileText 
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Buku',
        href: '/databuku',
    },
    {
        title: 'Detail Buku',
        href: '#',
    },
];

export default function DataBukuDetail() {
    const { book } = usePage<PagePropsDataBukuDetail>().props;

    const isLowStock = book.stok_tersedia <= 2;
    const isOutOfStock = book.stok_tersedia === 0;
    
    const getStockBadgeVariant = () => {
        if (isOutOfStock) return "destructive";
        if (isLowStock) return "secondary";
        return "default";
    };

    const getStockBadgeText = () => {
        if (isOutOfStock) return "Habis";
        if (isLowStock) return "Stok Terbatas";
        return "Tersedia";
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detail Buku" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border p-6">
                    
                    {/* Header */}
                    <div className='w-full flex flex-row items-start justify-between mb-6'>
                        <div className="flex-1">
                            <h1 className='font-bold text-3xl text-gray-900 mb-2'>
                                {book.judul_buku}
                            </h1>
                            <p className='text-lg text-gray-600 mb-4'>
                                oleh {book.penulis}
                            </p>
                            <Badge variant={getStockBadgeVariant()} className="text-sm">
                                {getStockBadgeText()}
                            </Badge>
                        </div>
                        <div className="flex gap-2">
                            <Link href={'/peminjaman/create'}>
                                <Button 
                                    size="sm"
                                    disabled={isOutOfStock}
                                    className='cursor-pointer'
                                >
                                    Pinjamkan
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <Separator className="mb-6" />

                    {/* Book Information Grid */}
                    <div className='grid lg:grid-cols-2 gap-6 mb-6'>
                        
                        {/* ISBN */}
                        <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-lg'>
                            <Hash className="h-5 w-5 text-blue-600" />
                            <div>
                                <Label className='text-sm font-semibold text-gray-700'>ISBN</Label>    
                                <p className='font-mono text-sm text-gray-900 mt-1'>{book.isbn}</p>
                            </div>
                        </div>

                        {/* Penerbit */}
                        <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-lg'>
                            <Building className="h-5 w-5 text-blue-600" />
                            <div>
                                <Label className='text-sm font-semibold text-gray-700'>Penerbit</Label>    
                                <p className='text-sm text-gray-900 mt-1'>{book.penerbit}</p>
                            </div>
                        </div>

                        {/* Tahun Terbit */}
                        <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-lg'>
                            <Calendar className="h-5 w-5 text-blue-600" />
                            <div>
                                <Label className='text-sm font-semibold text-gray-700'>Tahun Terbit</Label>    
                                <p className='text-sm text-gray-900 mt-1'>{book.tahun_terbit}</p>
                            </div>
                        </div>

                        {/* Bahasa */}
                        <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-lg'>
                            <Globe className="h-5 w-5 text-blue-600" />
                            <div>
                                <Label className='text-sm font-semibold text-gray-700'>Bahasa</Label>    
                                <p className='text-sm text-gray-900 mt-1'>{book.bahasa}</p>
                            </div>
                        </div>

                        {/* Kategori */}
                        <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-lg'>
                            <Tag className="h-5 w-5 text-blue-600" />
                            <div>
                                <Label className='text-sm font-semibold text-gray-700'>Kategori</Label>    
                                <p className='text-sm text-gray-900 mt-1'>{book.kategori_buku.nama_kategori}</p>
                                <p className='text-xs text-gray-500 mt-1'>{book.kategori_buku.deskripsi}</p>
                            </div>
                        </div>

                        {/* Stok */}
                        <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-lg'>
                            <Package className="h-5 w-5 text-blue-600" />
                            <div>
                                <Label className='text-sm font-semibold text-gray-700'>Stok</Label>    
                                <p className='text-sm text-gray-900 mt-1'>
                                    <span className={`font-semibold ${
                                        isOutOfStock ? 'text-red-600' : 
                                        isLowStock ? 'text-yellow-600' : 
                                        'text-green-600'
                                    }`}>
                                        {book.stok_tersedia}
                                    </span>
                                    <span className="text-gray-500"> dari {book.stok_total} buku</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <Separator className="mb-6" />

                    {/* Deskripsi */}
                    <div className='p-4 bg-gray-50 rounded-lg'>
                        <div className='flex items-center gap-3 mb-3'>
                            <FileText className="h-5 w-5 text-blue-600" />
                            <Label className='text-sm font-semibold text-gray-700'>Deskripsi Buku</Label>
                        </div>
                        <p className='text-sm text-gray-700 leading-relaxed'>
                            {book.deskripsi}
                        </p>
                    </div>

                    {/* Metadata */}
                    <div className='grid lg:grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200'>
                        <div>
                            <Label className='text-xs font-medium text-gray-500'>Dibuat</Label>    
                            <p className='text-sm text-gray-700'>
                                {book.created_at ? new Date(book.created_at).toLocaleDateString('id-ID') : 'Tidak tersedia'}
                            </p>
                        </div>
                        <div>
                            <Label className='text-xs font-medium text-gray-500'>Terakhir Diupdate</Label>    
                            <p className='text-sm text-gray-700'>
                                {new Date(book.updated_at).toLocaleDateString('id-ID')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}