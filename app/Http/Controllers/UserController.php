<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users['users'] = User::all()->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'password'=> $user->password,
                'role' => $user->role,
                'created_at' => $user->created_at,
                'encrypted_id' => Crypt::encrypt($user->id),
            ];
        });

        return Inertia::render('Admin/User/index', $users);
    }

    public function userEditView($id)
    {
        try {
            $id = Crypt::decrypt($id);
        } catch (DecryptException $e) {
            abort(404, 'ID tidak valid');
        }

        $user = User::findOrFail($id);

        return Inertia::render('Admin/User/edit', [
            'user' => $user
        ]);
    }

    public function tambahView()
    {
        return Inertia::render('Admin/User/tambah');
    }

    public function simpan(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
            'role' => 'required|in:warga,admin,petugas',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => $request->role,
        ]);

        return Inertia::render('Admin/User/index')->with('success', 'User berhasil ditambahkan.');
    }
}
