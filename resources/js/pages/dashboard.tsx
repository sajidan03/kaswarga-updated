import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
  BarChart3,
  Users,
  UserCheck,
  UserCog,
  DollarSign,
  Folder,
  TrendingUp,
  Activity
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: dashboard().url,
  },
];

const statsData = {
  users: 1254,
  members: 842,
  residents: 3562,
  officers: 48,
  revenue: 12564000,
  categories: 18,
};
const revenueData = [
  { month: 'Jan', revenue: 950000 },
  { month: 'Feb', revenue: 1120000 },
  { month: 'Mar', revenue: 980000 },
  { month: 'Apr', revenue: 1250000 },
  { month: 'May', revenue: 1450000 },
  { month: 'Jun', revenue: 1650000 },
  { month: 'Jul', revenue: 1560000 },
  { month: 'Aug', revenue: 1420000 },
  { month: 'Sep', revenue: 1380000 },
  { month: 'Oct', revenue: 1620000 },
  { month: 'Nov', revenue: 1750000 },
  { month: 'Dec', revenue: 1890000 },
];

const userActivityData = [
  { day: 'Sen', active: 120 },
  { day: 'Sel', active: 156 },
  { day: 'Rab', active: 198 },
  { day: 'Kam', active: 224 },
  { day: 'Jum', active: 180 },
  { day: 'Sab', active: 145 },
  { day: 'Min', active: 110 },
];

export default function Dashboard() {
  // Format angka untuk tampilan
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('id-ID').format(num);
  };

  // Format currency untuk tampilan
  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(num);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex flex-col gap-6 p-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Ringkasan data dan statistik sistem
          </p>
        </div>

        {/* Grid Statistik */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Kartu Total User */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-medium text-muted-foreground">Total User</h3>
                <p className="text-2xl font-bold">{formatNumber(statsData.users)}</p>
              </div>
              <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/30">
                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+12.5% dari bulan lalu</span>
            </div>
          </div>

          {/* Kartu Member */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-medium text-muted-foreground">Member</h3>
                <p className="text-2xl font-bold">{formatNumber(statsData.members)}</p>
              </div>
              <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/30">
                <UserCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+8.2% dari bulan lalu</span>
            </div>
          </div>

          {/* Kartu Warga */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-medium text-muted-foreground">Warga</h3>
                <p className="text-2xl font-bold">{formatNumber(statsData.residents)}</p>
              </div>
              <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900/30">
                <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+5.7% dari bulan lalu</span>
            </div>
          </div>

          {}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-medium text-muted-foreground">Petugas</h3>
                <p className="text-2xl font-bold">{formatNumber(statsData.officers)}</p>
              </div>
              <div className="rounded-full bg-orange-100 p-3 dark:bg-orange-900/30">
                <UserCog className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-muted-foreground">
              <span>Stabil tidak berubah</span>
            </div>
          </div>

          {/* Kartu Total Pendapatan */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-medium text-muted-foreground">Total Pendapatan</h3>
                <p className="text-2xl font-bold">{formatCurrency(statsData.revenue)}</p>
              </div>
              <div className="rounded-full bg-teal-100 p-3 dark:bg-teal-900/30">
                <DollarSign className="h-5 w-5 text-teal-600 dark:text-teal-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+22.3% dari tahun lalu</span>
            </div>
          </div>

          {/* Kartu Kategori */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-medium text-muted-foreground">Jumlah Kategori</h3>
                <p className="text-2xl font-bold">{formatNumber(statsData.categories)}</p>
              </div>
              <div className="rounded-full bg-pink-100 p-3 dark:bg-pink-900/30">
                <Folder className="h-5 w-5 text-pink-600 dark:text-pink-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-muted-foreground">
              <span>+2 kategori baru bulan ini</span>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Chart Pendapatan Bulanan */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Pendapatan Bulanan</h2>
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="h-64">
              <div className="flex h-full items-end justify-between gap-2">
                {revenueData.map((item, index) => {
                  const heightPercentage = (item.revenue / 2000000) * 100;
                  return (
                    <div key={index} className="flex flex-1 flex-col items-center">
                      <div
                        className="w-full rounded-t-md bg-teal-500 transition-all hover:bg-teal-600"
                        style={{ height: `${heightPercentage}%` }}
                        title={formatCurrency(item.revenue)}
                      ></div>
                      <span className="mt-2 text-xs text-muted-foreground">
                        {item.month}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Chart Aktivitas Pengguna */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Aktivitas Pengguna Mingguan</h2>
              <Activity className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="h-64">
              <div className="flex h-full items-end justify-between gap-2">
                {userActivityData.map((item, index) => {
                  const heightPercentage = (item.active / 250) * 100;
                  return (
                    <div key={index} className="flex flex-1 flex-col items-center">
                      <div
                        className="w-full rounded-t-md bg-blue-500 transition-all hover:bg-blue-600"
                        style={{ height: `${heightPercentage}%` }}
                        title={`${item.active} pengguna`}
                      ></div>
                      <span className="mt-2 text-xs text-muted-foreground">
                        {item.day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Aktivitas Terbaru</h2>
          <div className="space-y-4">
            {[
              { user: 'Ahmad Santoso', action: 'membuat laporan baru', time: '5 menit lalu' },
              { user: 'Siti Rahayu', action: 'memperbarui data member', time: '12 menit lalu' },
              { user: 'Budi Pratama', action: 'melakukan pembayaran', time: '30 menit lalu' },
              { user: 'Rina Wijaya', action: 'menambahkan kategori baru', time: '1 jam lalu' },
              { user: 'Dewi Kusuma', action: 'mengupload dokumen', time: '2 jam lalu' },
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-blue-500"></div>
                <div className="flex flex-1 items-center justify-between">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span>{' '}
                    {activity.action}
                  </p>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
