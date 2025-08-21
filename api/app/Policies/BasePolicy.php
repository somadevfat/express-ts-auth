<?php

namespace App\Policies;

use App\Exceptions\PolicyException;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;


class BasePolicy
{
    use HandlesAuthorization;


    protected function byAuthUser(int $userID) {
        if ($userID !== Auth::id()) {
            throw new PolicyException("", Response::HTTP_FORBIDDEN,
                [__('auth.policy.byAuthUser')]
            );
        }
        return true;
    }

    protected function adminOnly() {

        if (!Auth::user()->is_admin) {
            throw new PolicyException("", Response::HTTP_FORBIDDEN,
                ['管理者以外触れない権限です']
            );
        }
        return true;
    }
}
