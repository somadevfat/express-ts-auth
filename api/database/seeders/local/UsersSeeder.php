<?php

namespace Database\Seeders\local;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert(
            [
                [
                    'email' => 'admin@lh.sandbox',
                    'email_verified_at' => null,
                    'password' => Hash::make('pass'),//pass
                    'remember_token' => null,
                    'is_admin' => true,
                    'created_at' => Carbon::now(),
                    'created_by' => 1,
                    'updated_at' => Carbon::now(),
                    'updated_by' => 1,
                ],
                [
                    'email' => 'user@lh.sandbox',
                    'email_verified_at' => null,
                    'password' => Hash::make('pass'),//pass
                    'remember_token' => null,
                    'is_admin' => false,
                    'created_at' => Carbon::now(),
                    'created_by' => 1,
                    'updated_at' => Carbon::now(),
                    'updated_by' => 1,
                ],
            ]);
    }
}
