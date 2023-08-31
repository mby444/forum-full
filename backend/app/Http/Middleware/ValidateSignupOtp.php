<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Otp;

class ValidateSignupOtp
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $otp = strip_tags($request->post("otp"));
        $emailCookie = $request->cookie("otp_email");
        $savedOtp = Otp::where("otp", $otp)->get();

        if (!count($savedOtp)) {
            return response()->json([
                "error" => "Kode OTP salah"
            ]);
        }

        return $next($request);
    }
}
