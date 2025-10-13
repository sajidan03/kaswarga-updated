<?php

namespace App\Http\Controllers;

use App\Models\ProfilWebsite;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfilController extends Controller
{
    //
    public function index() {
        $data['profil'] = ProfilWebsite::all()->first();
        return Inertia::render('Admin/Profil/index', $data);
    }
}
