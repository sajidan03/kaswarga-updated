import { usePage } from "@inertiajs/react";

export default function AppLogo() {
   const { profil } = usePage<{ profil: { nama: string; logo?: string } }>().props
    return (
        <>
            <div className="flex items-center">
            <div className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-600 dark:bg-teal-900 dark:text-teal-300 overflow-hidden">
                <img
                    src={`/storage/assets/${profil.logo}`}
                    alt="Logo"
                    className="w-full h-full object-cover"
                />
            </div>
            <h1 className="text-xl font-bold text-teal-700 dark:text-teal-400">{profil.nama.slice(1)}</h1>
        </div>
        </>
    );
}
