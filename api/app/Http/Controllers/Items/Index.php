<?php

namespace App\Http\Controllers\Items;

use App\Http\Controllers\BaseController;
use App\Models\Item;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

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
        $query = (new Item)->newQuery()->searchIndex($request);

        return $this->paginate($query, $request);
    }
}
