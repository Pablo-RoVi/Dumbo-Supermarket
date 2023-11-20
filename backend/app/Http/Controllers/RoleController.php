<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{

    public function index() {
        // Return all roles
        return Role::all();
    }

    public function store(Request $request){

        // Verify if all fields are on request
        if (!isset($request['name']) || !isset($request['description'])) {
            return response()->json([
                'message' => 'All fields are required',
            ], 409);
        }

        // Verify if role exists
        if (Role::where('name', $request['name'])->exists()) {
            return response()->json([
                'message' => 'Role already exists',
            ], 409);
        }

        // Create role
        Role::create([
            'name' => $request['name'],
            'description' => $request['description'],
        ]);

        // Return response
        return response()->json([
            'message' => 'Role created successfully',
        ], 201);

    }

    public function update(Request $request, $id){

        // Verify if all fields are on request
        if (!isset($request['name']) || !isset($request['description'])) {
            return response()->json([
                'message' => 'All fields are required',
            ], 409);
        }

        $role = Role::where('id', $id)->first();

        // Verify if role exists
        if (!$role) {
            return response()->json([
                'message' => 'Role does not exists',
            ], 409);
        }

        // Verify if role exists
        if (Role::where('name', $request['name'])->where('id', '!=', $id)->exists()) {
            return response()->json([
                'message' => 'Role already exists',
            ], 409);
        }

        // Update role
        $role->update($request->all());

        // Return response
        return response()->json([
            'message' => 'Role updated successfully',
        ], 201);

    }

}
