import { Book } from '@/pages/data-buku/book-table/column';
import { LucideIcon } from 'lucide-react';
import { ElementType } from 'react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    username: string;
    name: string;
    email: string;
    role: string;
    no_telp?:string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface CategoryBuku {
    id: string;
    nama_kategori: string;
    deskripsi: string;
    created_at: string;
    updated_at: string;
}

export interface FlashMessage {
    success?: string;
    errorMessage?: string; 
}

export interface PagePropsDataBuku extends Record<string, any>{
    flash: FlashMessage;
    categories: CategoryBuku[];
    books: Book[];
    chartData: ChartDataItem;
    filters : {
        search: string | null;
    }
}

export interface Anggota {
    id: string;
    nama_anggota: string;
    nama_lengkap: string;
    alamat: string;
    no_telp: string;
    email:string;
    jenis_anggota: string;
    status: number;
}

export interface PagePropsAnggota extends Record<string, any>{
    flash: FlashMessage;
    anggota : Anggota | null;

}
  
export interface CardDashboard {
    cardDescription: string;
    cardTitle: string;
    cardAction?: ElementType | null
    footerTitle:string;
    footerDescription:string;
}
