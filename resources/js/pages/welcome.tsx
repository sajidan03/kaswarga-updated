import { login, userEdit } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {motion} from 'framer-motion';

interface ProfilWebsite {
    nama: string
    nama_kepala: string
    foto_kepala: string
    logo: string
    hero: string
    warna: string
    deskripsi: string
    visi_misi: string
    tahun_berdiri: string
    alamat: string
    instagram: string
    facebook: string
    youtube: string
    gmap: string
}
interface WelcomeProps {
    profil: ProfilWebsite;
    [key: string]: unknown;
}
export default function Welcome() {
    const { auth, profil } = usePage<WelcomeProps>().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Warna tema dari database
    const themeColor = profil.warna || '#0d9488'; // Fallback ke teal-500 jika tidak ada

    console.log(profil)
    return (
        <>
            <Head title="Selamat Datang di Kaswarga">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="bg-gray-900 min-h-screen">
                {/* Header */}
                <motion.header
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute inset-x-0 top-0 z-50">
                    <nav className="flex items-center justify-between p-6 lg:px-8">
                        <div className="flex lg:flex-1">
                            <Link href="/" className="-m-1.5 p-1.5 flex items-center">
                                <div
                                    className="flex h-8 w-8 items-center justify-center rounded-full text-white mr-2 overflow-hidden"
                                    style={{ backgroundColor: themeColor }}
                                >
                                    <img
                                        src={`/storage/assets/${profil.logo}`}
                                        alt="Logo"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <span className="text-xl font-bold text-white -py-3">{profil.nama.slice(1)}</span>
                            </Link>
                        </div>
                        <div className="flex lg:hidden">
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(true)}
                                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
                            >
                                <span className="sr-only">Buka menu utama</span>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    className="size-6"
                                    aria-hidden="true"
                                >
                                    <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className="hidden lg:flex lg:gap-x-12">
                            <a href="#beranda" className="text-sm/6 font-semibold text-white hover:text-teal-400">
                                Beranda
                            </a>
                            <a href="#fitur" className="text-sm/6 font-semibold text-white hover:text-teal-400">
                                Fitur
                            </a>
                            <a href="#keunggulan" className="text-sm/6 font-semibold text-white hover:text-teal-400">
                                Keunggulan
                            </a>
                            <a href="#visimisi" className="text-sm/6 font-semibold text-white hover:text-teal-400">
                                Visi & Misi
                            </a>
                            <a href="#tentang" className="text-sm/6 font-semibold text-white hover:text-teal-400">
                                Tentang
                            </a>
                        </div>
                        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                            {auth.user ? (
                                <Link
                                    href='/login'
                                    className="text-sm/6 font-semibold text-white hover:text-teal-400"
                                >
                                    Login <span aria-hidden="true">&rarr;</span>
                                </Link>
                            ) : (
                                <Link
                                    href='/login'
                                    className="text-sm/6 font-semibold text-white hover:text-teal-400"
                                >
                                    Masuk <span aria-hidden="true">&rarr;</span>
                                </Link>
                            )}
                        </div>
                    </nav>

                    {/* Mobile menu dialog */}
                    {mobileMenuOpen && (
                        <div className="lg:hidden">
                            <div className="fixed inset-0 z-50" />
                            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
                                <div className="flex items-center justify-between">
                                    <Link href="/" className="-m-1.5 p-1.5 flex items-center">
                                        <div
                                            className="flex h-8 w-8 items-center justify-center rounded-full text-white mr-2"
                                            style={{ backgroundColor: themeColor }}
                                        >
                                            <span className="text-lg font-bold">K</span>
                                        </div>
                                        <span className="text-xl font-bold text-white">aswarga</span>
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="-m-2.5 rounded-md p-2.5 text-gray-200"
                                    >
                                        <span className="sr-only">Tutup menu</span>
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            className="size-6"
                                            aria-hidden="true"
                                        >
                                            <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="mt-6 flow-root">
                                    <div className="-my-6 divide-y divide-white/10">
                                        <div className="space-y-2 py-6">
                                            <a
                                                href="#fitur"
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Beranda
                                            </a>
                                            <a
                                                href="#fitur"
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Fitur
                                            </a>
                                            <a
                                                href="#keunggulan"
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Keunggulan
                                            </a>
                                            <a
                                                href="#visimisi"
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Visi & Misi
                                            </a>
                                            <a
                                                href="#tentang"
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Tentang
                                            </a>
                                        </div>
                                        <div className="py-6">
                                            {auth.user ? (
                                                <Link
                                                    href={login()}
                                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-white/5"
                                                >
                                                    Login
                                                </Link>
                                            ) : (
                                                <Link
                                                    href={login()}
                                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-white/5"
                                                >
                                                    Masuk
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.header>

                <div className="relative isolate px-6 pt-14 lg:px-8 min-h-screen flex items-center">
                    <div className="absolute inset-0 -z-10">
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url("/storage/assets/${profil.hero}")`
                        }}
                    />
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
                </div>
                                <div
                        aria-hidden="true"
                        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    >
                        <div
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                            style={{
                                background: `linear-gradient(to top right, ${themeColor}40, #fc80ff)`
                            }}
                        />
                    </div>

                    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-32 relative z-10">
                        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                            <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-200 ring-1 ring-white/20 hover:ring-white/30 backdrop-blur-sm">
                                Platform terbaru untuk mengelola keuangan warga.{' '}
                                <a href="#tentang" className="font-semibold" style={{ color: themeColor }}>
                                    <span aria-hidden="true" className="absolute inset-0" />
                                    Pelajari lebih lanjut <span aria-hidden="true">&rarr;</span>
                                </a>
                            </div>
                        </div>
                        <div className="text-center">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl"
                            >
                                Kelola Keuangan Warga dengan Mudah
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="mt-8 text-lg font-medium text-pretty text-gray-200 sm:text-xl/8"
                            >
                                Aplikasi manajemen kas untuk lingkungan Anda. Pantau pemasukan, pengeluaran,
                                dan laporan keuangan warga secara transparan dan efisien.
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="mt-10 flex items-center justify-center gap-x-6"
                            >
                                {auth.user ? (
                                    <Link
                                        href={login()}
                                        className="rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors duration-200"
                                        style={{
                                            backgroundColor: themeColor,
                                            focusVisible: { outlineColor: themeColor }
                                        }}
                                    >
                                        Masuk ke Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={login()}
                                            className="rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors duration-200"
                                            style={{
                                                backgroundColor: themeColor,
                                                focusVisible: { outlineColor: themeColor }
                                            }}
                                        >
                                            Mulai Sekarang
                                        </Link>
                                        {/* <Link
                                            href={login()}
                                            className="text-sm/6 font-semibold text-white hover:opacity-80 transition-colors duration-200"
                                            style={{ color: themeColor }}
                                        >
                                            Masuk ke Akun <span aria-hidden="true">→</span>
                                        </Link> */}
                                    </>
                                )}
                            </motion.div>
                        </div>
                    </div>

                    {/* Background effect bottom */}
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                    >
                        <div
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                            style={{
                                background: `linear-gradient(to top right, ${themeColor}40, #fc80ff)`
                            }}
                        />
                    </div>
                </div>

                {/* Features Section */}
                <motion.section
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1, ease: "easeOut" }}
                id="fitur" className="py-24 sm:py-32 bg-gray-900">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:text-center">
                            <h2 className="text-base/7 font-semibold" style={{ color: themeColor }}>Fitur Unggulan</h2>
                            <p className="mt-2 text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
                                Semua yang Anda butuhkan untuk mengelola kas warga
                            </p>
                            <p className="mt-6 text-lg/8 text-gray-400">
                                {profil.nama} menyediakan berbagai fitur lengkap untuk memudahkan pengelolaan keuangan lingkungan Anda.
                            </p>
                        </div>
                        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                            <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                                {/* Feature 1 */}
                                <div className="flex flex-col">
                                    <div
                                        className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg text-white"
                                        style={{ backgroundColor: themeColor }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-8 w-8 text-white"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-base/7 font-semibold text-white">Transparan</h3>
                                    <p className="mt-2 text-sm/6 text-gray-400">
                                        Semua transaksi tercatat rapi dan dapat diakses warga secara transparan.
                                    </p>
                                </div>

                                {/* Feature 2 */}
                                <div className="flex flex-col">
                                    <div
                                        className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg text-white"
                                        style={{ backgroundColor: themeColor }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-8 w-8 text-white"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-base/7 font-semibold text-white">Otomatis</h3>
                                    <p className="mt-2 text-sm/6 text-gray-400">
                                        Pengingat pembayaran dan laporan keuangan dibuat secara otomatis.
                                    </p>
                                </div>

                                {/* Feature 3 */}
                                <div className="flex flex-col">
                                    <div
                                        className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg text-white"
                                        style={{ backgroundColor: themeColor }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-8 w-8 text-white"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-base/7 font-semibold text-white">Aman</h3>
                                    <p className="mt-2 text-sm/6 text-gray-400">
                                        Data keuangan terlindungi dengan sistem keamanan modern dan terenkripsi.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Testimonial Section */}
                <section id="testimoni" className="py-24 sm:py-32 bg-teal-900">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:text-center">
                            <h2 className="text-base/7 font-semibold text-white">Testimoni</h2>
                            <p className="mt-2 text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
                                Apa kata pengguna Kaswarga?
                            </p>
                        </div>
                        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                            <div className="rounded-lg bg-white/5 p-8 backdrop-blur-sm">
                                <p className="text-lg italic text-white">
                                    "Kaswarga telah membantu lingkungan kami mengelola keuangan dengan lebih transparan dan efisien.
                                    Sekarang semua warga bisa melihat laporan keuangan secara real-time tanpa harus menunggu
                                    pertemuan rutin."
                                </p>
                                <p className="mt-6 text-base font-semibold text-white">- Kepala penanggung jawab</p>
                                <p className="text-sm text-white">{profil.nama_kepala}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Profil & Kontak Section */}
                <section id="tentang" className="py-24 sm:py-32 bg-gray-900">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:text-center mb-16">
                            <h2 className="text-base/7 font-semibold" style={{ color: themeColor }}>Profil & Kontak</h2>
                            <p className="mt-2 text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
                                Tentang {profil.nama}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Informasi Profil */}
                            <div className="space-y-8">
                                {/* Foto Kepala */}
                                <div className="flex flex-col items-center lg:items-start">
                                    <div className="w-48 h-48 rounded-full overflow-hidden border-4 mb-4" style={{ borderColor: themeColor }}>
                                        <img
                                            src={`/storage/assets/${profil.foto_kepala}`}
                                            alt={`Foto ${profil.nama_kepala}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white text-center lg:text-left">{profil.nama_kepala}</h3>
                                    <p className="text-gray-400 text-center lg:text-left">Kepala Penanggung Jawab</p>
                                </div>

                                {/* Informasi Organisasi */}
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-lg font-semibold text-white mb-3">Deskripsi Organisasi</h4>
                                        <p className="text-gray-300 leading-relaxed">
                                            {profil.deskripsi}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-semibold text-white mb-3">Visi & Misi</h4>
                                        <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                                            {profil.visi_misi}
                                        </p>
                                    </div>

                                    {/* Detail Informasi */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="bg-white/5 rounded-lg p-4">
                                            <div className="text-sm text-gray-400">Tahun Berdiri</div>
                                            <div className="text-white font-semibold">{profil.tahun_berdiri}</div>
                                        </div>
                                        <div className="bg-white/5 rounded-lg p-4">
                                            <div className="text-sm text-gray-400">Status</div>
                                            <div className="text-white font-semibold">Aktif</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Media Sosial */}
                                {(profil.instagram || profil.facebook || profil.youtube) && (
                                    <div>
                                        <h4 className="text-lg font-semibold text-white mb-4">Media Sosial</h4>
                                        <div className="flex gap-4">
                                            {profil.instagram && (
                                                <a
                                                    href={profil.instagram}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                                                    style={{ color: themeColor }}
                                                >
                                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                                    </svg>
                                                </a>
                                            )}
                                            {profil.facebook && (
                                                <a
                                                    href={profil.facebook}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                                                    style={{ color: themeColor }}
                                                >
                                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                                    </svg>
                                                </a>
                                            )}
                                            {profil.youtube && (
                                                <a
                                                    href={profil.youtube}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                                                    style={{ color: themeColor }}
                                                >
                                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                                    </svg>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Google Maps & Alamat */}
                            <div className="space-y-8">
                                {/* Google Maps */}
                                {profil.gmap && (
                                    <div>
                                        <h4 className="text-lg font-semibold text-white mb-4">Lokasi Kami</h4>
                                        <div className="rounded-lg overflow-hidden shadow-lg">
                                            <iframe
                                                src={profil.gmap}
                                                width="100%"
                                                height="300"
                                                style={{ border: 0 }}
                                                allowFullScreen
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                                title="Lokasi Organisasi"
                                            ></iframe>
                                        </div>
                                    </div>
                                )}

                                {/* Alamat */}
                                <div>
                                    <h4 className="text-lg font-semibold text-white mb-4">Alamat Lengkap</h4>
                                    <div className="bg-white/5 rounded-lg p-6">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1" style={{ color: themeColor }}>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <p className="text-gray-300 leading-relaxed">
                                                {profil.alamat}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Informasi Kontak */}
                                <div>
                                    <h4 className="text-lg font-semibold text-white mb-4">Informasi Kontak</h4>
                                    <div className="grid grid-cols-1 gap-3">
                                        <div className="flex items-center gap-3 text-gray-300">
                                            <div style={{ color: themeColor }}>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                            </div>
                                            <span>Hubungi pengurus untuk informasi kontak</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-300">
                                            <div style={{ color: themeColor }}>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <span>Email tersedia untuk anggota terdaftar</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 sm:py-32 bg-gray-900">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
                                Siap mengelola keuangan warga dengan lebih baik?
                            </h2>
                            <p className="mx-auto mt-6 max-w-xl text-lg/8 text-gray-400">
                                Bergabung dengan ratusan lingkungan yang telah mempercayakan pengelolaan keuangan mereka kepada Kaswarga.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <Link
                                    href={login()}
                                    className="rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors duration-200"
                                    style={{
                                        backgroundColor: themeColor,
                                        focusVisible: { outlineColor: themeColor }
                                    }}
                                >
                                    Login
                                </Link>
                                <Link
                                    href="#tentang"
                                    className="text-sm/6 font-semibold text-white hover:opacity-80 transition-colors duration-200"
                                    style={{ color: themeColor }}
                                >
                                    Pelajari lebih lanjut <span aria-hidden="true">→</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 py-12 border-t border-white/10">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="flex flex-col items-center justify-center">
                            <div className="flex items-center justify-center mb-6">
                                <div
                                    className="flex h-10 w-10 items-center justify-center rounded-full text-white mr-3"
                                    style={{ backgroundColor: themeColor }}
                                >
                                    <span className="text-xl font-bold">K</span>
                                </div>
                                <span className="text-2xl font-bold text-white -ms-2">aswarga</span>
                            </div>
                            <p className="text-center text-sm text-gray-400">
                                © {new Date().getFullYear()} Kaswarga. All rights reserved. Developed by Sajidan & Dhiya
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
