<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\ProfilWebsite;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();

        $categories->each(function($category) {
            $category->encrypted_id = Crypt::encryptString($category->id);
        });
        $profil = ProfilWebsite::all()->first();

        return response()->json([
            'categories' => $categories,
            'profil' => $profil,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'   => 'required|string|max:255',
            'period' => 'required|in:mingguan,bulanan,tahunan',
            'nominal' => 'required|integer|min:0',
            'status' => 'required|string|max:255'
        ]);

        $category = Category::create($request->all());

        return response()->json([
            'message' => 'Jenis iuran berhasil dibuat.',
            'data'=> $category
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json(['message' => 'Kategori tidak ditemukan'], 404);
        }

        return response()->json([
            "message" => "Kategori retrieved successfully",
            "data" => $category
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name'   => 'required|string|max:255',
            'period' => 'required|in:mingguan,bulanan,tahunan',
            'nominal' => 'required|integer|min:0',
            'status' => 'required|string|max:255'
        ]);

        $category = Category::findOrFail($id);
        $category->update($request->all());

        return response()->json([
            'message' => 'Kategori berhasil diperbarui.',
            'data'=> $category
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['message' => 'Kategori tidak ditemukan'], 404);
        }

        $category->delete();
        return response()->json(['message' => 'Kategori berhasil dihapus'], 200);
    }
}
