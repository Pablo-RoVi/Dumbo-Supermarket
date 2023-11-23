<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use App\Models\RoleUser;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        User::create([
            'name' => 'David Marcelo',
            'lastNames' => 'Céspedes Araya',
            'email' => 'david.cespedes@gmail.cl',
            'identification' => '20.897.478-k',
            'pointsEarned' => 0,
            'username' => 'Ochietto',
            'password' => 'Jaqamain3pals',
        ]);

        User::create([
            'name' => 'Pablo',
            'lastNames' => 'Robledo Villalobos',
            'email' => 'pablo@gmail.com',
            'identification' => '20.776.296-2',
            'pointsEarned' => 0,
        ]);

        User::create([
            'name' => 'Alejandro',
            'lastNames' => 'González Pérez',
            'email' => 'alejandro@gmail.com',
            'identification' => '25.123.456-7',
            'pointsEarned' => 0,
        ]);

        User::create([
            'name' => 'María',
            'lastNames' => 'Martínez Rodríguez',
            'email' => 'maria@gmail.com',
            'identification' => '18.987.654-3',
            'pointsEarned' => 0,
        ]);

        User::create([
            'name' => 'Carlos',
            'lastNames' => 'Torres Sánchez',
            'email' => 'carlos@gmail.com',
            'identification' => '12.345.678-9',
            'pointsEarned' => 0,
        ]);

        User::create([
            'name' => 'Ana',
            'lastNames' => 'López García',
            'email' => 'ana@gmail.com',
            'identification' => '30.987.654-2',
            'pointsEarned' => 0,
        ]);

        User::create([
            'name' => 'Isabella',
            'lastNames' => 'Fernández Ramírez',
            'email' => 'isabella@gmail.com',
            'identification' => '27.543.210-1',
            'pointsEarned' => 0,
        ]);

        User::create([
            'name' => 'Javier',
            'lastNames' => 'Martínez Cruz',
            'email' => 'javier@gmail.com',
            'identification' => '19.876.543-2',
            'pointsEarned' => 0,
        ]);

        User::create([
            'name' => 'Lucía',
            'lastNames' => 'Sánchez Herrera',
            'email' => 'lucia@gmail.com',
            'identification' => '14.567.890-3',
            'pointsEarned' => 0,
        ]);

        User::create([
            'name' => 'Miguel',
            'lastNames' => 'Pérez Gómez',
            'email' => 'miguel@gmail.com',
            'identification' => '31.234.567-4',
            'pointsEarned' => 0,
        ]);

        User::create([
            'name' => 'Sofía',
            'lastNames' => 'Gutiérrez Alvarado',
            'email' => 'sofia@gmail.com',
            'identification' => '22.345.678-5',
            'pointsEarned' => 0,
        ]);

        Role::create([
            'name' => 'Admin',
            'description' => 'Role of the supermarket administrator',
        ]);

        Role::create([
            'name' => 'Client',
            'description' => 'Role of the supermarket consumer',
        ]);

        RoleUser::create([
            'roleId' => 1,
            'userId' => 1,
        ]);

        RoleUser::create([
            'roleId' => 2,
            'userId' => 2,
        ]);

        RoleUser::create([
            'roleId' => 2,
            'userId' => 3,
        ]);

        RoleUser::create([
            'roleId' => 2,
            'userId' => 4,
        ]);

        RoleUser::create([
            'roleId' => 2,
            'userId' => 5,
        ]);

        RoleUser::create([
            'roleId' => 2,
            'userId' => 6,
        ]);

        RoleUser::create([
            'roleId' => 2,
            'userId' => 7,
        ]);

        RoleUser::create([
            'roleId' => 2,
            'userId' => 8,
        ]);

        RoleUser::create([
            'roleId' => 2,
            'userId' => 9,
        ]);

        RoleUser::create([
            'roleId' => 2,
            'userId' => 10,
        ]);

        RoleUser::create([
            'roleId' => 2,
            'userId' => 11,
        ]);

    }
}
