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
        $email = strip_tags($request->post("email"));
        $otp = strip_tags($request->post("otp"));
        $savedOtp = Otp::where("email", $email)->where("otp", $otp)->get();
        $errorData = $this->getErrorData($email, $savedOtp);
        $errorMessage = $errorData["error"]["otp"];
        $shouldRedirect = $errorData["shouldRedirect"];
        $isDataError = !!strlen($errorMessage);

        if ($shouldRedirect || $isDataError) return response()->json([
            "error" => [
                "otp" => $errorMessage,
            ],
            "shouldRedirect" => $shouldRedirect,
        ]);

        return $next($request);
    }

    private function getErrorData($email, $savedOtp) {
        $errorObj = ["error" => ["otp" => ""], "shouldRedirect" => false];

        if (!strlen($email)) {
            $errorObj["error"]["otp"] = "Sesi sudah kadaluwarsa";
            $errorObj["shouldRedirect"] = true;
        }
        elseif (!count($savedOtp)) {
            $errorObj["error"]["otp"] = "Kode OTP salah";
        }

        return $errorObj;
    }
}
