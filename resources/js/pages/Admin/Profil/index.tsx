import { Head, usePage, router } from "@inertiajs/react"
import AppLayout from "@/layouts/app-layout"
import { type BreadcrumbItem } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Save, Upload, MapPin, Calendar, Link, Palette } from "lucide-react"
import { useState } from "react"
import { Textarea } from "@headlessui/react"

interface ProfilWebsite {
  id?: number
  nama: string
  nama_kepala: string
  foto_kepala: string
  deskripsi: string
  visi_misi: string
  logo: string
  hero: string
  tahun_berdiri: string
  alamat: string
  instagram: string
  facebook: string
  youtube: string
  gmap: string
  warna: string
}

interface PageProps {
  profil: ProfilWebsite
  flash: {
    success?: string
  }
  [key: string]: any
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Profil Website", href: "/admin/profil-website" },
]

export default function ProfilWebsiteEdit() {
  const { profil, flash } = usePage<PageProps>().props
  const [formData, setFormData] = useState<ProfilWebsite>(profil)
  const [previewImages, setPreviewImages] = useState({
    logo: profil.logo ? `/storage/assets/${profil.logo}` : '',
    hero: profil.hero ? `/storage/assets/${profil.hero}` : '',
    foto_kepala: profil.foto_kepala ? `/storage/assets/${profil.foto_kepala}` : ''
  })

  const handleChange = (field: keyof ProfilWebsite, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFileChange = (field: 'logo' | 'hero' | 'foto_kepala', file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewImages(prev => ({
        ...prev,
        [field]: e.target?.result as string
      }))
    }
    reader.readAsDataURL(file)

    setFormData(prev => ({
      ...prev,
      [field]: file
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const data = new FormData()
    Object.keys(formData).forEach(key => {
      const value = formData[key as keyof ProfilWebsite]
      if (value instanceof File) {
        data.append(key, value)
      } else if (value !== null && value !== undefined) {
        data.append(key, value.toString())
      }
    })

    router.post('/admin/profil', data)
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Profil Website" />

      <div className="p-6 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Profil Website</h2>
        </div>

        {flash?.success && (
          <div className="p-3 rounded-md bg-green-100 text-green-700">
            {flash.success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Informasi Dasar */}
            <Card>
              <CardHeader>
                <CardTitle>Informasi Dasar</CardTitle>
                <CardDescription>
                  Pengaturan dasar website dan organisasi
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nama">Nama Website/Organisasi</Label>
                  <Input
                    id="nama"
                    value={formData.nama}
                    onChange={(e) => handleChange('nama', e.target.value)}
                    placeholder="Contoh: Kaswarga RT 01"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nama_kepala">Nama Kepala/Ketua</Label>
                  <Input
                    id="nama_kepala"
                    value={formData.nama_kepala}
                    onChange={(e) => handleChange('nama_kepala', e.target.value)}
                    placeholder="Nama ketua RT/RW"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tahun_berdiri">Tahun Berdiri</Label>
                  <Input
                    id="tahun_berdiri"
                    type="number"
                    value={formData.tahun_berdiri}
                    onChange={(e) => handleChange('tahun_berdiri', e.target.value)}
                    placeholder="Tahun berdiri organisasi"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alamat">Alamat</Label>
                  <br />
                  <Textarea
                    id="alamat"
                    value={formData.alamat}
                    onChange={(e) => handleChange('alamat', e.target.value)}
                    placeholder="Alamat lengkap organisasi"
                    rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Media & Visual */}
            <Card>
              <CardHeader>
                <CardTitle>Media & Visual</CardTitle>
                <CardDescription>
                  Logo, gambar, dan warna tema website
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Logo */}
                <div className="space-y-2">
                  <Label>Logo Organisasi</Label>
                  <div className="flex items-center gap-4">
                    {previewImages.logo && (
                      <div className="w-16 h-16 rounded-lg border overflow-hidden">
                        <img
                          src={previewImages.logo}
                          alt="Logo Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleFileChange('logo', e.target.files[0])}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Foto Kepala */}
                <div className="space-y-2">
                  <Label>Foto Kepala/Ketua</Label>
                  <div className="flex items-center gap-4">
                    {previewImages.foto_kepala && (
                      <div className="w-16 h-16 rounded-lg border overflow-hidden">
                        <img
                          src={previewImages.foto_kepala}
                          alt="Foto Kepala Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleFileChange('foto_kepala', e.target.files[0])}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Hero Image */}
                <div className="space-y-2">
                  <Label>Gambar Hero/Halaman Depan</Label>
                  <div className="flex items-center gap-4">
                    {previewImages.hero && (
                      <div className="w-20 h-12 rounded-lg border overflow-hidden">
                        <img
                          src={previewImages.hero}
                          alt="Hero Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleFileChange('hero', e.target.files[0])}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Warna Tema */}
                <div className="space-y-2">
                  <Label htmlFor="warna" className="flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    Warna Tema
                  </Label>
                  <div className="flex items-center gap-3">
                    <Input
                      id="warna"
                      type="color"
                      value={formData.warna}
                      onChange={(e) => handleChange('warna', e.target.value)}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={formData.warna}
                      onChange={(e) => handleChange('warna', e.target.value)}
                      placeholder="#0d9488"
                      className="flex-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Deskripsi & Visi Misi */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Konten</CardTitle>
                <CardDescription>
                  Deskripsi dan visi misi organisasi
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="deskripsi">Deskripsi Organisasi</Label>
                  <br />
                  <Textarea
                    id="deskripsi"
                    value={formData.deskripsi}
                    onChange={(e) => handleChange('deskripsi', e.target.value)}
                    placeholder="Deskripsi singkat tentang organisasi..."
                    rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="visi_misi">Visi & Misi</Label>
                  <br />
                  <Textarea
                    id="visi_misi"
                    value={formData.visi_misi}
                    onChange={(e) => handleChange('visi_misi', e.target.value)}
                    placeholder="Visi dan misi organisasi..."
                    rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Media Sosial & Kontak */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Link className="h-5 w-5" />
                  Media Sosial & Kontak
                </CardTitle>
                <CardDescription>
                  Tautan media sosial dan peta lokasi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      value={formData.instagram}
                      onChange={(e) => handleChange('instagram', e.target.value)}
                      placeholder="https://instagram.com/username"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input
                      id="facebook"
                      value={formData.facebook}
                      onChange={(e) => handleChange('facebook', e.target.value)}
                      placeholder="https://facebook.com/username"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="youtube">YouTube</Label>
                    <Input
                      id="youtube"
                      value={formData.youtube}
                      onChange={(e) => handleChange('youtube', e.target.value)}
                      placeholder="https://youtube.com/channel"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gmap" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Google Maps Embed URL
                    </Label>
                    <Input
                      id="gmap"
                      value={formData.gmap}
                      onChange={(e) => handleChange('gmap', e.target.value)}
                      placeholder="https://maps.google.com/embed?q=..."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Submit Button */}
          <div className="mt-6 flex justify-end">
            <Button type="submit" className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Simpan Perubahan
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  )
}
