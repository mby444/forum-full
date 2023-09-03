<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Support\Facades\DB;
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
        $cookie = [
            "email" => $email,
            "name" => $name,
            "password" => $password,
        ];
        $token = Crypt::encryptString(json_encode($cookie));

        Otp::updateOrCreate(["token" => $token], [
            "email" => $email,
            "otp" => $otp,
            "expire" => $expire,
        ]);

        return response()->json([
            "error" => null,
            "cookie" => $cookie,
            "token" => $token,
        ]);
    }

    public function signupOtp(Request $request) {
        // $email = strip_tags($request->post("email"));
        // $name = strip_tags($request->post("name"));
        // $password = strip_tags($request->post("password"));
        function decodeToken($token) {
            try {
                $decoded = json_decode(Crypt::decryptString($token), true);
                return $decoded;
            } catch (DecryptException $e) {
                return null;
            }
        }

        $token = $request->post("token");
        $otp = $request->post("otp");
        $decToken = decodeToken($token);

        if (!$decToken) return response()->json([
            "error" => "Token error",
        ]);

        Member::create([
            "email" => $decToken["email"],
            "name" => $decToken["name"],
            "password" => $decToken["password"],
        ]);

        Otp::where("token", $token)->where("otp", $otp)->delete();

        if (!Otp::all()->count()) {
            DB::table("otps")->truncate();
        }

        return response()->json([
            "error" => null,
        ]);
    }

    public function deleteSignupOtp(Otp $otp) {
        $otp->delete();
        return response()->json([
            "error" => null,
        ]);
    }

    public function login() {

    }
}
