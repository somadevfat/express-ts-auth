<?php

namespace App\Enums;

use Illuminate\Support\Collection;

trait EnumTrait
{
    public static function toArray(): array {
        return (new Collection(self::cases()))->map(function ($row) {
            return $row->value;
        })->toArray();
    }
}