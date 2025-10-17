<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Member;
use App\Models\Payment;
use App\Models\Category;
use App\Models\ProfilWebsite;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $data = [
            'total_users' => User::count(),
            'total_members' => Member::count(),
            'total_residents' => User::where('role', 'warga')->count(),
            'total_officers' => User::where('role', 'petugas')->count(),
            'total_revenue' => (int) Payment::sum('nominal'),
            'total_categories' => Category::count(),
        ];

        // Data pendapatan bulanan dengan method yang sudah diperbaiki
        $monthlyRevenue = $this->getMonthlyRevenueData();

        // Data aktivitas pengguna dengan method yang sudah diperbaiki
        $userActivity = $this->getUserActivityData();

        // Pembayaran terbaru
        $recentPayments = Payment::with('user')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get()
            ->map(function ($payment) {
                return [
                    'id' => $payment->id,
                    'user_name' => $payment->user->name ?? 'Unknown',
                    'amount' => (int) $payment->nominal,
                    'period' => $payment->period ?? Carbon::parse($payment->created_at)->format('F Y'),
                    'created_at' => $payment->created_at->toISOString()
                ];
            });

        $dashboardData = array_merge($data, [
            'monthly_revenue' => $monthlyRevenue,
            'user_activity' => $userActivity,
            'recent_payments' => $recentPayments,
        ]);

        $profil = ProfilWebsite::all()->first();

        return Inertia::render('Admin/Dashboard', [
            'dashboardData' => $dashboardData,
            'profil' => $profil,
        ]);
    }

    private function getMonthlyRevenueData()
    {
        $monthlyRevenue = Payment::select(
                DB::raw('YEAR(created_at) as year'),
                DB::raw('MONTH(created_at) as month'),
                DB::raw('COALESCE(SUM(nominal), 0) as revenue')
            )
            ->where('created_at', '>=', Carbon::now()->subMonths(11)->startOfMonth())
            ->groupBy('year', 'month')
            ->orderBy('year', 'asc')
            ->orderBy('month', 'asc')
            ->get();

        // Buat array untuk 12 bulan terakhir dengan nilai default
        $fullYearData = [];
        for ($i = 11; $i >= 0; $i--) {
            $date = Carbon::now()->subMonths($i);
            $monthYear = $date->format('M');
            $yearMonth = $date->format('Y-m');

            // Cari data yang sesuai
            $revenue = 0;
            foreach ($monthlyRevenue as $item) {
                $itemDate = Carbon::create($item->year, $item->month, 1);
                if ($itemDate->format('Y-m') === $yearMonth) {
                    $revenue = (int) $item->revenue;
                    break;
                }
            }

            $fullYearData[] = [
                'month' => $monthYear, // Hanya singkatan bulan
                'revenue' => $revenue
            ];
        }

        return $fullYearData;
    }

    private function getUserActivityData()
    {
        $userActivity = Payment::select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('COUNT(*) as activity_count')
            )
            ->where('created_at', '>=', Carbon::now()->subDays(6)->startOfDay())
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get();

        // Buat array untuk 7 hari terakhir dengan nilai default
        $fullWeekData = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i);
            $dayName = $date->locale('id')->translatedFormat('D'); // Hari dalam bahasa Indonesia

            // Cari data yang sesuai
            $activity = 0;
            foreach ($userActivity as $item) {
                $itemDate = Carbon::parse($item->date);
                if ($itemDate->format('Y-m-d') === $date->format('Y-m-d')) {
                    $activity = (int) $item->activity_count;
                    break;
                }
            }

            $fullWeekData[] = [
                'day' => $dayName,
                'active' => $activity
            ];
        }

        return $fullWeekData;
    }
}
