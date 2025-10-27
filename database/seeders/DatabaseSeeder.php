<?php

namespace Database\Seeders;

use App\Models\Petugas;
use App\Models\Payment;
use App\Models\User;
use App\Models\Member;
use App\Models\Category;
use App\Models\Pemasukan;
use App\Models\Pengeluaran;
use App\Models\ProfilWebsite;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Sajidan',
            'username' => 'sajidan',
            'password' => bcrypt('123'),
            'role' => 'admin',
        ]);

        User::create([
            'name' => 'Dhiya',
            'username' => 'diya',
            'password' => bcrypt('123'),
            'role' => 'warga',
        ]);
        User::create([
            'name' => 'Rahman',
            'username' => 'rahman',
            'password' => bcrypt('123'),
            'role' => 'warga',
        ]);
        User::create([
            'name' => 'Danis',
            'username' => 'danis',
            'password' => bcrypt('123'),
            'role' => 'warga',
        ]);
        User::create([
            'name' => 'Hamdi',
            'username' => 'hamdi',
            'password' => bcrypt('123'),
            'role' => 'petugas',
        ]);
         User::create([
            'name' => 'Riki',
            'username' => 'riki',
            'password' => bcrypt('123'),
            'role' => 'warga',
        ]);
        Petugas::create([
            'id_user' => '3',
        ]);
        Category::create([
            'name' => 'Umrah',
            'period' => 'Mingguan',
            'nominal' => 10000,
            'status' => 'active',
        ]);
        Category::create([
            'name' => 'Kurban',
            'period' => 'Bulanan',
            'nominal' => 20000,
            'status' => 'active',
        ]);Category::create([
            'name' => 'Agustusan',
            'period' => 'Tahunan',
            'nominal' => 10000,
            'status' => 'active',
        ]);
        // Member::create([
        //     'id_user' => 2,
        //     'id_category' => 1,
        // ]);
        //  Member::create([
        //     'id_user' => 4,
        //     'id_category' => 2,
        // ]);
        //  Member::create([
        //     'id_user' => 5,
        //     'id_category' => 3,
        // ]);
        // Member::create([
        //     'id_user' => 6,
        //     'id_category' => 2,
        // ]);
        // Payment::create([
        //     'id_user' => 2,
        //     'period' => 'mingguan',
        //     'nominal' => 10000,
        //     'id_petugas' => 3,
        //     'id_member' => 2,
        // ]);
        // Payment::create([
        //     'id_user' => 4,
        //     'period' => 'bulan',
        //     'nominal' => 10000,
        //     'id_petugas' => 3,
        //     'id_member' => 2,
        // ]);
        // Payment::create([
        //     'id_user' => 5,
        //     'period' => 'tahunan',
        //     'nominal' => 10000,
        //     'id_petugas' => 3,
        //     'id_member' => 2,
        // ]);
        // Payment::create([
        //     'id_user' => 6,
        //     'created_at' => '2025-10-01 12:00:00',
        //     'period' => 'bulan',
        //     'nominal' => 10000,
        //     'id_petugas' => 3,
        //     'id_member' => 2,
        // ]);
        Pemasukan::create([
            'sumber' => 'Infaq',
            'nominal' => 10000,
            'tanggal' => '2025-05-01',
            'keterangan' => 'Infaq Bulanan',
        ]);
        Pengeluaran::create([
            'sumber' => 'Belanja',
            'nominal' => 5000,
            'tanggal' => '2025-05-01',
            'keterangan' => 'Belanja Bulanan',
        ]);
        ProfilWebsite::create([
            'nama'=> 'Kaswarga',
            'nama_kepala' => 'Muhammad Sajidan Rifansyah',
            'foto_kepala' => 'co.jpg',
            'deskripsi' => 'Mengelola keuangan warga dengan mudah melalui website dan aplikasi',
            'visi_misi' => 'Menjadikan masyarakat',
            'logo' => 'logo.jpg',
            'hero' => 'hero.jpg',
            'tahun_berdiri' => '2003',
            'alamat' => 'Jl. Garut-Tasikmalaya, Salawu',
            'instagram' => 'https://instagram.com/sajidan03',
            'facebook' => 'https://instagram.com/sajidan03',
            'youtube' => 'https://instagram.com/sajidan03',
            'gmap' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.8227041352043!2d108.10326687500073!3d-7.3608588926482375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f5523e04b2043%3A0x378ffcaddc4297c!2sSMK%20YPC%20Tasikmalaya!5e1!3m2!1sid!2sid!4v1760488666396!5m2!1sid!2sid',
            'warna' => '#006D5B'
        ]);
    }
}
