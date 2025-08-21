<?php

namespace App\Utilities;

use Illuminate\Contracts\Routing\ResponseFactory;
use Symfony\Component\HttpFoundation\Response;
use \Illuminate\Http\JsonResponse;
use Illuminate\Http\Response as HttpResponse;

/**
 * Class ResponseUtils
 * @package App\Utilities
 */
class ResponseUtils
{
    /**
     * 正常レスポンスに変換する.
     *
     * @param $content
     * @return JsonResponse
     */
    public static function success($content=null)
    {
        return response()->json($content);
    }

    /**
     * svg正常レスポンスに変換する.
     *
     * @param $content
     * @return HttpResponse
     */
    public static function successSvg($binary)
    {
        return response($binary)
            ->header('Content-Type', 'image/svg+xml');
    }

    /**
     * zip正常レスポンスに変換する.
     *
     * @param $zipFilePath
     * @param $zipFileName
     * @param bool $deleteFlag dl後に削除するか
     * @return ResponseFactory|HttpResponse
     */
    public static function successZip($zipFilePath, $zipFileName, $deleteFlag = true)
    {
        // 本来urlencodedはfilnemae*に入れるけど、今回はjs噛ますのでfilenameにする
        $urlencoded = urlencode($zipFileName);
        $response = response(file_get_contents($zipFilePath))
            ->header('Content-Disposition', "attachment; filename=\"$urlencoded\"")
            ->header('Content-Type', 'application/zip');
        if($deleteFlag === true){
            unlink($zipFilePath);
        }
        return $response;
    }

    /**
     * pdfファイルDL正常レスポンスに変換する.
     * @param $pdf
     * @param $pdfFileName
     * @return mixed
     */
    public static function successPdf($pdf, $pdfFileName)
    {
        $headers = [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'attachment; filename*="'.rawurlencode($pdfFileName) .'"'
        ];

        return response()->make($pdf, 200, $headers);
    }

    /**
     * XlSXファイルDL正常レスポンスに変換する.
     * @param $xlsxFilePath
     * @param $fileName
     * @param $deleteFlag
     * @return mixed
     */
    public static function successXlsx($xlsxFilePath, $fileName, $deleteFlag)
    {
        $urlencoded = urlencode($fileName);
        $response = response(file_get_contents($xlsxFilePath))
            ->header('Content-Disposition', "attachment; filename=\"$urlencoded\"")
            ->header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        if($deleteFlag === true){
            unlink($xlsxFilePath);
        }
        return $response;
    }

    /**
     * 204レスポンス
     */
    public static function noContent()
    {

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    /**
     * 400エラー
     *
     * @param $description
     * @return JsonResponse
     */
    public static function badRequest($description = "")
    {
        return response()->json($description, Response::HTTP_BAD_REQUEST);
    }

    /**
     * 403エラー
     *
     * @param $description
     * @return JsonResponse
     */
    public static function forbidden($description = "")
    {
        return self::toErrorResponse(Response::HTTP_FORBIDDEN, $description);
    }

    /**
     * 404エラー
     *
     * @param $description
     * @return JsonResponse
     */
    public static function notfound($description = "")
    {
        return self::toErrorResponse(Response::HTTP_NOT_FOUND, $description);
    }

    /**
     * 503エラー
     *
     * @param $description
     * @return JsonResponse
     */
    public static function serviceUnavailable($description = "")
    {
        return self::toErrorResponse(Response::HTTP_SERVICE_UNAVAILABLE, $description);
    }

    /**
     * 主に相関チェックなどの入力エラー
     *
     * @param $description
     * @return JsonResponse
     */
    public static function invalid($description = "")
    {
        return self::toErrorResponse(Response::HTTP_BAD_REQUEST, $description);
    }

    /**
     * 主に相関チェックなどの入力エラー
     *
     * @param $errors
     * @return JsonResponse
     */
    public static function invalidErrors($errors)
    {
        $responseBody['errors'] = $errors;
        return response()->json($responseBody, Response::HTTP_BAD_REQUEST);
    }

    public static function permissionErrors($errors, $code) {
        $responseBody['message'] = $errors;
        $responseBody['error_code'] = $code;
        return response()->json($responseBody, Response::HTTP_FORBIDDEN);

    }

    /**
     * サーバエラー
     *
     * @param $errors
     * @return JsonResponse
     */
    public static function internalError($errors)
    {
        return response()->json($errors, Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    /**
     * 認証エラー
     *
     * @param string $description
     * @return JsonResponse
     */
    public static function unauthorized($description = "")
    {
        return self::toErrorResponse(Response::HTTP_UNAUTHORIZED, $description);
    }

    /**
     * サーバー内部エラー
     *
     * @param string $description
     * @param int $code
     * @return JsonResponse
     */
    public static function error($description = "", $code = Response::HTTP_INTERNAL_SERVER_ERROR)
    {
        if(empty($code)){
            $code = Response::HTTP_INTERNAL_SERVER_ERROR;
        }
        return self::toErrorResponse($code, ['errors' => $description]);
    }

    /**
     * エラーレスポンスに変換する.
     *
     * @param $status
     * @param string $description
     * @return JsonResponse
     */
    protected static function toErrorResponse($status, $description = "")
    {
        $responseBody = $description;
        return response()->json($responseBody, $status);
    }

    /**
     * pdfファイルDL正常レスポンスに変換する.
     * @param $pdf
     * @return mixed
     */
    public static function successBase64FormattedPdf($pdf)
    {
        $headers = [
            'Content-Type' => 'application/pdf'
        ];
        return response()->make($pdf, 200, $headers);
    }

}
