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
import React, { useEffect } from "react"
import { Textarea } from "./ui/textarea"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Anggota } from "@/types"

// Define Props
interface EditAnggotaProps {
    recentData : Anggota
}


const EditAnggota = (  {recentData} : EditAnggotaProps ) => {
    
    const {data, setData, put, processing, errors, reset} = useForm({
        nama_anggota: '',
        nama_lengkap: '',
        alamat: '',
        no_telp: '',
        email: '',
        status: '',
    })

    // Populated from with exiting data when component mounts
    useEffect(() => {
        if (recentData) {
            setData({
                nama_anggota: recentData.nama_anggota || '',
                nama_lengkap: recentData.nama_lengkap || '',
                alamat: recentData.alamat || '',
                no_telp: recentData.no_telp || '',
                email: recentData.email || '',
                status: recentData.status?.toString() || '',
            })
        }
    },[recentData])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/anggota-admin/${recentData.id}`, {
            onSuccess: () => reset(),
            preserveScroll: true
        });
    }

    const handleStatusChange = (value: string) => {
        setData('status', value)
    }

  return (
        <SheetContent>
            <SheetHeader>
                <SheetTitle className="mb-4">Edit Anggota</SheetTitle>
                <SheetDescription asChild className="scroll-smooth">
                <div className="overflow-y-auto max-h-[calc(100vh-120px)] pr-2">
                    <form className="space-y-8" onSubmit={handleSubmit}>
                        
                        <div className="grid gap-2">
                            <Label htmlFor="status">Status</Label>
                            <Select value={data.status} onValueChange={handleStatusChange}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder={recentData.status == 1 ? "Aktif" : "Tidak Aktif"} />
                                    {/* recentData.status == 1 ? "Aktif" : "Tidak Aktif" */}
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                    <SelectItem value="1">Aktif</SelectItem>
                                    <SelectItem value="0">Tidak Aktif</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.status} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="nama_anggota">Nama Anggota</Label>
                            <Input
                                id="nama_anggota"
                                required
                                autoFocus
                                autoComplete="nama_anggota"
                                value={data.nama_anggota}
                                onChange={(e) => setData('nama_anggota', e.target.value)}
                                placeholder="Jhon Doe Saputra singgalang"
                            />
                            <InputError message={errors.nama_anggota} />
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

export default EditAnggota