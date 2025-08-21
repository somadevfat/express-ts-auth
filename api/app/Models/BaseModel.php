<?php

namespace App\Models;

use App\Exceptions\DatabaseErrorException;
use App\Models\traits\common\SearchTrait;
use App\Models\traits\common\WhereHasTrait;
use App\Utilities\CollectionUtils;
use App\Utilities\domain\RouteId;
use DateTimeInterface;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;

class BaseModel extends Model
{
    use SearchTrait;
    use WhereHasTrait;

    /**
     * @param DateTimeInterface $date
     * @return string
     *
     * TimeStampをDatetimeに変更する。
     */

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }

    /**
     * @param Builder $query
     * @param Request $request
     * @return Builder
     *
     * NOTE: SearchTraitにいてもいいのかも
     */
    public function scopeSearchByDefined(Builder $query, Request $request)
    {
        foreach ($this->searches as $key => $methodNames) {
            $methodNames = explode("|", $methodNames);
            foreach ($methodNames as $methodName) {
                if (!method_exists($this, $methodName)) continue;
                $query = $this->$methodName($query, $request, $key);
            }

        }

        return $query;
    }

    /**
     * @param array $options
     * @param bool $isBy
     * @return bool
     * @throws DatabaseErrorException
     */
    public function save(array $options = [], bool $isBy = true)
    {
        if ($isBy) {
            $this->created_by = Auth::id();
            $this->updated_by = Auth::id();
        }

        if (!parent::save($options)) {
            throw new DatabaseErrorException(trans('error.database.store'));
        }

        return true;
    }

    /**
     * @return bool|null
     * @throws DatabaseErrorException
     */
    public function delete()
    {
        if (!parent::delete()) {
            throw new DatabaseErrorException(trans('error.database.store'));
        }

        return true;
    }

    public function createEntity(Collection $input, Collection $list): Model
    {
        return $this->fill(CollectionUtils::pickByList($list, $input)->toArray());
    }


    public function insertByIdRequired(Collection $item, RouteId $routeId) {
        $item->map(function ($item) use ($routeId) {
            $clientInChargeEntity = (new $this)->fill($item);
            $clientInChargeEntity->{$routeId->getName()} = $routeId->getId();
            $clientInChargeEntity->save();
        });
    }

    public function insertRelatedByIds(Collection $item, RouteId $routeId, string $key) {
        $item->map(function ($item) use ($routeId, $key) {
            (new $this)->fill([
                $key => $item,
                $routeId->getName() => $routeId->getId()
            ])->save();
        });
    }

    public function updateColumn($target, string $targetName) {
        $this->$targetName = $target;
        $this->save();
    }

    public function enumLabel($status, $enum) {
        if (is_string($status)) {
            $status = $enum::tryFrom($status);
        }
        if (is_null($status)) return null;
        return $status->description();
    }
}
