<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use App\Models\RoleUser;

class UserController extends Controller {

    /**
     * Display a listing of client users.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function index() {
        // Find the 'client' role
        $role = Role::where('name', 'client')->first();

        // Verify if the 'client' role exists
        if (!$role) {
            return response()->json([
                'message' => 'Role does not exist',
            ], 409);
        }

        // Find all users with the 'client' role
        $userRole = RoleUser::where('roleId', $role->id)->get();

        // Verify if client users exist
        if (!$userRole) {
            return response()->json([
                'message' => 'Users do not exist',
            ], 409);
        }

        // Retrieve users based on their IDs
        $users = User::whereIn('id', $userRole->pluck('userId'))->get();

        // Verify if users exist
        if (!$users) {
            return response()->json([
                'message' => 'Users do not exist',
            ], 409);
        }

        return $users;
    }

    /**
     * Create a new user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request) {
        // Verify if all required fields are present in the request
        if (!isset($request['name']) || !isset($request['lastNames']) || !isset($request['email']) || !isset($request['identification']) || !isset($request['pointsEarned'])) {
            return response()->json([
                'message' => 'All fields are required',
            ], 409);
        }

        // Validate that 'name' and 'lastNames' contain only letters
        if (!preg_match('/^[a-zA-Z ]+$/', $request['name']) || !preg_match('/^[a-zA-Z ]+$/', $request['lastNames'])) {
            return response()->json([
                'message' => 'Name and last names must be letters',
            ], 409);
        }

        // Validate the format of 'identification'
        if (!preg_match('/^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9kK]$/', $request['identification'])) {
            return response()->json([
                'message' => 'Invalid identification format',
            ], 409);
        }

        // Validate the format of 'email'
        if (!preg_match('/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/', $request['email'])) {
            return response()->json([
                'message' => 'Invalid email format',
            ], 409);
        }

        // Check if a user with the same identification already exists
        if (User::where('identification', $request['identification'])->exists()) {
            return response()->json([
                'message' => 'User already exists',
            ], 409);
        }

        // Check if a user with the same email already exists
        if (User::where('email', $request['email'])->exists()) {
            return response()->json([
                'message' => 'Email already exists',
            ], 409);
        }

        // Validate that 'name' has two words
        if (count(explode(" ", $request['name'])) < 2) {
            return response()->json([
                'message' => 'Name must have two words',
            ], 409);
        }

        // Validate that 'lastNames' has two words
        if (count(explode(" ", $request['lastNames'])) < 2) {
            return response()->json([
                'message' => 'Last names must have two words',
            ], 409);
        }

        // Validate 'pointsEarned' is not negative
        if (!isset($request['pointsEarned'])) {
            $request['pointsEarned'] = 0;
        } else if ($request['pointsEarned'] < 0) {
            return response()->json([
                'message' => 'Points earned cannot be negative',
            ], 409);
        }

        // Create the user
        User::create([
            'name' => $request['name'],
            'lastNames' => $request['lastNames'],
            'email' => $request['email'],
            'username' => $request['username'],
            'identification' => $request['identification'],
            'pointsEarned' => $request['pointsEarned'],
            'password' => bcrypt($request['password']),
        ]);

        // Assign the 'client' role to the user
        RoleUser::create([
            'userId' => User::where('identification', $request['identification'])->first()->id,
            'roleId' => Role::where('name', 'client')->first()->id,
        ]);

        return response()->json([
            'message' => 'User created successfully',
        ]);
    }

    /**
     * Update the specified user by identification.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $identification
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $identification) {
        // Validate the format of 'identification'
        if (!preg_match('/^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9kK]$/', $request['identification'])) {
            return response()->json([
                'message' => 'Invalid identification format',
            ], 409);
        }

        // Validate that 'name' and 'lastNames' contain only letters
        if (!preg_match('/^[a-zA-Z ]+$/', $request['name']) || !preg_match('/^[a-zA-Z ]+$/', $request['lastNames'])) {
            return response()->json([
                'message' => 'Name and last names must be letters',
            ], 409);
        }

        // Validate the format of 'email'
        if (!preg_match('/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/', $request['email'])) {
            return response()->json([
                'message' => 'Invalid email format',
            ], 409);
        }

        // Validate that 'name' has two words
        if (count(explode(" ", $request['name'])) < 2) {
            return response()->json([
                'message' => 'Name must have two words',
            ], 409);
        }

        // Validate that 'lastNames' has two words
        if (count(explode(" ", $request['lastNames'])) < 2) {
            return response()->json([
                'message' => 'Last names must have two words',
            ], 409);
        }

        // Find the user by identification
        $user = User::where('identification', $identification)->first();

        // Verify if the user exists
        if (!$user) {
            return response()->json([
                'message' => 'User does not exist',
            ], 409);
        }

        // Verify if the identification is not changed
        if ($request['identification'] != $identification) {
            return response()->json([
                'message' => 'Identification cannot be changed',
            ], 409);
        }

        // Update the user
        $user->update($request->all());

        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user,
            $request->all()
        ]);
    }

    /**
     * Remove the specified user by identification.
     *
     * @param  string  $identification
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($identification) {
        // Find the user by identification
        $user = User::where('identification', $identification)->first();

        // Verify if the user exists
        if (!$user) {
            return response()->json([
                'message' => 'User does not exist',
            ], 409);
        }

        // Find the associated RoleUser entry
        $roleUser = RoleUser::where('userId', $user->id)->first();

        // Verify if the RoleUser entry exists
        if (!$roleUser) {
            return response()->json([
                'message' => 'User does not exist',
            ], 409);
        }

        // Delete the RoleUser entry
        $roleUser->delete();

        // Delete the user
        $user->delete();

        return response()->json([
            'message' => 'User deleted successfully',
        ]);
    }
}
