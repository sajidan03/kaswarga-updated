<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Member;
use App\Models\Payment;
use App\Models\ProfilWebsite;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bulanIni = Carbon::now()->format('Y-m');

        $allMembers = Member::with(['user', 'category'])->get();

        $paidMemberIds = Payment::where('period', $bulanIni)->pluck('id_member')->toArray();

        $belumBayar = $allMembers->whereNotIn('id', $paidMemberIds);
        $sudahBayar = $allMembers->whereIn('id', $paidMemberIds);

        $belumBayar->each(function($member) {
            $member->encrypted_id = Crypt::encrypt($member->id_user);
        });

        $sudahBayar->each(function($member) {
            $member->encrypted_id = Crypt::encrypt($member->id_user);
        });
        $profil = ProfilWebsite::all()->first();
        return response()->json([
            'data' => 'List of payments',
            'belum_bayar' => $belumBayar->values(),
            'sudah_bayar' => $sudahBayar->values(),
            'profil' => $profil
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
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
