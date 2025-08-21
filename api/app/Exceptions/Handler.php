<?php

namespace App\Exceptions;

use App\Utilities\ResponseUtils;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Validation\ValidationException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }
    public function render($request, Throwable $exception)
    {
        if ($exception instanceof ValidationException) {
            return $exception->response;
        }

        if (
            $exception instanceof NotFoundRequestException ||
            $exception instanceof DatabaseErrorException ||
            $exception instanceof PolicyException ||
            $exception instanceof BadRequestException ||
            $exception instanceof UpdateResourceException ||
            $exception instanceof NotUploadException
        ) {
            return ResponseUtils::error($exception->getErrors(), $exception->errorCode());
        }

        if ($exception instanceof AuthenticationException) {
            return response()->json(['error' => $exception->getMessage()], 401);
        }
        if ($exception instanceof UpdateEmailUserException) {
            return ResponseUtils::error($exception->getErrors(), 403);
        }

        return $this->PHPError($exception);
    }


    private function PHPError($exception)
    {
        $request = request();

        $msg = [
            'method' => $request->method(),
            'url' => url()->full(),
            'request' => $request->input(),
            'error' => $exception->getMessage() . $exception->getLine() . PHP_EOL . $exception->getTraceAsString()
        ];

        logs('error')->error(var_export($msg, true));

        return ResponseUtils::internalError($msg);
    }
}
