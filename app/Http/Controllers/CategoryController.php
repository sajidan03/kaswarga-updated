<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\ProfilWebsite;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Inertia\Inertia;
use Pest\Plugins\Profile;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();

        $categories->each(function($category) {
            $category->encrypted_id = Crypt::encryptString($category->id);
        });
        $profil = ProfilWebsite::all()->first();

        return Inertia::render('Admin/Category/index', [
            'categories' => $categories,
            'profil' => $profil,
        ]);
    }

    public function categoryTambahView()
    {
        $data['profil'] = ProfilWebsite::all()->first();
        return Inertia::render('Admin/Category/tambah', $data);
    }

    public function categoryTambah(Request $request)
    {
        $request->validate([
            'name'   => 'required|string|max:255',
            'period' => 'required|in:mingguan,bulanan,tahunan',
            'nominal' => 'required|integer|min:0',
            'status' => 'required|string|max:255'
        ]);

        Category::create($request->all());

        return redirect()->route('categoryView')
            ->with('success', 'Jenis iuran berhasil dibuat.');
    }

    public function categoryEditView($id)
    {
        try {
            $id = Crypt::decryptString($id);
        } catch (DecryptException $e) {
            abort(404, 'ID tidak valid');
        }

        $category = Category::findOrFail($id);

        $category->encrypted_id = Crypt::encryptString($category->id);
        $profil = ProfilWebsite::all()->first();
        return Inertia::render('Admin/Category/edit', [
            'category' => $category,
            'profil' => $profil,
        ]);
    }

    public function categoryEdit(Request $request, $id)
    {
        try {
            $id = Crypt::decryptString($id);
        } catch (DecryptException $e) {
            abort(404, 'ID tidak valid');
        }

        $request->validate([
            'name'   => 'required|string|max:255',
            'period' => 'required|in:mingguan,bulanan,tahunan',
            'nominal' => 'required|integer|min:0',
            'status' => 'required|string|max:255'
        ]);

        $category = Category::findOrFail($id);
        $category->update($request->all());

        return redirect()->route('categoryView')->with('success', 'Jenis iuran berhasil diperbarui.');
    }

    public function categoryHapus($id)
    {
        try {
            $id = Crypt::decryptString($id);
        } catch (DecryptException $e) {
            abort(404, 'ID tidak valid');
        }

        $category = Category::findOrFail($id);
        $category->delete();

        return redirect()->back()->with('success', 'Kategori berhasil dihapus');
    }
}
