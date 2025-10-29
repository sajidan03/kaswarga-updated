import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, Link, usePage, useForm } from '@inertiajs/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import {
  Download,
  Filter,
  Plus,
  Search,
  FileText,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Minus
} from "lucide-react"

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/admin' },
  { title: 'Kas', href: '/admin/kas' },
  { title: 'Laporan Kas', href: '#' },
]

interface Transaksi {
  id: number
  tanggal: string
  jenis: 'pemasukan' | 'pengeluaran'
  kategori: string
  jumlah: number
  keterangan: string
  created_at: string
}

interface PageProps {
  transaksi: {
    data: Transaksi[]
    links: any[]
  }
  total_pemasukan: number
  total_pengeluaran: number
  saldo_akhir: number
  filters: {
    bulan: string
    jenis: string
    search: string
  }
  monthOptions: Array<{ value: string; label: string }>
  [key:string] : unknown
}

export default function LaporanKas() {
  const { props } = usePage<PageProps>()
  const { data, setData, get, processing } = useForm({
    bulan: props.filters.bulan || '',
    jenis: props.filters.jenis || '',
    search: props.filters.search || '',
  })

  const handleFilter = () => {
    get('/admin/kas/laporan', {
      preserveState: true,
      preserveScroll: true,
    })
  }

  const handleReset = () => {
    setData({
      bulan: '',
      jenis: '',
      search: '',
    })
    get('/admin/kas/laporan', {
      preserveState: true,
      preserveScroll: true,
    })
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Laporan Kas" />

      <div className="w-full p-6">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Laporan Kas</h1>
          </div>
          <p className="text-gray-600">Lihat dan kelola laporan keuangan kas masyarakat</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-800 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Total Pemasukan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">
                Rp {props.total_pemasukan?.toLocaleString('id-ID') || 0}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-red-800 flex items-center gap-2">
                <TrendingDown className="w-4 h-4" />
                Total Pengeluaran
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-700">
                Rp {props.total_pengeluaran?.toLocaleString('id-ID') || 0}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-800 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Saldo Akhir
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700">
                Rp {props.saldo_akhir?.toLocaleString('id-ID') || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Section */}
        <Card className="w-full shadow-sm mb-6">
          <CardHeader className="py-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filter Laporan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bulan" className="text-sm">
                  Bulan
                </Label>
                <Select
                  value={data.bulan}
                  onValueChange={(value) => setData('bulan', value)}
                >
                  <SelectTrigger id="bulan">
                    <SelectValue placeholder="Semua Bulan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Bulan</SelectItem>
                    {props.monthOptions?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="jenis" className="text-sm">
                  Jenis Transaksi
                </Label>
                <Select
                  value={data.jenis}
                  onValueChange={(value) => setData('jenis', value)}
                >
                  <SelectTrigger id="jenis">
                    <SelectValue placeholder="Semua Jenis" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Jenis</SelectItem>
                    <SelectItem value="pemasukan">Pemasukan</SelectItem>
                    <SelectItem value="pengeluaran">Pengeluaran</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="pencarian" className="text-sm">
                  Pencarian
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="pencarian"
                    placeholder="Cari berdasarkan sumber atau keterangan..."
                    value={data.search}
                    onChange={(e) => setData('search', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2 flex items-end">
                <div className="flex gap-2">
                  <Button
                    onClick={handleFilter}
                    disabled={processing}
                    className="flex-1"
                  >
                    Terapkan Filter
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    disabled={processing}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table Section - Responsive */}
        <Card className="w-full shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Daftar Transaksi Kas</CardTitle>
                <CardDescription>
                  {props.transaksi.data?.length || 0} transaksi ditemukan
                </CardDescription>
              </div>
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <Button variant="outline" className="flex items-center gap-2 flex-1 sm:flex-none">
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Export</span>
                </Button>
                <Link href="/admin/kas/pemasukan" className="flex-1 sm:flex-none">
                  <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2 w-full">
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Pemasukan</span>
                  </Button>
                </Link>
                <Link href="/admin/kas/pengeluaran" className="flex-1 sm:flex-none">
                  <Button className="bg-red-600 hover:bg-red-700 flex items-center gap-2 w-full">
                    <Minus className="w-4 h-4" />
                    <span className="hidden sm:inline">Pengeluaran</span>
                  </Button>
                </Link>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {/* Desktop Table */}
            <div className="hidden md:block">
              <table className="min-w-full table-auto border-collapse">
                <thead className="bg-gray-100 text-gray-700 text-sm">
                  <tr>
                    <th className="px-4 py-3 text-left">Tanggal</th>
                    <th className="px-4 py-3 text-left">Jenis</th>
                    <th className="px-4 py-3 text-left">Sumber</th>
                    <th className="px-4 py-3 text-right">Jumlah</th>
                    <th className="px-4 py-3 text-left">Keterangan</th>
                    <th className="px-4 py-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  {props.transaksi.data && props.transaksi.data.length > 0 ? (
                    props.transaksi.data.map((item) => (
                      <tr key={`${item.jenis}-${item.id}`} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">
                          {new Date(item.tanggal).toLocaleDateString('id-ID', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            item.jenis === 'pemasukan'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {item.jenis === 'pemasukan' ? 'Pemasukan' : 'Pengeluaran'}
                          </span>
                        </td>
                        <td className="px-4 py-3">{item.kategori}</td>
                        <td className={`px-4 py-3 text-right font-medium ${
                          item.jenis === 'pemasukan' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {item.jenis === 'pemasukan' ? '+' : '-'} Rp {item.jumlah.toLocaleString('id-ID')}
                        </td>
                        <td className="px-4 py-3">{item.keterangan}</td>
                        <td className="px-4 py-3 text-center">
                          <Link href={item.jenis === 'pemasukan'
                            ? `/admin/kas/pemasukan/${item.id}/edit`
                            : `/admin/kas/pengeluaran/${item.id}/edit`
                          }>
                            <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
                              Edit
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                        <FileText className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                        <p>Tidak ada data transaksi yang ditemukan</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden">
              {props.transaksi.data && props.transaksi.data.length > 0 ? (
                <div className="divide-y">
                  {props.transaksi.data.map((item) => (
                    <div key={`${item.jenis}-${item.id}`} className="p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              item.jenis === 'pemasukan'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {item.jenis === 'pemasukan' ? 'Pemasukan' : 'Pengeluaran'}
                            </span>
                            <span className="text-sm text-gray-500">
                              {new Date(item.tanggal).toLocaleDateString('id-ID', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                          <h3 className="font-medium text-gray-900">{item.kategori}</h3>
                          <p className="text-sm text-gray-600 mt-1">{item.keterangan}</p>
                        </div>
                        <div className={`text-right font-medium ${
                          item.jenis === 'pemasukan' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          <div className="text-lg">
                            {item.jenis === 'pemasukan' ? '+' : '-'} Rp {item.jumlah.toLocaleString('id-ID')}
                          </div>
                          <Link href={item.jenis === 'pemasukan'
                            ? `/admin/kas/pemasukan/${item.id}/edit`
                            : `/admin/kas/pengeluaran/${item.id}/edit`
                          }>
                            <button className="mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700">
                              Edit
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>Tidak ada data transaksi yang ditemukan</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        {props.transaksi.links && props.transaksi.links.length > 3 && (
          <div className="mt-6 flex justify-center">
            <nav className="flex flex-wrap gap-1">
              {props.transaksi.links.map((link, index) => (
                <Link
                  key={index}
                  href={link.url || '#'}
                  className={`px-3 py-2 rounded-md text-sm ${
                    link.active
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              ))}
            </nav>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="p-1 bg-blue-100 rounded">
              <FileText className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-blue-800">Informasi Penting</h4>
              <p className="text-sm text-blue-700">
                Laporan kas ini menampilkan data aktual dari sistem.
                Data akan diperbarui secara otomatis ketika ada transaksi baru.
                Gunakan filter untuk melihat data berdasarkan periode tertentu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
