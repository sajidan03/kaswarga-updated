<?php

namespace App\Http\Controllers;

use App\Models\ProfilWebsite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProfilController extends Controller
{
    //
    public function index() {
        $data['profil'] = ProfilWebsite::all()->first();
        return Inertia::render('Admin/Profil/index', $data);
    }
     public function profilSimpan(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'nama_kepala' => 'required|string|max:255',
            'foto_kepala' => 'nullable|image|mimes:jpeg,png,jpg,gif,heic',
            'deskripsi' => 'required|string',
            'visi_misi' => 'required|string',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif',
            'hero' => 'nullable|image|mimes:jpeg,png,jpg,gif',
            'tahun_berdiri' => 'required|digits:4',
            'alamat' => 'required|string',
            'instagram' => 'nullable|url|max:255',
            'facebook' => 'nullable|url|max:255',
            'youtube' => 'nullable|url|max:255',
            'gmap' => 'nullable|url|max:500',
            'warna' => 'required|string|max:7',
        ]);

        // if ($validate->fails()) {
        //     return redirect()->back()
        //         ->withErrors($validat)
        //         ->withInput();
        // }

        $profil = ProfilWebsite::firstOrNew();

        $profil->nama = $request->nama;
        $profil->nama_kepala = $request->nama_kepala;
        $profil->deskripsi = $request->deskripsi;
        $profil->visi_misi = $request->visi_misi;
        $profil->tahun_berdiri = $request->tahun_berdiri;
        $profil->alamat = $request->alamat;
        $profil->instagram = $request->instagram;
        $profil->facebook = $request->facebook;
        $profil->youtube = $request->youtube;
        $profil->gmap = $request->gmap;
        $profil->warna = $request->warna;

        if ($request->hasFile('logo') && $request->file('logo')->isValid()) {
            if ($profil->logo && Storage::exists('assets/' . $profil->logo)) {
                Storage::delete('assets/' . $profil->logo);
            }

            $logoFile = $request->file('logo');
            $logoName = 'logo-' . time() . '.' . $logoFile->getClientOriginalExtension();
            $logoFile->storeAs('assets', $logoName);
            $profil->logo = $logoName;
        }

        if ($request->hasFile('foto_kepala') && $request->file('foto_kepala')->isValid()) {
            if ($profil->foto_kepala && Storage::exists('assets/' . $profil->foto_kepala)) {
                Storage::delete('assets/' . $profil->foto_kepala);
            }

            $fotoKepalaFile = $request->file('foto_kepala');
            $fotoKepalaName = 'foto-kepala-' . time() . '.' . $fotoKepalaFile->getClientOriginalExtension();
            $fotoKepalaFile->storeAs('assets', $fotoKepalaName);
            $profil->foto_kepala = $fotoKepalaName;
        }

        if ($request->hasFile('hero') && $request->file('hero')->isValid()) {
            if ($profil->hero && Storage::exists('assets/' . $profil->hero)) {
                Storage::delete('assets/' . $profil->hero);
            }

            $heroFile = $request->file('hero');
            $heroName = 'hero-' . time() . '.' . $heroFile->getClientOriginalExtension();
            $heroFile->storeAs('assets', $heroName);
            $profil->hero = $heroName;
        }

        $profil->save();

        return redirect()->back()->with('success', 'Profil website berhasil disimpan!');
    }
}
