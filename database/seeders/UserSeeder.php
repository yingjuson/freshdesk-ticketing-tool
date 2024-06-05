<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (User::count() > 0) {
            return;
        }

        User::insert([
            [
                'first_name' => 'James',
                'last_name' => 'Juson',
                'email' => 'james@xyzed.com',
                'password' => '$2y$12$nKtRyNpLgNnVlQ9PHfazHuyIdDTyHXFinjJoXV0g9r9ZBdzXiMSem',
            ],
        ]);
    }
}
