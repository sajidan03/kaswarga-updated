import AppLayout from "@/layouts/app-layout"
import { Head, router } from "@inertiajs/react"
import { BreadcrumbItem } from "@/types"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Users, Trash2, Search } from "lucide-react"
import { useState, useMemo } from "react"

type Warga = {
  id: number
  name: string
  address?: string | null
}

interface WargaIndexProps {
  warga: Warga[]
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Kelola Warga", href: "/admin/warga" },
]

export default function WargaIndex({ warga }: WargaIndexProps) {
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    return warga.filter(
      (w) =>
        w.name.toLowerCase().includes(search.toLowerCase()) ||
        (w.address ?? "").toLowerCase().includes(search.toLowerCase())
    )
  }, [warga, search])

  const handleDelete = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus warga ini?")) {
      router.delete(`/admin/warga/hapus/${id}`)
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Daftar Warga" />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Daftar Warga</h1>

          {/* Search */}
          <div className="flex items-center gap-2 w-80">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring focus:ring-green-200 focus:border-green-500"
              placeholder="Cari nama atau alamat..."
            />
            <Button type="button" className="bg-green-600 hover:bg-green-700">
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="px-4 py-3 text-left">No</th>
                <th className="px-4 py-3 text-left">Nama</th>
                <th className="px-4 py-3 text-left">Alamat</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {filtered.length > 0 ? (
                filtered.map((item, index) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3">{item.address ?? "-"}</td>
                    <td className="px-4 py-3 flex items-center justify-center gap-2">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                        className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                        Hapus
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
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
