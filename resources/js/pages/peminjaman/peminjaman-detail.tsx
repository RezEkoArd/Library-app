import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import AppLayout from "@/layouts/app-layout"
import { BreadcrumbItem } from "@/types";
import { PeminjamanDetailPageProps } from "@/types/detailPeminjaman";
import { Head, Link, usePage } from "@inertiajs/react"

const breadcrumbs: BreadcrumbItem[] = [
  {
      title: 'Detail Perminjaman',
      href: '/peminjaman',
  },
];

const PeminjamanDetail = () => {
  const {peminjaman}  = usePage<PeminjamanDetailPageProps>().props;
  
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
              <div className="min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border p-4">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-full mx-auto">
                  <div className="w-full border-b border-gray-200 pb-4 mb-6">
                    <div className="flex items-center justify-between">
                      <h1 className="text-2xl font-bold text-gray-800 mb-4">
                        Kode Peminjaman: {peminjaman.kode_peminjaman}
                      </h1>
                      <div className="flex gap-2">
                        {peminjaman.status === 'dipinjam' && (
                          <Link href={`/peminjaman/${peminjaman.id}/perpanjangan`}>
                            <Button className="cursor-pointer">Perpanjang</Button>
                          </Link>
                        )}
                        <Link href="/peminjaman" >
                          <Button className="cursor-pointer" >Back</Button>
                        </Link>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <span className="font-semibold text-gray-600 mr-2">Nama Anggota:</span>
                        <span className="text-gray-800">{peminjaman.anggota?.nama_anggota}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-semibold text-gray-600 mr-2">Petugas:</span>
                        <span className="text-gray-800">{peminjaman.user?.name}</span>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">
                            Judul Buku
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">
                            Jumlah
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">
                            Kondisi Pinjam
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">
                            Kondisi Kembali
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {peminjaman.details.map((detail, i) => (
                          <tr 
                            key={i} 
                            className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
                          >
                            <td className="py-3 px-4 text-gray-800">
                              {detail.buku?.judul_buku}
                            </td>
                            <td className="py-3 px-4 text-gray-600">
                              {detail.jumlah_pinjam}
                            </td>
                            <td className="py-3 px-4">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {detail.kondisi_pinjam}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {detail.kondisi_kembali}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
        </AppLayout>
  )
}

export default PeminjamanDetail