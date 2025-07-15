<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function viewUsers(){
        return view('admin.users.index_users');
    }

    public function getUsers(Request $request){
        try {
            $users = User::with('roles')->paginate(10);
            return response()->json([
                'success' => true,
                'data' => $users
            ]);
        }catch(\Exception $e){

            Log::error('Error al obtener los usuarios: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'No se pudo obtener la lista de usuarios.',
                'error' => $e->getMessage(),
            ],500);
        }
    }
}
