<?php

namespace App\Http\Controllers;

use App\Exports\PaymentsExport;
use App\Models\ProfilWebsite;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class PaymentController extends Controller
{
    //
        public function index(){
        $data['profil'] = ProfilWebsite::all()->first();
        return Inertia::render('Admin/Payment/index', $data);
    }

}
