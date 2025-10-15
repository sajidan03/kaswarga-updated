<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [App\Http\Controllers\Api\AuthController::class, 'login']);

Route::apiResource('/users', UserController::class);
Route::apiResource('/categories', CategoryController::class);

Route::middleware('auth:sanctum')->group(function () {
});
