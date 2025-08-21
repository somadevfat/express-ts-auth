<?php

namespace App\Http\Controllers\Items;

use App\Http\Controllers\BaseController;
use App\Http\Controllers\Requests\Items\UpdateRequest;
use App\Models\Item;
use App\Utilities\ResponseUtils;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Collection;

class Update extends BaseController
{
    /**
     * Handle the incoming request.
     *
     * @param UpdateRequest $request
     * @param int $makerId
     * @return JsonResponse
     */
    public function __invoke(UpdateRequest $request, int $id)
    {
        $input = new Collection($request->input());
        $item = Item::find($id);
        $item->put(
            $input->get('name'),
            $input->get('price'),
            $input->get('content')
        );
        $item->save();

        return ResponseUtils::success($item);
    }
}
