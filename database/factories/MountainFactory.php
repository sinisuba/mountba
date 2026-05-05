<?php

namespace Database\Factories;

use App\Enums\MountainDifficulty;
use App\Models\Mountain;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Mountain>
 */
class MountainFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->words(2, true);

        return [
            'name' => ucwords($name),
            'slug' => Str::slug($name).'-'.fake()->unique()->numberBetween(1, 9999),
            'elevation_m' => fake()->numberBetween(1200, 2400),
            'latitude' => fake()->randomFloat(7, 43.1, 45.3),
            'longitude' => fake()->randomFloat(7, 15.7, 19.7),
            'description' => fake()->paragraphs(2, true),
            'difficulty' => fake()->randomElement(MountainDifficulty::cases())->value,
            'region' => fake()->randomElement(['Sutjeska', 'Prenj', 'Bjelašnica', 'Vlašić', 'Zelengora']),
            'is_published' => true,
        ];
    }
}
