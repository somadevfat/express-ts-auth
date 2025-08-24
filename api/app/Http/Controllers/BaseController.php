<?php

namespace App\Http\Controllers;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;

class BaseController extends Controller
{

    const DEFAULT_PAGE_LIMIT = 20;

    public function __construct()
    {
    }

    protected function getModel($className) {}

    /**
     * @param Builder $query
     * @param Request $request
     * @return LengthAwarePaginator
     */
    protected function paginate(Builder $query, Request $request)
    {
        $page = $request->input(['limit']) ?? self::DEFAULT_PAGE_LIMIT;
        return $query->paginate($page)->appends($request->toArray());
    }

    /**
     * @param LengthAwarePaginator $paginate
     * @param $callback
     * @return mixed
     */
    protected function paginateTransform(LengthAwarePaginator $paginate, $callback)
    {
        // function($item, $key) {};
        return $paginate->getCollection()->transform($callback);
    }

    /**
     * @param Request $request
     * @param int $id
     * @param Model $model
     * @param array $adds
     * @return mixed
     */
    protected function updateByRZequest(Request $request, int $id, Model $model, array $adds=[])
    {

        $input = new Collection($request->input());
        $adds = new Collection($adds);


        $entity = $model->find($id);

        $input->map(function ($val, $key) use ($entity) {
            $entity->$key = $val;
        });

        $adds->map(function ($val, $key) use ($entity) {
            $entity->$key = $val;
        });

        $entity->save();

        return $entity;
    }
}
