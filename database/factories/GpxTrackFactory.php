<?php

namespace Database\Factories;

use App\Models\GpxTrack;
use App\Models\Mountain;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<GpxTrack>
 */
class GpxTrackFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'mountain_id' => Mountain::factory(),
            'title' => fake()->words(3, true),
            'file_path' => 'gpx/'.fake()->uuid().'.gpx',
            'distance_km' => fake()->randomFloat(2, 3, 25),
            'duration_minutes' => fake()->numberBetween(90, 480),
            'uploaded_by' => User::factory(),
            'is_approved' => false,
        ];
    }

    public function approved(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_approved' => true,
        ]);
    }
}
