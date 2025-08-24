<?php

namespace App\Exceptions;


use Exception;
use Symfony\Component\HttpFoundation\Response;

class UpdateResourceException extends Exception
{

    /**
     * @var array
     */
    protected $errorCode;
    public $errors;

    /**
     * ※errorsを設定した場合はレスポンスのerrorsにそのまま設定します。
     *
     * @param string $message
     * @param int $errorCode
     * @param array $errors
     */
    public function __construct($message = "", $errorCode = Response::HTTP_INTERNAL_SERVER_ERROR, $errors=[])
    {
        parent::__construct($message);
        $this->errorCode = $errorCode;
        $this->errors = $errors;
    }

    /**
     * エラー情報を取得する
     *
     * @return array
     */
    public function getErrors()
    {
        return $this->errors;
    }

    public function errorCode()
    {
        return $this->errorCode;
    }

}
