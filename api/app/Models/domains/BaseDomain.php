<?php

namespace App\Models\domains;

abstract class BaseDomain
{
    public function __construct()
    {
    }

    public function toArray(): array
    {
        return get_object_vars($this);
    }

    protected function initByArray($array): void
    {
        // プロパティの設定を$request->onlyから拾えてもいいかも
    }
}