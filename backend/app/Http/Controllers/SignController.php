<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class SignController extends Controller
{
    public function signup(Request $request) {
        // $email = $request->all();
        return response()->json([]);
    }

    public function login(Request $request) {

    }
}
