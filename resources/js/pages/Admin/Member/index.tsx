import AppLayout from "@/layouts/app-layout"
import { Head, Link, useForm } from "@inertiajs/react"
import { BreadcrumbItem } from "@/types"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, UserPlus } from "lucide-react"

type Member = {
  id: number
  encrypted_id: string
  user: {
    name: string
  }
  category: {
    period: string
    nominal: number
  }
}

interface MemberIndexProps {
  members: Member[]
  flash?: { success?: string }
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Kelola Anggota", href: "/admin/member" },
]

export default function MemberIndex({ members, flash }: MemberIndexProps) {
  const { delete: destroy } = useForm()

  const handleDelete = (encryptedId: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus anggota ini?")) {
      destroy(`/admin/member/hapus/${encryptedId}`)
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Daftar Anggota Iuran" />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Daftar Anggota Iuran</h1>

          {/* Tombol Tambah Anggota */}
          <Link href="/admin/member/tambah">
            <Button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <UserPlus className="w-4 h-4" />
              Tambah Anggota
            </Button>
          </Link>
        </div>

        {/* Flash message */}
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
                <th className="px-4 py-3 text-left">Nama Anggota</th>
                <th className="px-4 py-3 text-left">Periode Pembayaran</th>
                <th className="px-4 py-3 text-left">Nominal Pembayaran</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {members.length > 0 ? (
                members.map((member, index) => (
                  <tr key={member.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{member.user?.name || 'N/A'}</td>
                    <td className="px-4 py-3">{member.category?.period || 'N/A'}</td>
                    <td className="px-4 py-3">
                      {member.category?.nominal
                        ? `Rp ${new Intl.NumberFormat('id-ID').format(member.category.nominal)}`
                        : 'N/A'
                      }
                    </td>
                    <td className="px-4 py-3 flex items-center justify-center gap-2">
                      <Link href={`/admin/member/edit/${member.encrypted_id}`}>
                        <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 flex items-center gap-1">
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(member.encrypted_id)}
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
