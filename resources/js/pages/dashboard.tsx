import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import DashboardAdmin from './dashboard/admin/dashboardAdmin';
import DashboardGuru from './dashboard/guru/dashboardGuru';
import DashboardSiswa from './dashboard/siswa/dashboardSiswa';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    // Amnbil data auth dari props yang di shared
    const { auth } = usePage<SharedData>().props;
    const userRole = auth.user.role;

    // Function untuk render berdasarkan role
    const renderByRole = () => {
        switch (userRole) {
            case 'admin' :
                return <DashboardAdmin />;
            case 'guru' :
                return <DashboardGuru />;
            case 'siswa' : 
                return <DashboardSiswa />;
            default: 
                return (
                    <div className='text-center py-12'>
                        <h3 className='text-lg font-medium text-gray-900 mb-2'>
                            Role tidak dikenali
                        </h3>
                        <p className='text-gray-600'>
                            Silakan hubungi administrator untuk mendapatkan akses yang sesuai.
                        </p>
                    </div>
                )
        }
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
             {/* {Dynamic Dashboard Content} */}
             
             {renderByRole()}
        </AppLayout>
    );
}
