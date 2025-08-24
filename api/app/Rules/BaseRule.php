<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class BaseRule implements Rule
{

    public function __construct() {}

    public function passes($attribute, $value) {}

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message() {}

}
