<?php

namespace App\Http\Controllers\Carts;

use App\Http\Controllers\BaseController;
use App\Http\Controllers\Requests\Carts\UpdateRequest;
use App\Models\Cart;
use App\Models\Item;
use App\Utilities\ResponseUtils;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;

class Update extends BaseController
{
    /**
     * Handle the incoming request.
     *
     * @param UpdateRequest $request
     * @param int $makerId
     * @return JsonResponse
     */
    public function __invoke(UpdateRequest $request)
    {
        $input = new Collection($request->input());


        $item = Cart::updateByUserId(Auth::id(), $input);

        return ResponseUtils::success($item);
    }
}
