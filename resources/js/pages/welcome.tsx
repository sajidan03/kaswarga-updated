import { login, } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Selamat Datang di KasWarga">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-teal-50 to-cyan-50 p-6 text-gray-800 lg:justify-center lg:p-8 dark:from-gray-900 dark:to-teal-900 dark:text-white">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={login()}
                                className="inline-block rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-700"
                            >
                                Login
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="inline-block rounded-lg border border-teal-600 px-5 py-2.5 text-sm font-medium text-teal-600 transition-colors hover:bg-teal-600 hover:text-white dark:border-teal-400 dark:text-teal-400 dark:hover:bg-teal-400 dark:hover:text-gray-900"
                                >
                                    Masuk
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[335px] flex-col lg:max-w-4xl lg:flex-row">
                        <div className="flex-1 rounded-t-lg bg-white p-6 pb-12 text-[13px] leading-[20px] shadow-lg lg:rounded-l-lg lg:rounded-tr-none lg:p-12 dark:bg-gray-800">
                            <div className="mb-6 flex items-center">
                                <div className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-600 dark:bg-teal-900 dark:text-teal-300">
                                <h1 className="text-2xl font-bold">K</h1>
                                </div>
                                <h1 className="text-2xl font-bold text-teal-700 dark:text-teal-400 -ml-2">aswarga</h1>
                            </div>

                            <h2 className="mb-3 text-xl font-semibold">Kelola Keuangan Warga dengan Mudah</h2>
                            <p className="mb-6 text-gray-600 dark:text-gray-300">
                                Aplikasi manajemen kas untuk lingkungan Anda. Pantau pemasukan, pengeluaran,
                                dan laporan keuangan warga secara transparan dan efisien.
                            </p>

                            <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="flex items-start">
                                    <div className="mr-3 mt-1 text-teal-600 dark:text-teal-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-medium">Transparan</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Semua transaksi tercatat rapi dan dapat diakses warga</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="mr-3 mt-1 text-teal-600 dark:text-teal-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-medium">Otomatis</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Pengingat pembayaran dan laporan otomatis</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="mr-3 mt-1 text-teal-600 dark:text-teal-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-medium">Aman</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Data keuangan terlindungi dengan sistem keamanan modern</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="mr-3 mt-1 text-teal-600 dark:text-teal-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-medium">Mudah Digunakan</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Antarmuka intuitif untuk semua kalangan warga</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row">
                                {auth.user ? (
                                    <Link
                                        href={login()}
                                        className="flex items-center justify-center rounded-lg bg-teal-600 px-5 py-3 text-center font-medium text-white transition-colors hover:bg-teal-700"
                                    >
                                        Masuk Sekarang
                                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={login()}
                                            className="flex items-center justify-center rounded-lg bg-teal-600 px-5 py-3 text-center font-medium text-white transition-colors hover:bg-teal-700"
                                        >
                                            Mulai Sekarang
                                            <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </Link>
                                        <Link
                                            href={login()}
                                            className="flex items-center justify-center rounded-lg border border-teal-600 px-5 py-3 text-center font-medium text-teal-600 transition-colors hover:bg-teal-50 dark:border-teal-400 dark:text-teal-400 dark:hover:bg-teal-900/20"
                                        >
                                            Masuk ke Akun
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="relative overflow-hidden rounded-b-lg bg-gradient-to-br from-teal-500 to-cyan-600 p-8 text-white lg:rounded-r-lg lg:rounded-bl-none">
                            <div className="relative z-10">
                                <h3 className="mb-4 text-xl font-semibold">Mengapa Memilih KasWarga?</h3>

                                <div className="mb-6 space-y-4">
                                    <div className="flex items-start">
                                        <div className="mr-3 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <p>Pantau saldo kas lingkungan kapan saja</p>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="mr-3 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <p>Catat pemasukan dan pengeluaran dengan mudah</p>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="mr-3 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <p>Generate laporan keuangan otomatis</p>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="mr-3 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <p>Kelola iuran dan tagihan warga</p>
                                    </div>
                                </div>

                                <div className="mt-8 rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                                    <p className="text-sm italic">"KasWarga telah membantu lingkungan kami mengelola keuangan dengan lebih transparan dan efisien."</p>
                                    <p className="mt-2 text-sm font-medium">- Pak RT Sukamaju</p>
                                </div>
                            </div>

                            {/* Background decoration */}
                            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10"></div>
                            <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-white/5"></div>
                            <div className="absolute bottom-8 right-8 h-16 w-16 rounded-full bg-white/10"></div>
                        </div>
                    </main>
                </div>

                <footer className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                    <p>© {new Date().getFullYear()} KasWarga. All rights reserved. Developed by Sajidan & Dhiya</p>
                </footer>
            </div>
        </>
    );
}
