<?php

namespace Database\Factories;

use App\Models\Mountain;
use App\Models\MountainPhoto;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<MountainPhoto>
 */
class MountainPhotoFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'mountain_id' => Mountain::factory(),
            'file_path' => 'photos/'.fake()->uuid().'.jpg',
            'caption' => fake()->optional()->sentence(),
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
