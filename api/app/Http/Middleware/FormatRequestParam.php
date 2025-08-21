<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class FormatRequestParam {
    /**
     * Handle an incoming request.
     *
     * @param $request
     * @param Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next) {

        if ($request->method() === 'GET') {
            //必要であればホワイトリストを入れる。
            $whiteList = ['_in'];

            foreach ($request->all() as $key => $value) {
                if ($this->inCheck($key, $whiteList)) {
                    if (empty($request->get($key))) continue;
                    if (is_array($request->get($key))) continue;
                    $request->merge([$key => explode(',', $request->get($key))]);
                }
                $this->boolFormat($request, $value, $key);
            }
        }
        return $next($request);
    }

    private function inCheck($key, $whiteList) {

        foreach ($whiteList as $word) {
            if (strstr($key, $word)) return true;
        }

        return false;
    }

    private function boolFormat(&$request, $value, $key) {

        if (strstr($value, "true")) {
            $request->merge([$key => true]);
        }
        if (strstr($value, "false")) {
            $request->merge([$key => false]);
        }
    }
}