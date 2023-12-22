<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    /**
     * Retrieve all roles.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function index() {
        // Return all roles
        return Role::all();
    }

    /**
     * Store a new role.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request){
        // Verify if all fields are present in the request
        if (!isset($request['name']) || !isset($request['description'])) {
            return response()->json([
                'message' => 'All fields are required',
            ], 409);
        }

        // Verify if the role with the same name already exists
        if (Role::where('name', $request['name'])->exists()) {
            return response()->json([
                'message' => 'Role already exists',
            ], 409);
        }

        // Create a new role
        Role::create([
            'name' => $request['name'],
            'description' => $request['description'],
        ]);

        // Return a success response
        return response()->json([
            'message' => 'Role created successfully',
        ], 201);
    }

    /**
     * Update an existing role.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id){
        // Verify if all fields are present in the request
        if (!isset($request['name']) || !isset($request['description'])) {
            return response()->json([
                'message' => 'All fields are required',
            ], 409);
        }

        // Retrieve the role by ID
        $role = Role::where('id', $id)->first();

        // Verify if the role exists
        if (!$role) {
            return response()->json([
                'message' => 'Role does not exist',
            ], 409);
        }

        // Verify if a role with the new name already exists (excluding the current role)
        if (Role::where('name', $request['name'])->where('id', '!=', $id)->exists()) {
            return response()->json([
                'message' => 'Role already exists',
            ], 409);
        }

        // Update the role
        $role->update($request->all());

        // Return a success response
        return response()->json([
            'message' => 'Role updated successfully',
        ], 201);
    }
}
