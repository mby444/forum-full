<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Member;

class SignController extends Controller
{
    public function signup(Request $request) {
        $email = strtolower($request->post("email"));
        $name = strtolower($request->post("name"));
        $password = strtolower($request->post("password"));

        Member::create([
            "email" => $email,
            "name" => $name,
            "password" => $password,
        ]);

        return response()->json([
            "error" => null,
        ]);
    }

    public function login() {

    }
}
