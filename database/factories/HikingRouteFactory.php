<?php

namespace Database\Factories;

use App\Models\HikingRoute;
use App\Models\Mountain;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<HikingRoute>
 */
class HikingRouteFactory extends Factory
{
    public function definition(): array
    {
        return [
            'mountain_id' => Mountain::factory(),
            'name' => fake()->words(3, true),
            'description' => fake()->sentence(),
            'gpx_path' => 'routes/fake.gpx',
            'distance_km' => fake()->randomFloat(2, 2, 30),
            'duration_minutes' => fake()->numberBetween(60, 480),
            'is_published' => true,
        ];
    }

    public function unpublished(): static
    {
        return $this->state(['is_published' => false]);
    }
}
