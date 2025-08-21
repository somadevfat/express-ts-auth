<?php

namespace App\Utilities;

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;

class MigrateUtils extends Migration
{
    /**
     * Run the migrations.
     *
     * @param Blueprint $table
     * @param $isForeign
     * @return Blueprint
     */
    static public function timestamps(Blueprint $table, $isForeign=true)
    {
        $table->timestamp('created_at')->default(DB::RAW('CURRENT_TIMESTAMP'))->comment('作成日')->useCurrent();
        $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))->comment('更新日')->useCurrentOnUpdate()->nullable();
        $table->unsignedBigInteger('created_by')->comment('作成者')->nullable();
        $table->unsignedBigInteger('updated_by')->comment('更新者')->nullable();

        if ($isForeign) {
            $table->foreign('created_by')->onDelete('cascade')->onDelete('cascade')->references('id')->on('users');
            $table->foreign('updated_by')->onDelete('cascade')->onDelete('cascade')->references('id')->on('users');
        }

        return  $table;;
    }

}
