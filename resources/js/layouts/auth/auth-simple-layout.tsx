import { home } from '@/routes';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';


interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    const { profil } = usePage<{ profil: { nama: string; logo?: string } }>().props
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                      <Link href={home()} className="flex flex-col items-center gap-2 font-medium">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-600 dark:bg-teal-900 dark:text-teal-300 overflow-hidden">
                                    {profil.logo ? (
                                        <img
                                            src={`/storage/assets/${profil.logo}`}
                                            alt="Logo"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <h1 className="text-2xl font-bold">
                                            {profil.nama ? profil.nama.charAt(0) : 'K'}
                                        </h1>
                                    )}
                                </div>
                                <h1 className="text-2xl font-bold text-teal-700 dark:text-teal-400">{profil.nama.slice(1)}</h1>
                            </div>
                        </Link>

                    </div>
                    <div className="space-y-1 text-start">
                            <h1 className="text-l font-medium">{title}</h1>
                            <p className="text-start text-sm text-muted-foreground">{description}</p>
                        </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
