<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use App\Models\RoleUser;
use Illuminate\Http\Request;

class RoleUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {
        return RoleUser::all();
    }

    public function store(Request $request) {
        // Verify if all fields are on request
        if (!isset($request['roleId']) && !isset($request['userId'])) {
            return response()->json([
                'message' => 'All fields are required',
            ], 409);
        }

        // Verify if role exists
        if (!Role::where('id', $request['roleId'])->exists()) {
            return response()->json([
                'message' => 'Role does not exist',
            ], 409);
        }

        // Verify if user exists
        if (!User::where('id', $request['userId'])->exists()) {
            return response()->json([
                'message' => 'User does not exist',
            ], 409);
        }

        // Verify if user has role
        if (RoleUser::where('roleId', $request['roleId'])->where('userId', $request['userId'])->exists()) {
            return response()->json([
                'message' => 'User already has role',
            ], 409);
        }

        // Create roleUser
        RoleUser::create([
            'roleId' => $request['roleId'],
            'userId' => $request['userId'],
        ]);

        // Return response
        return response()->json([
            'message' => 'RoleUser created successfully',
        ], 201);
    }

    public function update(UpdateRoleUserRequest $request, RoleUser $roleUser) {
        //
    }

}
