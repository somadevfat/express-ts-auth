<?php

namespace App\Http\Controllers\Users;

use App\Exceptions\DatabaseErrorException;
use App\Http\Controllers\BaseController;
use App\Http\Controllers\Requests\Users\StoreRequest;
use App\Models\User;
use App\Utilities\ResponseUtils;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Collection;

class Store extends BaseController
{
    /**
     * Handle the incoming request.
     *
     * @param StoreRequest $request
     * @return JsonResponse
     * @throws DatabaseErrorException
     */
    public function __invoke(StoreRequest $request)
    {
        $input = new Collection($request->input());

        $entity = (new User)->fill([
            'email' => $input->get('email'),
            'password' => $input->get('password'),
        ]);

        $this->authorize('create', $entity);

        $entity->save();

        return ResponseUtils::success(User::find($entity->id));
    }
}
