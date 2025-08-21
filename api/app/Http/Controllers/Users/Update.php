<?php

namespace App\Http\Controllers\Users;

use App\Exceptions\UpdateResourceException;
use App\Http\Controllers\BaseController;
use App\Http\Controllers\Requests\Users\UpdateRequest;
use App\Models\User;
use App\Utilities\ResponseUtils;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Collection;

class Update extends BaseController
{
    /**
     * Handle the incoming request.
     *
     * @param UpdateRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function __invoke(UpdateRequest $request, int $id)
    {
        $input = new Collection($request->only(['email', 'password']));

        $user = User::find($id);

        $this->authorize('update', $user);

        $user->email = $input->get('email');
        $user->password = $input->get('password');

        $user->save();

        return ResponseUtils::success($user);
    }
}
