<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\BaseController;
use App\Utilities\ResponseUtils;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Signout extends BaseController
{
    /**
     * Handle the incoming request.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function __invoke(Request $request)
    {
        $user = Auth::user();
//        dd($user);
        $user->tokens()->where('name', 'api_token')->delete();
//        Auth::logout();
        return ResponseUtils::success();
    }
}
