<?php

namespace App\Http\Controllers\My\User;

use App\Http\Controllers\BaseController;
use App\Utilities\ResponseUtils;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Show extends BaseController
{
    /**
     * Handle the incoming request.
     *
     * @param Request $request
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function __invoke(Request $request)
    {
        $user = Auth::user();

//        $this->authorize('viewByUser', $user);
        return ResponseUtils::success(
            $user
        );
    }
}
