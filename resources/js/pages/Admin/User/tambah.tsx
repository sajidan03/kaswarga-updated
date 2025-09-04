import { Input } from '@/components/ui/input'
import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, Link, useForm } from '@inertiajs/react'
import { Label } from '@radix-ui/react-label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Kelola user', href: '/user' },
  { title: 'Tambah User', href: '/user/create' },
]

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    role: 'user',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/user')
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Tambah User" />

      <div className="p-6 flex justify-center">
        <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-3xl">
          <h1 className="text-2xl font-bold mb-6">Tambah User</h1>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Nama */}
            <div>
              <Label>Nama</Label>
              <Input
                type="text"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
              />
              {errors.name && <div className="text-red-600 text-sm">{errors.name}</div>}
            </div>

            {/* Email */}
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
              />
              {errors.email && <div className="text-red-600 text-sm">{errors.email}</div>}
            </div>

            {/* Password */}
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
              />
              {errors.password && (
                <div className="text-red-600 text-sm">{errors.password}</div>
              )}
            </div>

            {/* Role */}
            <div>
               <label className="block text-sm font-medium text-gray-700">Role</label>
  <Select
    value={data.role}
    onValueChange={(value) => setData("role", value)}
  >
    <SelectTrigger className="mt-1 w-full">
      <SelectValue placeholder="Pilih role" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="warga">Warga</SelectItem>
      <SelectItem value="admin">Admin</SelectItem>
      <SelectItem value="petugas">Petugas</SelectItem>
    </SelectContent>
  </Select>
  {errors.role && <div className="text-red-600 text-sm">{errors.role}</div>}
            </div>

            {/* Tombol */}
            <div className="col-span-1 md:col-span-2 flex justify-between items-center mt-4">
              <Link
                href="userTambah"
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Kembali
              </Link>
              <button
                type="submit"
                disabled={processing}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {processing ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  )
}
