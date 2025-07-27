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

const CreateAnggota = () => {
    
    const {data, setData, post, processing, errors,reset} = useForm({
        nama_anggota: '',
        nama_lengkap: '',
        alamat: '',
        no_telp: '',
        email: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // console.log(data);
        post('/anggota', {
            onSuccess: () => reset(),
          })
    }
  return (
        <SheetContent>
            <SheetHeader>
                <SheetTitle className="mb-4">Create New Anggota</SheetTitle>
                <SheetDescription asChild className="scroll-smooth">
                <div className="overflow-y-auto max-h-[calc(100vh-120px)] pr-2">
                    <form className="space-y-8" onSubmit={handleSubmit}>
                        
                        <div className="grid gap-2">
                            <Label htmlFor="nama_anggota">Nama Anggota</Label>
                            <Input
                                id="nama_anggota"
                                type="text"
                                required
                                autoFocus
                                autoComplete="nama_anggota"
                                value={data.nama_anggota}
                                onChange={(e) => setData('nama_anggota', e.target.value)}
                                placeholder="Jhon Doe"
                            />
                            <InputError message={errors.nama_anggota} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="nama_lengkap">Nama Lengkap</Label>
                            <Input
                                id="nama_lengkap"
                                required
                                autoFocus
                                autoComplete="nama_lengkap"
                                value={data.nama_lengkap}
                                onChange={(e) => setData('nama_lengkap', e.target.value)}
                                placeholder="Jhon Doe Saputra singgalang"
                            />
                            <InputError message={errors.nama_lengkap} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                id="email"
                                required
                                autoFocus
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="email@example.com"
                            />
                            <InputError message={errors.email} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="no_telp">Nomor Telephone</Label>
                            <Input
                                id="no_telp"
                                required
                                autoFocus
                                autoComplete="no_telp"
                                value={data.no_telp}
                                onChange={(e) => setData('no_telp', e.target.value)}
                            />
                            <InputError message={errors.no_telp} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="alamat">Alamat</Label>
                            <Textarea
                                id="alamat"
                                required
                                autoFocus
                                autoComplete="alamat"
                                value={data.alamat}
                                onChange={(e) => setData('alamat', e.target.value)}
                                placeholder="alamat tentang kategori"
                            />
                            <InputError message={errors.alamat} />
                        </div>
                            <Button type="submit">Submit</Button>
                    </form>
                </div>
                
                </SheetDescription>
            </SheetHeader>
        </SheetContent>
  )
}

export default CreateAnggota