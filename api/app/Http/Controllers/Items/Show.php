<?php

namespace App\Http\Controllers\Items;

use App\Http\Controllers\BaseController;
use App\Models\Item;
use App\Utilities\ResponseUtils;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class Show extends BaseController
{
    /**
     * Handle the incoming request.
     *
     * @param Request $request
     * @param int $makerId
     * @return JsonResponse
     */
    public function __invoke(Request $request, int $makerId)
    {
        return ResponseUtils::success(
            Item::findForShow($makerId)
        );
    }
}
