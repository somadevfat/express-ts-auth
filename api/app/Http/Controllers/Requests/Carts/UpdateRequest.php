<?php

namespace App\Http\Controllers\Requests\Carts;

use App\Http\Controllers\Requests\BaseFormRequest;
use Illuminate\Contracts\Validation\Validator;

/**
 * Class MemberLoginRequest
 * @package App\Http\Controllers\Requests
 */
class UpdateRequest extends BaseFormRequest
{
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            '*.item_id' => 'required|integer|exists:items,id', // item_idが必須、整数、itemsテーブルに存在する
            '*.quantity' => 'required|integer|min:0', // quantityが必須、整数、0以上
        ];
    }

    /**
     * Configure the validator instance.
     *
     * @param  Validator  $validator
     * @return void
     */
    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $itemIds = array_column($this->all(), 'item_id');
            if (count($itemIds) !== count(array_unique($itemIds))) {
                $validator->errors()->add('item_id', 'Duplicate item_id is not allowed.');
            }
        });
    }

    public function attributes()
    {
        return [];
    }

}
