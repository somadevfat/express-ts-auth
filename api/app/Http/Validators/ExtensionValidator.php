<?php

namespace App\Http\Validators;

use Illuminate\Validation\Validator;

class ExtensionValidator extends Validator
{

    /**
     * validateKatakana カタカナのバリデーション（ブランクを許容）
     *
     * @param string $value
     * @access public
     * @return bool
     */
    public function validateKatakana($attribute, $value, $parameters)
    {
        return (bool) preg_match('/^[ァ-ヾ 　〜ー−]+$/u', $value);
    }

    public function validatekana($attribute, $value, $parameters)
    {
        return (bool) preg_match('/^[ぁ-んー]+$/u', $value);
    }

    public function validateTel($attribute, $value, $parameters)
    {
        return (bool) preg_match("/^[0-9]{2,4}-[0-9]{2,4}-[0-9]{3,4}$/", $value);
    }

    public function validateStringNum($attribute, $value, $parameters)
    {
        return ((bool)preg_match("/^[0-9]*$/", $value) && is_string($value));
    }

}