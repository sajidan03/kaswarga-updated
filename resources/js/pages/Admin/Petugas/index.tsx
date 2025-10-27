import { Head, usePage, router } from "@inertiajs/react"
import AppLayout from "@/layouts/app-layout"
import { type BreadcrumbItem } from "@/types"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"

interface Officer {
  id: number
  previous_role: string
  user?: {
    name: string
    username: string
  }
}

interface PageProps {
  officers: Officer[]
  flash: {
    success?: string
  }
  [key: string]: unknownww
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Kelola Petugas", href: "/admin/petugas" },
]

export default function PetugasIndex() {
  const { officers, flash } = usePage<PageProps>().props

  const handleDelete = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus petugas ini?")) {
      router.delete(`/admin/petugas/hapus/${id}`)
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Petugas" />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Daftar Petugas</h1>

          {/* Tombol Tambah Petugas */}
          <Button
            onClick={() => router.visit("/admin/petugas/tambah")}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Plus className="h-4 w-4" />
            Tambah Petugas
          </Button>
        </div>

        {/* Flash Message */}
        {flash?.success && (
          <div className="mb-6 p-3 rounded-md bg-green-100 text-green-700">
            {flash.success}
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="px-4 py-3 text-left">No</th>
                <th className="px-4 py-3 text-left">Nama</th>
                <th className="px-4 py-3 text-left">Username</th>
                <th className="px-4 py-3 text-left">Role Sebelum</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {officers.length > 0 ? (
                officers.map((officer, index) => (
                  <tr key={officer.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{officer.user?.name ?? "-"}</td>
                    <td className="px-4 py-3">{officer.user?.username ?? "-"}</td>
                    <td className="px-4 py-3">{officer.previous_role ?? "-"}</td>
                    <td className="px-4 py-3 flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleDelete(officer.id)}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 flex items-center gap-1"
                      >
                        <Trash2 className="h-4 w-4" />
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                    Tidak ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  )
}
