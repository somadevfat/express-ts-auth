<?php

namespace App\Http\Controllers\Requests\Users;

use App\Http\Controllers\Requests\BaseFormRequest;
use App\Models\User;
use Illuminate\Validation\Rule;

/**
 * Class MemberLoginRequest
 * @package App\Http\Controllers\Requests
 */
class StoreRequest extends BaseFormRequest
{
    const DEFAULT_NAME = 'ユーザ';

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            'email' => ['required', 'max:255', 'email', Rule::unique((new User)->getTable())],
            'password' => ['required', 'max:255'],
        ];
    }
}
