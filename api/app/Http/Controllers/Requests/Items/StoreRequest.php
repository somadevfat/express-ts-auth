<?php

namespace App\Http\Controllers\Requests\Items;

use App\Http\Controllers\Requests\BaseFormRequest;

/**
 * Class MemberLoginRequest
 * @package App\Http\Controllers\Requests
 */
class StoreRequest extends BaseFormRequest
{
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            'name' => ['required', 'max:255'],
            'price' => ['required', 'integer', 'min:1'],
            'content' => ['required'],
            'base64' => ['required'],
            'extension' => ['required'],

        ];
    }
}
