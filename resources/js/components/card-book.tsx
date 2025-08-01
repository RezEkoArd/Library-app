import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Badge } from '@/components/ui/badge';
import { BookOpen, Calendar, Hash, MapPin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Buku } from "@/types/buku";
import { Link } from "@inertiajs/react";


const CardBookComponent = ({ book }: { book: Buku }) => {

    const isLowStock = book.stok_tersedia <= 2;
    const isOutOfStock = book.stok_tersedia === 0;

    const getStockBadgeVariant = () => {
        if (isOutOfStock) return "destructive"
        if (isLowStock) return "secondary"
        return "default";
    }

    const getStockBadgeText = () => {
        if (isOutOfStock) return "Habis"
        if (isLowStock) return "Terbatas"
        return "Tersedia";
    }

  return (
    <>
        <Card className='w-full max-w-sm hover:shadow-lg transition-shadow duration-300'>
            <CardHeader className='pb-3'>
                <div className='flex justify-between items-start gap-2'>
                    <div className='flex-1'>
                        <CardTitle className='text-lg leading-tight line-clamp-2'>
                            {book.judul_buku}
                        </CardTitle>
                        <CardDescription className='mt-1'>
                            oleh {book.penulis}
                        </CardDescription>
                    </div>
                    <Badge variant={getStockBadgeVariant()} className='shrink-0'>
                        {getStockBadgeText()}
                    </Badge>
                    </div> 
                    </CardHeader>
                        
                    <CardContent className='space-y-4'>
                            <div className='grid grid-cols-2 gap-3 text-sm'>
                            <div className='flex items-center gap-2'>
                                <BookOpen className='h-4 w-4 text-muted-foreground' />
                            <div>
                                <p className='text-muted-foreground'>Penerbit</p>
                                <p className='font-medium'>{book.penerbit}</p>
                            </div>
                        </div>

                        <div className='flex items-center gap-2'>
                        <Calendar className='h-4 w-4 text-muted-foreground' />
                        <div>
                            <p className="text-muted-foreground">Tahun</p>
                            <p className="font-medium">{book.tahun_terbit}</p>
                        </div>
                    </div>

                    <div className='flex item-center gap-2'>
                    <MapPin className='h-4 w-4 text-muted-foreground' />
                    <div>
                        <p className="text-muted-foreground">Asal</p>
                        <p className="font-medium">{book.bahasa}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Hash className="h-4 w-4 text-muted-foreground" />
                <div>
                <p className="text-muted-foreground">ISBN</p>
                <p className="font-mono text-xs font-medium">{book.isbn}</p>
            </div>
            </div>
                </div>

                <Separator />

                {/* Description */}
                <div>
                    <p className='text-sm text-muted-foreground leading-relaxed line-clamp-3'>
                        {book.deskripsi}
                    </p>
                </div>

                {/* Stock Info */}
                <div className='flex items-center justify-between'>
                    <div className='text-sm'>
                        <span className='text-muted-foreground'>Stok: </span>
                        <span className={`font-semibold ${
                            isOutOfStock
                            ? "text-destructive"
                            : isLowStock
                            ? "text-yellow-600"
                            : "text-green-600"
                        }`}>
                            {book.stok_tersedia}/{book.stok_total}
                        </span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className='flex gap-2 pt-0 w-full items-center justify-between'>
                <Link href={`/data-buku/${book.id}`} >
                    <Button variant="outline" size='sm' className="cursor-pointer">
                        Detail
                    </Button>
                </Link>
                
                <Link href='/peminjaman/create' >
                    <Button 
                        size="sm" 
                        className="flex-1 cursor-pointer"
                        disabled={isOutOfStock}
                        >
                        Pinjam
                    </Button>
                </Link>
            </CardFooter>
        </Card> 
    </>
  )
}

export default CardBookComponent