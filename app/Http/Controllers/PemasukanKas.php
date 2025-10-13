<?php

namespace App\Http\Controllers;

use App\Models\Pemasukan;
use App\Models\ProfilWebsite;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PemasukanKas extends Controller
{
    //
   public function pemasukanView()
    {
        $pemasukan['pemasukan'] = Pemasukan::orderBy('tanggal', 'desc')->get();
        $pemasukan['profil'] = ProfilWebsite::all()->first();
        return Inertia::render('Admin/Kas/Pemasukan', $pemasukan);
    }


    public function pemasukanTambah(Request $request)
    {
        $request->validate([
            'sumber' => 'required|string|max:255',
            'keterangan' => 'required|string|max:255',
            'nominal' => 'required|numeric|min:0',
            'tanggal' => 'required|date',
        ]);
        Pemasukan::create([
            'sumber' => $request->sumber,
            'keterangan' => $request->keterangan,
            'nominal' => $request->nominal,
            'tanggal' => $request->tanggal,
        ]);
        return redirect()->route('laporanKasView')->with('success', 'Pemasukan kas berhasil ditambahkan.');
    }

}
