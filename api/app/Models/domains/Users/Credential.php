<?php

namespace App\Models\domains\Users;

use App\Models\domains\BaseDomain;

class Credential extends BaseDomain
{
    public function __construct(
        protected string $email,
        protected string $password,
    ) {
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getPassword(): string
    {
        return $this->password;
    }
}