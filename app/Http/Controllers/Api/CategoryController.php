<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\ProfilWebsite;
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
