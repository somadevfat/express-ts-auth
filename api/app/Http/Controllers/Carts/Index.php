<?php

namespace App\Http\Controllers\Carts;

use App\Http\Controllers\BaseController;
use App\Models\Cart;
use App\Models\Item;
use App\Utilities\ResponseUtils;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Index extends BaseController
{
    /**
     * Handle the incoming request.
     *
     * @param Request $request
     * @return LengthAwarePaginator
     */
    public function __invoke(Request $request)
    {
        return Cart::findByUserId(Auth::id());
    }
}
