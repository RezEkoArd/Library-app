
import AppLayout from '@/layouts/app-layout';
import { PagePropsDataBuku, type BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';

    import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data buku',
        href: '/databuku',
    },
];
const EditBook = () => {

    const {book, categories} = usePage<PagePropsDataBuku>().props;
    const {data, setData, put, errors} = useForm({
        kategori_id: book?.kategori_buku?.id ? String(book.kategori_buku.id) : '',
        isbn: book.isbn || '',
        judul_buku: book.judul_buku || '',
        penulis: book.penulis || '',
        penerbit: book.penerbit || '',
        tahun_terbit: book.tahun_terbit || '',
        bahasa: book.bahasa || '',
        stok_total: book.stok_total || '',
        stok_tersedia: book.stok_tersedia || '',
        deskripsi: book.deskripsi || '',
    });

    if (!book || !categories) {
        return <div>Loading...</div>;
    }

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(data);
        put(`/data-buku/book/${book.id}`)
    }
    

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Dashboard" />
            <div className='w-full flex flex-col  p-6'>
            <form className="space-y-8" onSubmit={handleUpdate}>
                        <div className="grid gap-2">
                                <Label htmlFor="kategori_id">Kategori Buku</Label>
                                <Select
                                    onValueChange={(value) => setData('kategori_id', value)}
                                    value={data.kategori_id}
                                >
                                    <SelectTrigger id="kategori_id">
                                        <SelectValue placeholder="Pilih Kategori" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={String(category.id)}>
                                                {category.nama_kategori}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.kategori_id} />
                            </div>
                        
                        <div className="grid gap-2">
                            <Label htmlFor="judul_buku">Judul Buku</Label>
                            <Input
                                id="judul_buku"
                                type="text"
                                required
                                autoFocus
                                autoComplete="judul_buku"
                                value={data.judul_buku}
                                onChange={(e) => setData('judul_buku', e.target.value)}
                                placeholder="Action"
                            />
                            <InputError message={errors.judul_buku} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="isbn">ISBN</Label>
                            <Input
                                id="isbn"
                                required
                                autoFocus
                                autoComplete="isbn"
                                value={data.isbn}
                                onChange={(e) => setData('isbn', e.target.value)}
                                placeholder="978-979-29-1234-1"
                            />
                            <InputError message={errors.isbn} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="penulis">Penulis</Label>
                            <Input
                                id="penulis"
                                required
                                autoFocus
                                autoComplete="penulis"
                                value={data.penulis}
                                onChange={(e) => setData('penulis', e.target.value)}
                                placeholder="Penulis buku"
                            />
                            <InputError message={errors.penulis} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="penerbit">Penerbit</Label>
                            <Input
                                id="penerbit"
                                required
                                autoFocus
                                autoComplete="penerbit"
                                value={data.penerbit}
                                onChange={(e) => setData('penerbit', e.target.value)}
                                placeholder="Penerbit buku"
                            />
                            <InputError message={errors.penerbit} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="tahun_terbit">Tahun Terbit</Label>
                            <Input
                                id="tahun_terbit"
                                type="number" // Disarankan menggunakan type="number" untuk tahun
                                required
                                autoFocus
                                autoComplete="off" // Matikan auto-complete yang tidak relevan
                                value={data.tahun_terbit}
                                onChange={(e) => setData('tahun_terbit', e.target.value)}
                                placeholder="Contoh: 2024"
                            />
                            <InputError message={errors.tahun_terbit} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="bahasa">Bahasa</Label>
                            <Input
                                id="bahasa"
                                required
                                autoFocus
                                autoComplete="bahasa"
                                value={data.bahasa}
                                onChange={(e) => setData('bahasa', e.target.value)}
                                placeholder="bahasa ..."
                            />
                            <InputError message={errors.bahasa} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="stok_total">Stock Total</Label>
                            <Input
                                id="stok_total"
                                type="number"
                                required
                                autoFocus
                                autoComplete="stok_total"
                                value={data.stok_total}
                                onChange={(e) => setData('stok_total', e.target.value)}
                            />
                            <InputError message={errors.stok_total} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="stok_tersedia">Stock Tersedia</Label>
                            <Input
                                id="stok_tersedia"
                                required
                                autoFocus
                                autoComplete="stok_tersedia"
                                value={data.stok_tersedia}
                                onChange={(e) => setData('stok_tersedia', e.target.value)}
                            />
                            <InputError message={errors.stok_tersedia} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="deskripsi">Deskripsi</Label>
                            <Textarea
                                id="deskripsi"
                                required
                                autoFocus
                                autoComplete="deskripsi"
                                value={data.deskripsi}
                                onChange={(e) => setData('deskripsi', e.target.value)}
                                placeholder="Deskripsi tentang kategori"
                            />
                            <InputError message={errors.deskripsi} />
                        </div>
                            <Button type="submit">Submit</Button>
                    </form>
            </div>
    </AppLayout>
  )
}

export default EditBook