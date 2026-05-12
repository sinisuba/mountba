<?php

namespace Database\Factories;

use App\Models\Mountain;
use App\Models\Peak;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Peak>
 */
class PeakFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = ucwords(fake()->words(2, true));

        return [
            'mountain_id' => Mountain::factory(),
            'name' => $name,
            'slug' => Str::slug($name).'-'.fake()->unique()->numberBetween(1, 9999),
            'elevation_m' => fake()->numberBetween(1000, 2400),
            'latitude' => fake()->randomFloat(7, 43.1, 45.3),
            'longitude' => fake()->randomFloat(7, 15.7, 19.7),
            'description' => fake()->optional()->paragraph(),
        ];
    }
}
