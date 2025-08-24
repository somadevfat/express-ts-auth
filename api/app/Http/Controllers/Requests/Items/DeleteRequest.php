<?php

namespace App\Http\Controllers\Requests\Items;


use App\Http\Controllers\Requests\BaseFormRequest;
use App\Models\Item;

/**
 * Class MemberLoginRequest
 * @package App\Http\Controllers\Requests
 */
class DeleteRequest extends BaseFormRequest
{

    public function authorize()
    {

        $this->existsRecordById((new Item()), (int)$this->route('item_id'));

        return true;
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
        ];
    }

}
