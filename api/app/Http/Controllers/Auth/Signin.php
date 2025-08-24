<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\BaseController;
use App\Utilities\ResponseUtils;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Signin extends BaseController
{
    /**
     * Handle the incoming request.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function __invoke(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            $user->tokens()->where('name', 'api_token')->delete();
            $token = $request->user()->createToken('api_token');
            return ResponseUtils::success(['token' => $token->plainTextToken]);
        }

        return response()->json([], 401);
    }
}
