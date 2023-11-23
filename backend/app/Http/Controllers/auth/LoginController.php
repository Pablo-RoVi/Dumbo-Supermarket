<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\Facades\JWTAuth;

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

            // Generate token
            if ($token = JWTAuth::fromUser($user)) {
                return response()->json(['token' => $token], 200);
            }

            // Return user error
            return response()->json(['error' => 'Unauthorized'], 401);
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
