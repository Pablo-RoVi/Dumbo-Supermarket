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
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function index() {
        // Retrieve all RoleUser entries and return them
        return RoleUser::all();
    }

    /**
     * Store a newly created RoleUser.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request) {
        // Verify if 'roleId' and 'userId' fields are present in the request
        if (!isset($request['roleId']) && !isset($request['userId'])) {
            return response()->json([
                'message' => 'All fields are required',
            ], 409);
        }

        // Verify if the specified role exists
        if (!Role::where('id', $request['roleId'])->exists()) {
            return response()->json([
                'message' => 'Role does not exist',
            ], 409);
        }

        // Verify if the specified user exists
        if (!User::where('id', $request['userId'])->exists()) {
            return response()->json([
                'message' => 'User does not exist',
            ], 409);
        }

        // Verify if the user already has the specified role
        if (RoleUser::where('roleId', $request['roleId'])->where('userId', $request['userId'])->exists()) {
            return response()->json([
                'message' => 'User already has the role',
            ], 409);
        }

        // Create a new RoleUser entry
        RoleUser::create([
            'roleId' => $request['roleId'],
            'userId' => $request['userId'],
        ]);

        // Return a success response
        return response()->json([
            'message' => 'RoleUser created successfully',
        ], 201);
    }

    /**
     * Update the specified RoleUser in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\RoleUser  $roleUser
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateRoleUserRequest $request, RoleUser $roleUser) {
        // Implementation for updating RoleUser entries goes here
        // (You can use UpdateRoleUserRequest for validation)
    }
}
