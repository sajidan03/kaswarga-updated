<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PetugasController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WargaController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])
    ->prefix('admin')
    ->group(function () {
        Route::get('dashboard', function () {
            return Inertia::render('dashboard');
        })->name('dashboard');
        //
        Route::get('user', [UserController::class, 'index'])->name('userView');
        Route::get('petugas', [PetugasController::class, 'index'])->name('petugasView');
        Route::get('payment', [PaymentController::class, 'index'])->name('paymentView');
        Route::get('warga', [WargaController::class, 'index'])->name('wargaView');
        Route::get('member', [MemberController::class, 'index'])->name('memberView');
        Route::get('category', [CategoryController::class, 'index'])->name('categoryView');
        //

        //
        Route::get('user/tambah', [UserController::class, 'tambahView'])->name('userTambahView');
        Route::post('user/tambah', [UserController::class, 'simpan'])->name('userTambah');
        //
        Route::get('user/edit/{id}', [UserController::class, 'userEditView'])->name('userEditView');
        Route::post('user/edit/{id}', [UserController::class, '']);
    });


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
