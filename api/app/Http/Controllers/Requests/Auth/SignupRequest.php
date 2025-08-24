<?php

namespace App\Http\Controllers\Requests\Auth;

use App\Http\Controllers\Requests\BaseFormRequest;
use App\Models\User;
use Illuminate\Validation\Rule;

/**
 * Class MemberLoginRequest
 * @package App\Http\Controllers\Requests
 */
class SignupRequest extends BaseFormRequest
{
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

    public function attributes()
    {
        return [
            'email' => __('db.users.email'),
            'password' => __('db.users.password'),
        ];
    }
}
