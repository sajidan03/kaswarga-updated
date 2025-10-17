import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import {
  BarChart3,
  Users,
  UserCheck,
  UserCog,
  DollarSign,
  Folder,
  Activity,
  Calendar,
  CreditCard
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface DashboardData {
  total_users: number;
  total_members: number;
  total_residents: number;
  total_officers: number;
  total_revenue: number;
  total_categories: number;
  monthly_revenue: { month: string; revenue: number }[];
  user_activity: { day: string; active: number }[];
  recent_payments: {
    id: number;
    user_name: string;
    amount: number;
    period: string;
    created_at: string;
  }[];
}

interface DashboardProps {
  dashboardData: DashboardData;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: dashboard().url,
  },
];

export default function Dashboard({ dashboardData }: DashboardProps) {
  const { props } = usePage<{ dashboardData: DashboardData }>();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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

  // Format date untuk tampilan
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Format time untuk tampilan
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Hitung max values untuk charts dengan fallback
  const maxRevenue = Math.max(...dashboardData.monthly_revenue.map(item => item.revenue), 1);
  const maxActivity = Math.max(...dashboardData.user_activity.map(item => item.active), 1);

  // Hitung height percentage dengan fallback
  const calculatePercentage = (value: number, max: number) => {
    if (max === 0) return 0;
    return Math.min((value / max) * 100, 100);
  };

  // Jika masih di server-side rendering, tampilkan skeleton
  if (!isClient) {
    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Dashboard" />
        <div className="flex flex-col gap-6 p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          {/* Skeleton untuk cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-lg border bg-white p-6 shadow-sm">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex flex-col gap-6 p-4 sm:p-6">
        {/* Header dengan Waktu Real-time */}
        <div className="flex flex-col gap-4 sm:gap-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-black">Dashboard</h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-1">
                Ringkasan data dan statistik sistem iuran warga
              </p>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-xl sm:text-2xl font-mono text-blue-600 font-semibold">
                {currentTime.toLocaleTimeString('id-ID')}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                {currentTime.toLocaleDateString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Grid Statistik */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Total User */}
          <div className="rounded-lg border bg-white p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="text-xs sm:text-sm font-medium text-muted-foreground">Total User</h3>
                <p className="text-xl sm:text-2xl font-bold text-black">{formatNumber(dashboardData.total_users)}</p>
              </div>
              <div className="rounded-full bg-blue-100 p-2 sm:p-3">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Total pengguna sistem
            </div>
          </div>

          {/* Total Member */}
          <div className="rounded-lg border bg-white p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="text-xs sm:text-sm font-medium text-muted-foreground">Member Aktif</h3>
                <p className="text-xl sm:text-2xl font-bold text-black">{formatNumber(dashboardData.total_members)}</p>
              </div>
              <div className="rounded-full bg-green-100 p-2 sm:p-3">
                <UserCheck className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Anggota aktif iuran
            </div>
          </div>

          {/* Total Warga */}
          <div className="rounded-lg border bg-white p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="text-xs sm:text-sm font-medium text-muted-foreground">Total Warga</h3>
                <p className="text-xl sm:text-2xl font-bold text-black">{formatNumber(dashboardData.total_residents)}</p>
              </div>
              <div className="rounded-full bg-purple-100 p-2 sm:p-3">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Data warga terdaftar
            </div>
          </div>

          {/* Total Petugas */}
          <div className="rounded-lg border bg-white p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="text-xs sm:text-sm font-medium text-muted-foreground">Petugas</h3>
                <p className="text-xl sm:text-2xl font-bold text-black">{formatNumber(dashboardData.total_officers)}</p>
              </div>
              <div className="rounded-full bg-orange-100 p-2 sm:p-3">
                <UserCog className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Staff pengelola iuran
            </div>
          </div>

          {/* Total Pendapatan */}
          <div className="rounded-lg border bg-white p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="text-xs sm:text-sm font-medium text-muted-foreground">Total Pendapatan</h3>
                <p className="text-xl sm:text-2xl font-bold text-black">{formatCurrency(dashboardData.total_revenue)}</p>
              </div>
              <div className="rounded-full bg-teal-100 p-2 sm:p-3">
                <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600" />
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Total pemasukan iuran
            </div>
          </div>

          {/* Total Kategori */}
          <div className="rounded-lg border bg-white p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="text-xs sm:text-sm font-medium text-muted-foreground">Jenis Iuran</h3>
                <p className="text-xl sm:text-2xl font-bold text-black">{formatNumber(dashboardData.total_categories)}</p>
              </div>
              <div className="rounded-full bg-pink-100 p-2 sm:p-3">
                <Folder className="h-4 w-4 sm:h-5 sm:w-5 text-pink-600" />
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Kategori iuran aktif
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          {/* Chart Pendapatan Bulanan */}
          <div className="rounded-lg border bg-white p-4 sm:p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-semibold text-black">Pendapatan Bulanan</h2>
              <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
            </div>
            <div className="h-48 sm:h-64">
              {dashboardData.monthly_revenue.length > 0 ? (
                <div className="flex h-full items-end justify-between gap-1 sm:gap-2">
                  {dashboardData.monthly_revenue.map((item, index) => {
                    const heightPercentage = calculatePercentage(item.revenue, maxRevenue);
                    return (
                      <div key={index} className="flex flex-1 flex-col items-center gap-1 sm:gap-2">
                        <div className="relative w-full">
                          <div
                            className="w-full rounded-t-md bg-teal-500 transition-all hover:bg-teal-600 min-h-[2px]"
                            style={{ height: `${Math.max(heightPercentage, 2)}%` }}
                            title={`${item.month}: ${formatCurrency(item.revenue)}`}
                          ></div>
                          {/* Tooltip value */}
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            {formatCurrency(item.revenue)}
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground text-center px-1">
                          {item.month}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground text-sm">Tidak ada data pendapatan</p>
                </div>
              )}
            </div>
          </div>

          {/* Chart Aktivitas Pengguna */}
          <div className="rounded-lg border bg-white p-4 sm:p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-semibold text-black">Aktivitas Pengguna</h2>
              <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
            </div>
            <div className="h-48 sm:h-64">
              {dashboardData.user_activity.length > 0 ? (
                <div className="flex h-full items-end justify-between gap-1 sm:gap-2">
                  {dashboardData.user_activity.map((item, index) => {
                    const heightPercentage = calculatePercentage(item.active, maxActivity);
                    return (
                      <div key={index} className="flex flex-1 flex-col items-center gap-1 sm:gap-2">
                        <div className="relative w-full">
                          <div
                            className="w-full rounded-t-md bg-blue-500 transition-all hover:bg-blue-600 min-h-[2px]"
                            style={{ height: `${Math.max(heightPercentage, 2)}%` }}
                            title={`${item.day}: ${item.active} aktivitas`}
                          ></div>
                          {/* Tooltip value */}
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            {item.active} aktivitas
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground text-center px-1">
                          {item.day}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground text-sm">Tidak ada data aktivitas</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pembayaran Terbaru */}
        <div className="rounded-lg border bg-white p-4 sm:p-6 shadow-sm">
          <h2 className="mb-4 text-base sm:text-lg font-semibold text-black">Pembayaran Terbaru</h2>
          {dashboardData.recent_payments.length > 0 ? (
            <div className="space-y-3">
              {dashboardData.recent_payments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-full">
                      <CreditCard className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm sm:text-base text-black">{payment.user_name}</p>
                      <p className="text-xs text-muted-foreground">{payment.period}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600 text-sm sm:text-base">{formatCurrency(payment.amount)}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(payment.created_at)} {formatTime(payment.created_at)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm sm:text-base">Belum ada pembayaran</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
