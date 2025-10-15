<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Member;
use App\Models\ProfilWebsite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Inertia\Inertia;

class MemberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $members = Member::with(['user', 'category'])->get();

        $members->each(function($member) {
            $member->encrypted_id = Crypt::encryptString($member->id);
        });
        $profil = ProfilWebsite::all()->first();

        return response()->json([
            'data' => 'List of members',
            'members' => $members
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'id_user' => 'required|exists:users,id',
            'id_category' => 'required|exists:categories,id',
        ]);

        $member = Member::create($request->all());

        return response()->json([
            'message' => 'Member successfully added.',
            'data' => $member
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $member = Member::with(['user', 'category'])->findOrFail($id);

        return response()->json([
            'message' => 'Member details',
            'data' => $member
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $member = Member::findOrFail($id);

        $request->validate([
            'id_user' => 'required|exists:users,id',
            'id_category' => 'required|exists:categories,id',
        ]);

        $member->update($request->all());

        return response()->json([
            'message' => 'Member successfully updated.',
            'data' => $member
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $member = Member::findOrFail($id);
        $member->delete();

        return response()->json([
            'message' => 'Member successfully deleted.'
        ]);
    }
}
