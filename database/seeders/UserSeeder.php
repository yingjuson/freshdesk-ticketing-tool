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
        User::insert([
            [
                'first_name' => 'James',
                'last_name' => 'Juson',
                'email' => 'james@j6winc.com',
                'password' => '$2y$12$nKtRyNpLgNnVlQ9PHfazHuyIdDTyHXFinjJoXV0g9r9ZBdzXiMSem',
            ],
            [
                'first_name' => 'Christene',
                'last_name' => 'Mesias',
                'email' => 'christene@j6winc.com',
                'password' => '$2y$12$/0SvkfjrnfV/eQUVRdTdfu/IXmbQ3.y8orSkBUXHvg6badtS3CkYC',
            ],
            [
                'first_name' => 'Thynne',
                'last_name' => 'Arazza',
                'email' => 'thynne@j6winc.com',
                'password' => '$2y$12$BqtR8fNfkNCdnpR6FRcnNe7AQ/T9iefXdJZWyVmI3iTTbxZJonIHS',
            ],
            [
                'first_name' => 'April',
                'last_name' => 'Transfiguracion',
                'email' => 'april@j6winc.com',
                'password' => '$2y$12$E8ped0g4tA.BFz5CJj5fWOQ36lcM1.CHx5Aw8abnEHoImgjau7Euy',
            ],
        ]);
    }
}
