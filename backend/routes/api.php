<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SignController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post("/signup", [SignController::class, "signup"])->middleware("signup");
Route::post("/signup/otp", [SignController::class, "signupOtp"])->middleware("signup.otp");
Route::delete("/signup/otp/{otp:email}", [SignController::class, "deleteSignupOtp"]);