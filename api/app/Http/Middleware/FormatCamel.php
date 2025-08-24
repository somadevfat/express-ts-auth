<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Str;
use stdClass;


class FormatCamel {
    /**
     * Handle an incoming request.
     *
     * @param $request
     * @param Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next) {
        $request->replace(
            $this->format($request->input(), 'snake')
        );


        $response = $next($request);

        // FIXME: フロントからの無茶な要望により終わってる、実装
        //        JsonResponse型のデフォルト値が[]なので、JsonResponse型をの拡張かここでの急場凌ぎを迫られた。
        if (!method_exists($response, 'getData')) {
            return $response;
        }
        if (is_string($response->getData())) {
            return $response;
        }
        return $response->setData($this->format($response->getData(), 'camel'));
    }

    public function format(stdClass|array $target, $type):array {

        $tmp = [];
        foreach ($target as $key => $value) {
            $tmp[Str::$type($key)] =
                (is_array($value) || is_object($value)) ? $this->format($value, $type) : $value
            ;
        }
        return $tmp;
    }
}