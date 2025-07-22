" use client"
    import {
        SheetContent,
        SheetDescription,
        SheetHeader,
        SheetTitle,
    } from "@/components/ui/sheet"
    import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { useForm } from "@inertiajs/react"
import InputError from "./input-error"
import React from "react"
import { Textarea } from "./ui/textarea"

  

const CreateCategory = () => {
    const {data, setData, post, processing, errors,reset} = useForm({
        nama_kategori: '',
        deskripsi: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(data)
        post('/data-buku/category', {
            preserveScroll: true,
            onSuccess: () => reset('nama_kategori', 'deskripsi'),
          })
    }
  return (
        <SheetContent>
            <SheetHeader>
                <SheetTitle className="mb-4">Create Category</SheetTitle>
                <SheetDescription asChild>
                <form className="space-y-8" onSubmit={handleSubmit}>
                    <div className="grid gap-2">
                        <Label htmlFor="nama_kategori">Nama Kategori</Label>
                        <Input
                            id="nama_kategori"
                            type="text"
                            required
                            autoFocus
                            autoComplete="nama_kategori"
                            value={data.nama_kategori}
                            onChange={(e) => setData('nama_kategori', e.target.value)}
                            placeholder="Action"
                        />
                        <InputError message={errors.nama_kategori} />
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
                </SheetDescription>
            </SheetHeader>
        </SheetContent>
  )
}

export default CreateCategory