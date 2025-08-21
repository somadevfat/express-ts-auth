<?php

namespace App\Models;

use App\Exceptions\DatabaseErrorException;
use App\Exceptions\NotUploadException;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class Item extends BaseModel
{
    use HasFactory;
    protected $searches = [
        'name' => 'like',
        'price' => 'lt|gt|lte|gte',
    ];



    protected $fillable = [
        'name',
        'price',
        'content',
    ];

    public function scopeSearchIndex(Builder $query, Request $request): Builder
    {
        $query->searchByDefined($request);
        return $query;
    }

    public static function findForShow(int $id){
        return self::find($id);
    }

    /**
     * @throws DatabaseErrorException
     * @throws NotUploadException
     */
    public static function create($name, $price, $content, $base64, $extension) {

        $entity = (new Item())->fill([
            'name' => $name,
            'price' => $price,
            'content' => $content,
        ]);

        $entity->save();

        $path = sprintf(
            'items/%d/images/%s',
            $entity->id,
            uniqid() . '.' .$extension
        );

        Storage::disk('public')->put(
            $path,
            self::base64toBin($base64)
        );

        if (!Storage::disk('public')->put(
            $path,
            self::base64toBin($base64)
        )) {
            throw new NotUploadException(null,null,'画像登録エラー');
        }

        $entity->image = $path;

        $entity->save();

        return $entity;
    }
    
    public function put($name, $price, $content) {

        $entity = $this->fill([
            'name' => $name,
            'price' => $price,
            'content' => $content,
        ]);

        $entity->save();

        return $entity;
    }

    public static function base64toBin($base64): bool|string
    {
        list(, $fileData) = explode(';', $base64);
        list(, $fileData) = explode(',', $fileData);

        return base64_decode($fileData);
    }

    public function getImageAttribute($value)
    {
        return env('APP_URL') . Storage::url($value);
    }
}
