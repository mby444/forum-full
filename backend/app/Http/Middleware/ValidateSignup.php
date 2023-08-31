<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Member;

class ValidateSignup
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */

    private function countErrorMessages($errorMessages) {
        $count = 0;
        foreach ($errorMessages as $key => $value) {
            $count += strlen($value) > 0 ? 1 : 0;
        }
        return $count;
    }

    private function checkExists($column, $value) {
        $member = Member::where($column, $value)->get();
        return !!count($member);
    }

    private function getErrorMessages($email, $name)
    {
        $isEmailExists = $this->checkExists("email", $email);
        $isNameExists = $this->checkExists("name", $name);
        $emailMessage = $isEmailExists ? "Email sudah terdaftar" : "";
        $nameMessage = $isNameExists ? "Nama ini sudah terpakai, mohon gunakan nama lain" : "";
        $errorMessages = [
            "email" => $emailMessage,
            "name" => $nameMessage,
        ];
        return $errorMessages;
    }

    public function handle(Request $request, Closure $next): Response
    {
        $email = strip_tags(strtolower($request->post("email")));
        $name = strip_tags(strtolower($request->post("name")));
        $errorMessages = $this->getErrorMessages($email, $name);
        $hasError = $this->countErrorMessages($errorMessages) > 0;
        if ($hasError) {
            return response()->json([
                "error" => $errorMessages,
            ]);
        }
        return $next($request);
    }
}
