<?php

namespace App\Http\Controllers\Items;

use App\Http\Controllers\BaseController;
use App\Http\Controllers\Requests\Items\DeleteRequest;
use App\Models\Item;
use App\Utilities\ResponseUtils;
use Illuminate\Http\JsonResponse;

class Delete extends BaseController
{
    /**
     * Handle the incoming request.
     *
     * @param DeleteRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function __invoke(DeleteRequest $request, int $id)
    {
        $item = Item::find($id);
        $item->delete();

        return ResponseUtils::success();
    }
}
