<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider, and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Get the authenticated user information
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// User Authentication (Login)
Route::post('login', [\App\Http\Controllers\Auth\LoginController::class, 'login']);

// CRUD Operations for Users
Route::get('users', [\App\Http\Controllers\UserController::class, 'index']);   // Get all users
Route::post('users', [\App\Http\Controllers\UserController::class, 'store']);  // Create a new user
Route::put('users/{identification}', [\App\Http\Controllers\UserController::class, 'update']); // Update user by identification
Route::delete('users/{identification}', [\App\Http\Controllers\UserController::class, 'destroy']); // Delete user by identification
