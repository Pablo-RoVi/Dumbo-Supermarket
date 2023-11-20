<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        // Verify if all fields are on request
        $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        // Get only username and password from request
        $credentials = $request->only('username', 'password');

        // Verify if credentials are correct
        if (Auth::attempt($credentials)) {
            // Authentication passed
            $user = Auth::user();
            $token = $user->createToken('authToken')->plainTextToken;

            // Return user and token
            return response()->json([
                'message' => 'Login successful',
                'user' => $user,
                'token' => $token,
            ], 200);
        }
        // If credentials are incorrect return error
        else {
            throw ValidationException::withMessages([
                'message' => 'Login failed',
            ]);
        }
    }

    public function logout()
    {
        // Delete all tokens from user
        Auth::user()->tokens()->delete();

        // Return message
        return response()->json([
            'message' => 'Logout successful',
        ], 200);
    }
}
