<?php

namespace App\Models;

use App\Models\domains\Users\Credential;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Http\Request;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Auth\Authenticatable;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Auth\MustVerifyEmail;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;

class User extends BaseModel implements
    AuthenticatableContract,
    AuthorizableContract,
    CanResetPasswordContract
{
    use Authenticatable, Authorizable, CanResetPassword, MustVerifyEmail;
    use HasFactory, Notifiable, HasApiTokens;

    protected $fillable = [
        'email',
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'emailReissueToken',
    ];

    protected $searches = [
        'email' => 'like',
        'social' => 'in',
    ];

    protected $casts = [
        'is_admin' => 'boolean',
    ];

    public function scopeSearchIndex(Builder $query, Request $request): Builder
    {
        $query->searchByDefined($request);
        $query->orderBy('created_at', 'desc');
        return $query;
    }

    public static function create(Credential $credential) {

        $entity = (new User)->fill([
            'email' => $credential->getEmail(),
            'password' => Hash::make($credential->getPassword()),
        ]);
        $entity->save();
    }

    public function updatePassword($password) {

        $this->password = Hash::make($password);
        $this->save();
    }

    public static function findByEmail($email){
        return self::query()->where('email', $email)->first();
    }

    public static function findByEmailReissueToken($emailReissueToken){
        return self::query()->where('email_reissue_token', $emailReissueToken)->first();
    }
}
