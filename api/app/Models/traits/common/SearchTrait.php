<?php

namespace App\Models\traits\common;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

trait SearchTrait
{
    public function like(Builder $query, Request $request, string $requestKey)
    {
        $query->when($request->get($requestKey.'_like'), function($query, $target) use ($requestKey) {
            return $query->where("{$this->table}.{$requestKey}", 'LIKE', "%".$target."%");
        });
        return $query;
    }

    public function lt(Builder $query, Request $request, string $requestKey)
    {
        return $this->comparison($query, $requestKey, $request, __FUNCTION__, '<');
    }
    public function lte(Builder $query, Request $request, string $requestKey)
    {
        return $this->comparison($query, $requestKey, $request, __FUNCTION__, '<=');
    }
    public function gt(Builder $query, Request $request, string $requestKey)
    {
        return $this->comparison($query, $requestKey, $request, __FUNCTION__, '>');
    }
    public function gte(Builder $query, Request $request, string $requestKey)
    {
        return $this->comparison($query, $requestKey, $request, __FUNCTION__, '>=');
    }
    public function eq(Builder $query, Request $request, string $requestKey)
    {
        return $this->comparison($query, $requestKey, $request, __FUNCTION__, '=');
    }
    public function ne(Builder $query, Request $request, string $requestKey)
    {
        return $this->comparison($query, $requestKey, $request, __FUNCTION__, '!=');
    }
    public function in(Builder $query, Request $request, string $requestKey)
    {
        $name = $requestKey.'_'. __FUNCTION__;
        $target = $request->input($name);
        if (!is_array($target)) {
            return $query;
        }
        return $query->when($target, function($query, $target) use ($requestKey) {
            return $query->whereIn("{$this->table}.{$requestKey}", $target);
        });
    }

    public function comparison($query, $requestKey, $request, $name, $operator)
    {
        $name = $requestKey.'_'.$name;

        return $query->when($request->get($name), function($query, $target) use ($requestKey, $operator) {
            return $query->where("{$this->table}.{$requestKey}", $operator, $target);
        });
    }
}
