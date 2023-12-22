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
    /**
     * Handle user login.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function login(Request $request)
    {
        // Verify if all required fields are present in the request
        $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        // Extract username and password from the request
        $credentials = $request->only('username', 'password');

        // Verify if the provided credentials are correct
        if (Auth::attempt($credentials)) {
            // Authentication passed
            $user = Auth::user();

            // Generate a JWT token for the authenticated user
            if ($token = JWTAuth::fromUser($user)) {
                // Return the generated token as a JSON response
                return response()->json(['token' => $token], 200);
            }

            // Return an error response in case of token generation failure
            return response()->json(['error' => 'Unauthorized'], 401);
        } else {
            // If credentials are incorrect, throw a validation exception with an error message
            throw ValidationException::withMessages([
                'message' => 'Login failed',
            ]);
        }
    }

    /**
     * Handle user logout.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        // Revoke and delete all tokens associated with the authenticated user
        Auth::user()->tokens()->delete();

        // Return a success message after successful logout
        return response()->json([
            'message' => 'Logout successful',
        ], 200);
    }
}
