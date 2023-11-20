<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller{

    public function index() {

        // Return all users
        return User::all();

    }

    public function store(Request $request) {

        // Verify if all fields are on request
        if (!isset($request['name']) || !isset($request['lastNames']) || !isset($request['email']) || !isset($request['identification']) || !isset($request['pointsEarned'])) {
            return response()->json([
                'message' => 'All fields are required',
            ], 409);
        }

        // Verify if identificaction user exists
        if (User::where('identification', $request['identification'])->exists()) {
            return response()->json([
                'message' => 'User already exists',
            ], 409);
        }

        // Verify if identification follows the specified format
        if (!preg_match('/^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9kK]$/', $request['identification'])) {
            return response()->json([
                'message' => 'Invalid identification format',
            ], 409);
        }

        // Verify if email user exists
        if (User::where('email', $request['email'])->exists()) {
            return response()->json([
                'message' => 'Email already exists',
            ], 409);
        }

        // Verify if lastNames user has two lastNames
        if (count(explode(" ", $request['lastNames'])) < 2) {
            return response()->json([
                'message' => 'Last names must have two words',
            ], 409);
        }

        // Verify if pointsEarned is on request or is positive
        if (!isset($request['pointsEarned'])) {
            $request['pointsEarned'] = 0;
        }
        else if ($request['pointsEarned'] < 0){
            return response()->json([
                'message' => 'Points earned cannot be negative',
            ], 409);
        }

        // Create user
        User::create([
            'name' => $request['name'],
            'lastNames' => $request['lastNames'],
            'email' => $request['email'],
            'username' => $request['username'],
            'identification' => $request['identification'],
            'pointsEarned' => $request['pointsEarned'],
            'password' => bcrypt($request['password']),
        ]);

        return response()->json([
            'message' => 'User created successfully',
        ]);

    }

    public function update(Request $request, $identification) {

        // Find user by identification
        $user = User::where('identification', $identification)->first();

        // Verify if user exists
        if (!$user) {
            return response()->json([
                'message' => 'User not exists',
            ], 409);
        }

        // Verify if identification is not on request
        if ($request['identification'] != $identification) {
            return response()->json([
                'message' => 'Identification cannot be changed',
            ], 409);
        }

        $user->update($request->all());

        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user,
            $request->all()
        ]);

    }

    public function destroy($identification) {

        // Find user by identification
        $user = User::where('identification', $identification)->first();

        // Verify if user exists
        if (!$user) {
            return response()->json([
                'message' => 'User not exists',
            ], 409);
        }

        $user->delete();

        return response()->json([
            'message' => 'User deleted successfully',
        ]);

    }

    public function show($identification) {

        // Find user by identification or email
        $user = User::where('identification', $identification)->orWhere('email', $identification)->first();

        // Verify if user exists
        if (!$user) {
            return response()->json([
                'message' => 'User not exists',
            ], 409);
        }

        return $user;

    }

}
