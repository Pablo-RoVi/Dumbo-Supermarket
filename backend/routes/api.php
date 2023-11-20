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

Route::get('users', [\App\Http\Controllers\UserController::class, 'index']);

Route::get('users/{identification}', [\App\Http\Controllers\UserController::class, 'show']);

Route::put('users/{identification}', [\App\Http\Controllers\UserController::class, 'update']);

Route::post('users', [\App\Http\Controllers\UserController::class, 'store']);

Route::delete('users/{identification}', [\App\Http\Controllers\UserController::class, 'destroy']);

Route::get('roles', [\App\Http\Controllers\RoleController::class, 'index']);

Route::post('roles', [\App\Http\Controllers\RoleController::class, 'store']);

Route::get('roleUsers', [\App\Http\Controllers\RoleUserController::class, 'index']);

Route::post('roleUsers', [\App\Http\Controllers\RoleUserController::class, 'store']);

Route::post('login', [\App\Http\Controllers\auth\LoginController::class, 'login']);
