<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class MemberController extends Controller
{
    //
    public function index(){
        return Inertia::render('Admin/Member/index', []);
    }
}
