import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {  BookCopy, BookOpen, ChartNoAxesCombined, Coins, Folder, Handshake, Home, LayoutGrid, User2, User2Icon, Users } from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {

    //1. Ambil data 'auth' dari props yang dibagikan (shared data)
    const { auth } = usePage<SharedData>().props;
    const userRole = auth.user.role;

    const adminLinks = [
        { href: route('dashboard'), title: 'Dashboard', icon: Home },
        { href: route('data-buku'), title: 'Data Buku', icon: BookCopy }, // Lihat buku, tambah buku
        { href: route('anggota-admin.index'), title: 'Anggota', icon: User2 },  // Lihat Anggota, tambah Anggota
        { href: route('peminjaman'), title: 'Peminjaman', icon: Handshake },  // Lihat Peminjaman, tambah Peminjaman
        { href: route('dashboard'), title: 'Perpanjangan ', icon: Coins },


    ];
    const guruLink = [
        { href: route('dashboard'), title: 'Dashboard', icon: Home },
        { href: route('dashboard'), title: 'Data Buku', icon: BookOpen },
        { href: route('dashboard'), title: 'Peminjaman', icon: Handshake },
        { href: route('dashboard'), title: 'Laporan', icon: ChartNoAxesCombined },
    ]

    const siswaLink = [
        { href: route('dashboard'), title: 'Dashboard', icon: Home },
        { href: route('anggota.index'), title: 'Profile Anggota', icon: User2Icon },
        { href: route('dashboard'), title: 'Data Buku', icon: BookOpen },
        { href: route('dashboard'), title: 'Peminjaman', icon: Handshake },
        { href: route('dashboard'), title: 'Laporan', icon: ChartNoAxesCombined },
    ]

    let navLinks: NavItem[] = [];

    // 3. Gunakan switch atau if-else untuk menentukan link mana yang akan digunakan
    switch (userRole) {
        case 'admin': 
            navLinks = adminLinks;
            break;
        case 'guru' : 
            navLinks = guruLink;
            break;
        case 'siswa' : 
            navLinks = siswaLink;
            break;
        default:
            navLinks = [];
            break;
    }

    return (
        <Sidebar collapsible="icon" variant="inset">
             <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" >
                                <AppLogo/>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navLinks} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}