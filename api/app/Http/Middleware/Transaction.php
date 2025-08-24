<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class Transaction {
    /**
     * Handle an incoming request.
     *
     * @param $request
     * @param Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next) {
        DB::statement('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
        DB::beginTransaction();
        $response = $next($request);
        if (Response::HTTP_OK == $response->getStatusCode()) {
            DB::commit();
            logger()->debug('commit transaction');
        } else {
            DB::rollBack();
            logger()->debug('rollback transaction');
            logs('error')->error('rollback transaction! =>' .$request->method(),
                ['url' => $request->fullUrl(),
                 'header' => var_export($request->header(),true),
                 'body' => var_export($request->all(), true)]);
        }
        return $response;
    }
}