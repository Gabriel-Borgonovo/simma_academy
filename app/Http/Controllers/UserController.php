<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function viewUsers()
    {
        return view('admin.users.index_users');
    }

    public function getUsers(Request $request)
    {
        try {
            $search = $request->input('search');

            $query = User::with('roles');

            if ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            }

            $users = $query->paginate(10); // Tamaño de página fijo o configurable

            return response()->json([
                'success' => true,
                'data' => $users->items(),
                'current_page' => $users->currentPage(),
                'last_page' => $users->lastPage(),
                'total' => $users->total(),
                'per_page' => $users->perPage()
            ]);
        } catch (\Exception $e) {
            Log::error('Error al obtener los usuarios: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'No se pudo obtener la lista de usuarios.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
