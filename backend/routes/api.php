<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', [\App\Http\Controllers\auth\LoginController::class, 'login']);

Route::get('users', [\App\Http\Controllers\UserController::class, 'index']);

Route::post('users', [\App\Http\Controllers\UserController::class, 'store']);

Route::put('users/{identification}', [\App\Http\Controllers\UserController::class, 'update']);

Route::delete('users/{identification}', [\App\Http\Controllers\UserController::class, 'destroy']);
