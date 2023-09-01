<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Member;
use App\Models\Otp;

class SignController extends Controller
{
    public function signup(Request $request) {
        $email = strip_tags(strtolower($request->post("email")));
        $name = strip_tags(strtolower($request->post("name")));
        $password = strip_tags(strtolower($request->post("password")));
        $otp = $request->post("otp");
        $expire = $request->post("expire");

        Otp::updateOrCreate(["email" => $email], [
            "email" => $email,
            "otp" => $otp,
            "expire" => $expire,
        ]);

        return response()->json([
            "error" => null,
            "cookie" => [
                "email" => $email,
                "name" => $name,
                "password" => $password,
            ],
        ]);
    }

    public function signupOtp(Request $request) {
        return response()->json([
            "error" => null,
            "otpExpireDate" => "",
        ]);
    }

    public function login() {

    }
}
