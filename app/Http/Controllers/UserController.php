<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    //
    public function index(){
        $data['users'] = User::all();
        return Inertia::render('Admin/User/index', $data);
    }
    public function tambahView(){
        return Inertia::render('Admin/User/tambah', []);
    }
    public function simpan(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'password' => 'required',
        'role' => 'required|in:user,admin',
    ]);

    User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => bcrypt($request->password),
        'role' => $request->role,
    ]);

    return redirect()->route('user.index')->with('success', 'User berhasil ditambahkan.');
}
}
