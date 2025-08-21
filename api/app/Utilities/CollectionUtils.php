<?php

namespace App\Utilities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class CollectionUtils
{
    public static function pickByList(Collection $list, Collection $input)
    {
        return ($list->reduce(function ($carry, $item) use ($input) {
            $carry = $carry ?? (new Collection([]));
            return $carry->put($item, $input->get($item));
        }));
    }

    public static function filterByModelFillable(Model $model, Collection $input, ?Request $request=null)
    {
        $fillable = new Collection($model->getFillable());
        return ($fillable->reduce(function ($carry, $item) use ($input, $request) {
            $carry = $carry ?? (new Collection([]));
            $row = $input->get($item);
            //NOTE: $request->has($item) をすることによってnullで上書きできる
            $nullOverride = isset($request) ? $request->has($item) : false;
            return isset($row) || $nullOverride ? $carry->put($item, $input->get($item)) : $carry;
        }));
    }
}
