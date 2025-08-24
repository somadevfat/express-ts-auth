<?php

namespace App\Utilities;

use App\Enums\AdminAuthorities\AdminAuthoritiesAction;
use Illuminate\Support\Facades\Route;
use App\Models\AdminAuthority;

class AdminAuthorityUtils
{
    /**
     * 管理者権限チェック
     *
     * @param integer $action
     * @param AdminAuthoritiesAction $authority
     * @return boolean 操作権限有無
     */
    public static function checkAuthority(int $action, AdminAuthoritiesAction $authority)
    {   
        // TODO
        // アクション値関連の扱いが不透明のため一旦ゼロパディングして対象の位置を取り出してる
        $strAction = str_pad(strval($action), 4, "0", STR_PAD_LEFT);
        return substr($strAction, AdminAuthoritiesAction::getCullum($authority), 1) === '1';
    }

    /**
     * アクション名取得
     *
     * @return string アクション名
     */
    public static function getActionName()
    {
        $route = explode('\\', Route::currentRouteAction());
        $lastKey = array_key_last(explode('\\', Route::currentRouteAction()));
        return $route[$lastKey];
    }

    /**
     * コントローラー名取得
     *
     * @return string コントーローラー名
     */
    public static function getContorolerName()
    {
        $route = explode('\\', Route::currentRouteAction());
        $lastKey = array_key_last(explode('\\', Route::currentRouteAction()));
        return $route[$lastKey - 1];
    }

    /**
     * 引数のmodelに対応した権限オブジェクトに変換する
     *
     * @param AdminAuthority $authority
     * @return Object
     */
    public static function convertAction(int $action) {
        $strAction = str_pad(strval($action), 4, "0", STR_PAD_LEFT);
        $actionAry = [];
        // 配列内の文字列を1文字ずつ処理する
        for ($i = 0; $i <= 3; $i++) {
            // ループ内の処理
            $actionAry[AdminAuthoritiesAction::getAcrion($i)] = substr($strAction, $i, 1) === '1';
        }
        return $actionAry;
    }
}
