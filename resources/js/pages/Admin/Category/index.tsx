import AppLayout from "@/layouts/app-layout"
import { Head, Link, useForm } from "@inertiajs/react"
import { BreadcrumbItem } from "@/types"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Plus } from "lucide-react"

type Category = {
  id: number
  encrypted_id: string
  name: string
  period: string
  nominal: number
  created_at?: string
  updated_at?: string
}

interface CategoryIndexProps {
  categories: Category[]
  flash?: { success?: string; error?: string }
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Kelola Kategori", href: "/admin/category" },
]

export default function CategoryIndex({ categories, flash }: CategoryIndexProps) {
  const { delete: destroy } = useForm()

  const handleDelete = (encryptedId: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus kategori ini?")) {
      destroy(`/admin/category/hapus/${encryptedId}`)
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Daftar Kategori Iuran" />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Daftar Kategori Iuran</h1>

          {/* Tombol Tambah Kategori */}
          <Link href="/admin/category/tambah">
            <Button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <Plus className="w-4 h-4" />
              Tambah Kategori
            </Button>
          </Link>
        </div>

        {/* Flash messages */}
        {flash?.success && (
          <div className="mb-6 p-3 rounded-md bg-green-100 text-green-700">
            {flash.success}
          </div>
        )}

        {flash?.error && (
          <div className="mb-6 p-3 rounded-md bg-red-100 text-red-700">
            {flash.error}
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="px-4 py-3 text-left">No</th>
                <th className="px-4 py-3 text-left">Nama Kategori</th>
                <th className="px-4 py-3 text-left">Periode Pembayaran</th>
                <th className="px-4 py-3 text-left">Nominal Pembayaran</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <tr key={category.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{category.name || 'N/A'}</td>
                    <td className="px-4 py-3 capitalize">{category.period || 'N/A'}</td>
                    <td className="px-4 py-3">
                      {category.nominal
                        ? `Rp ${new Intl.NumberFormat('id-ID').format(category.nominal)}`
                        : 'N/A'
                      }
                    </td>
                    <td className="px-4 py-3 flex items-center justify-center gap-2">
                      <Link href={`/admin/category/edit/${category.encrypted_id}`}>
                        <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 flex items-center gap-1">
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(category.encrypted_id)}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
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
