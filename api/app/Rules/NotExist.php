<?php


namespace App\Rules;

use Illuminate\Support\Collection;

class NotExist extends BaseRule
{
    protected $table;
    protected $columnName;
    protected $msg;
    protected $wheres;

    public function __construct($table, $columnName, string $msg=null) {
        $this->table = $table;
        $this->columnName = $columnName;
        $this->msg = $msg;
    }

    public function passes($attribute, $value)
    {

        $model = $this->getModelByTableName($this->table);
        $model = $model->where($this->columnName, $value);


        $wheres = new Collection($this->wheres);
        $wheres->map(function ($val) use (&$model) {
            $method = $val['method'];
            switch ($method){
                case 'where':
                    $model = $model->$method($val['column'], $val['operator'], $val['value']);
                    break;
                case 'whereHas':
                    $model = $model->with($val['with'])->$method($val['with'], $val['callback'])
                    ;
                    break;
                default:

                    return false;

            }
        });

        // 存在してはいけない
        return !$model->exists();

    }

    public function where($column, $value)
    {
        $this->wheres[] = [
            'method' => 'where',
            'column' => $column,
            'operator' => '=',
            'value' => $value,
        ];

        return $this;
    }

    public function whereNot($column, $value)
    {
        $this->wheres[] = [
            'method' => 'where',
            'column' => $column,
            'operator' => '!=',
            'value' => $value,
        ];

        return $this;
    }

    public function whereHas($with, $callback)
    {
        $this->wheres[] = [
            'method' => 'whereHas',
            'with' => $with,
            'callback' => $callback,
        ];

        return $this;
    }

    public function message()
    {
        if (isset($this->msg)) {
            $this->msg = str_replace('{:table}', $this->table, $this->msg);
            $this->msg = str_replace('{:column}', $this->columnName, $this->msg);

            return $this->msg;
        }

        return "{$this->table}の{$this->columnName}に指定された値を持つレコードが存在します。";

    }
}
