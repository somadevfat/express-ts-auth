<?php

namespace App\Models\traits\common;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

trait WhereHasTrait
{
    public function _whereHasEq(Builder $query, Request $request, string $columnName, string $relationName, string $literal=null): Builder
    {
        return $this->_whereHasBase($query, $request, $columnName, $relationName, $this->getRequestKey($columnName, 'eq', $literal), '=');
    }
    public function _whereHasNot(Builder $query, Request $request, string $columnName, string $relationName, string $literal=null): Builder
    {
        return $this->_whereHasBase($query, $request, $columnName, $relationName, $this->getRequestKey($columnName, 'not', $literal), '!=');
    }
    public function _whereHasLt(Builder $query, Request $request, string $columnName, string $relationName, string $literal=null): Builder
    {
        return $this->_whereHasBase($query, $request, $columnName, $relationName, $this->getRequestKey($columnName, 'lt', $literal), '<');
    }
    public function _whereHasLte(Builder $query, Request $request, string $columnName, string $relationName, string $literal=null): Builder
    {
        return $this->_whereHasBase($query, $request, $columnName, $relationName, $this->getRequestKey($columnName, 'lte', $literal), '<=');
    }
    public function _whereHasGt(Builder $query, Request $request, string $columnName, string $relationName, string $literal=null): Builder
    {
        return $this->_whereHasBase($query, $request, $columnName, $relationName, $this->getRequestKey($columnName, 'gt', $literal), '>');
    }
    public function _whereHasGte(Builder $query, Request $request, string $columnName, string $relationName, string $literal=null): Builder
    {
        return $this->_whereHasBase($query, $request, $columnName, $relationName, $this->getRequestKey($columnName, 'gte', $literal), '>=');
    }

    public function _whereHasBase(Builder $query, Request $request, string $columnName, string $relationName, string $requestKey, string $operator): Builder
    {

        return $query->when($request->get($requestKey), function($query, $target) use ($columnName, $relationName, $operator) {
            return $query->WhereHas($relationName, function ($query) use ($target, $columnName, $relationName, $operator) {
                $query->where($columnName, $operator, $target);
                return $query;
            });
        });
    }

    public function getRequestKey(string $columnName, string $type, string $literal=null): string
    {
        $explodedRequestKey = explode('.', $columnName);

        $requestKey = Str::singular($explodedRequestKey[0]);

        if (isset($literal)) {
            $requestKey = $requestKey . '_' . $literal;
        }

        $requestKey = $requestKey . '_' .$explodedRequestKey[1];
        $requestKey = $requestKey . '_' . $type;

        return $requestKey;
    }

    public function _whereHasIn(Builder $query, Request $request, string $columnName, string $relationName): Builder
    {
        // 「clients.id」を「client_id」に変換する。
        $requestKey = $this->getRequestKey($columnName, 'in');
        $target = $request->input($requestKey);

        if (!is_array($target)) return $query;

        return $query->when($target, function($query, $target) use ($columnName, $relationName) {
            return $query->WhereHas($relationName, function ($query) use ($target, $columnName, $relationName) {
                $query->whereIn($columnName, $target);
                return $query;
            });
        });
    }

    public function _whereHasEx(Builder $query, Request $request, string $relationName): Builder
    {
        // 「clients.id」を「client_id」に変換する。
        $requestKey = $relationName . '_ex';
        $target = $request->input($requestKey);

        return $query->when($target, function($query, $target) use ($relationName) {
            $query->whereHas($relationName, function ($query) {
                $query->whereExists(function ($query) {
                    return $query;
                });
            });
        });
    }
}
