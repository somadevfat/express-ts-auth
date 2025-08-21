<?php

namespace App\Http\Controllers\Requests;

use App\Exceptions\BadRequestException;
use App\Utilities\ResponseUtils;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Support\Collection;
use Illuminate\Validation\ValidationException;

/**
 * Class BaseFormRequest
 * @package App\Http\Requests
 */
class BaseFormRequest extends FormRequest
{

    protected $authMessage;

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [];
    }

    /**
     * エラー有無
     *
     * @return bool
     */
    public function fails()
    {
        return $this->validator->fails();
    }

    /**
     * Validatorを取得する.
     *
     * @return Validator
     */
    public function getValidator()
    {
        return $this->validator;
    }

    protected function failedAuthorization()
    {
        if (isset($this->authMessage)) throw new AuthorizationException($this->authMessage);

        throw new AuthorizationException;
    }

    /**
     * {@inheritdoc}
     */
    protected function failedValidation(Validator $validator)
    {
        $exception = new ValidationException($validator);
        $exception->response = ResponseUtils::invalidErrors($exception->errors());
        throw $exception;
    }

    /**
     * 更新削除などの際のリソースが存在するかチェックする
     *
     * @param $model
     * @param $id
     * @throws BadRequestException
     */
    protected function existsRecordById($model, $id)
    {
        $entity = $model::find($id);
        if (!isset($entity)) {//Response::HTTP_BAD_REQUEST
            $exception = new BadRequestException('', 403, ['errors' => [
                'レコードの存在しないidです。'
            ]]);

            throw $exception;
        }
    }

    /**
     * 更新削除などの際のリソースが存在するかチェックする
     *
     * @param $column
     * @throws BadRequestException
     */
    protected function notExistsColumn($namespace, $column, $msg='指定のリソースが存在する場合は、変更ができません。')
    {
        $endDate = $this->findByNameSpace($namespace)->$column;
        if (isset($endDate)) {
            throw new BadRequestException('', 403, ['errors' => [$msg]]);
        }
    }


    /**
     * IDがある(子テーブルの更新で追加ではない)リクエストに、指定されたカラムの「required」を追加する
     * 例えば下記の場合は,[0]の時は、last_nameは任意で、[1]の場合は必須
     * [{"id" : 3, "first_name" : "本多"}, {"id" : 3, "first_name" : "本多", "last_name" : "忠勝"}]
     *
     * @param $rule
     * @param Collection $input
     * @param Collection $requireKeys
     */
    protected function addRequired(&$rule, Collection $input, Collection $requireKeys)
    {
        $input->map(function ($val, $key) use(&$rule, $requireKeys) {
            if (!isset($val['id'])) {
                foreach ($requireKeys as $requireKey) {
                    $keyName = str_replace('*', $key, $requireKey);
                    $rule[$keyName] = ['required'];
                }
            }
        });
    }

}
