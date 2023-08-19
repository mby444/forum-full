<?php

namespace App\Http\Controllers;

use App\Models\Message;

class MessageController extends Controller
{
    public function index()
    {
        $data = Message::find(1);
        $output = ["message" => $data ? $data->text : ""];
        return response()->json($output);
    }
}
