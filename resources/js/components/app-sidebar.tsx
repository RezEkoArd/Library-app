import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BarChart2, BookOpen, Folder, Home, LayoutGrid, Users } from 'lucide-react';
import AppLogo from './app-logo';

// const mainNavItems: NavItem[] = [
//     {
//         title: 'Dashboard',
//         href: '/dashboard',
//         icon: LayoutGrid,
//     },
// ];

export function AppSidebar() {
    // const {isOpen} = useSidebar();

    //1. Ambil data 'auth' dari props yang dibagikan (shared data)
    const { auth } = usePage<SharedData>().props;
    const userRole = auth.user.role;

    const adminLinks = [
        { href: route('dashboard'), title: 'Dashboard', icon: Home },
        { href: route('dashboard'), title: 'Manajemen User', icon: Users },
    ];
    const guruLink = [
        { href: route('dashboard'), title: 'Dashboard', icon: Home },
        { href: route('dashboard'), title: 'Kelas Saya', icon: BookOpen }
    ]

    const siswaLink = [
        { href: route('dashboard'), title: 'Dashboard', icon: Home },
        { href: route('dashboard'), title: 'Lihat Nilai', icon: BarChart2 },
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