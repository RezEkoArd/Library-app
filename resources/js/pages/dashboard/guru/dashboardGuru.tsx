import { BookCopy, BookDown, FolderInput, Users2 } from 'lucide-react';
import { CardDashboard } from '@/components/card-dashboard';
import { DashboardPieChart } from '@/components/dashboard-piechart';
import DashboardAreaChart from '@/components/dashboard-areachart';
import DashboardCardList from '@/components/dashboard-cardlist';
import { DashboardByRole } from '@/types';



export default function DashboardSiswa({ jumlahbuku, anggota, peminjaman, pengembalian }: DashboardByRole ) {
    return (
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
            <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <CardDashboard
                        cardTitle={jumlahbuku}
                        cardDescription="Total Koleksi Buku"
                        cardAction={BookCopy} 
                        footerTitle="Informasi"
                        footerDescription="Update koleksi buku"
                    />
                </div>
                <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <CardDashboard
                        cardTitle={anggota}
                        cardDescription="Jumlah Anggota Aktif"
                        cardAction={Users2} 
                        footerTitle="Informasi"
                        footerDescription="Anggota terdaftar"
                    />
                </div>
                <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                <CardDashboard
                        cardTitle={peminjaman}
                        cardDescription="Buku Sedang Dipinjam"
                        cardAction={FolderInput} 
                        footerTitle="Informasi"
                        footerDescription="Data peminjaman aktif"
                    />
                </div>
                <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                <CardDashboard
                        cardTitle={pengembalian}
                        cardDescription="Dikembalikan"
                        cardAction={BookDown} 
                        footerTitle="Informasi"
                        footerDescription="Data pengembalian"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
            <div className="relative bg-primary-foreground p-4 rounded-lg">
                <DashboardPieChart />
            </div>
            <div className="relative bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
                <DashboardAreaChart />
            </div>
            <div className="relative bg-primary-foreground p-4 rounded-lg">
                <DashboardCardList title="Buku Paling Populer"/>
            </div>
        </div>             
    </div>
    );
}
