<?php

use App\Models\Mountain;
use App\Models\User;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;

uses(LazilyRefreshDatabase::class);

test('non-admin cannot create a mountain', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->postJson('/api/v1/admin/mountains', [
            'name' => 'New Peak',
            'slug' => 'new-peak',
            'elevation_m' => 1800,
            'latitude' => 43.5,
            'longitude' => 17.8,
        ])->assertForbidden();
});

test('admin can create a mountain', function () {
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)
        ->postJson('/api/v1/admin/mountains', [
            'name' => 'Cincar',
            'slug' => 'cincar',
            'elevation_m' => 2006,
            'latitude' => 43.8167,
            'longitude' => 16.9167,
            'region' => 'Livno',
            'difficulty' => 'moderate',
        ])
        ->assertSuccessful()
        ->assertJsonPath('data.name', 'Cincar')
        ->assertJsonPath('data.slug', 'cincar');

    expect(Mountain::where('slug', 'cincar')->exists())->toBeTrue();
});

test('admin can update a mountain', function () {
    $admin = User::factory()->admin()->create();
    $mountain = Mountain::factory()->create(['slug' => 'prenj', 'elevation_m' => 2100]);

    $this->actingAs($admin)
        ->putJson('/api/v1/admin/mountains/prenj', [
            'elevation_m' => 2155,
        ])
        ->assertSuccessful()
        ->assertJsonPath('data.elevation_m', 2155);

    expect($mountain->fresh()->elevation_m)->toBe(2155);
});

test('unauthenticated request to admin route returns 401', function () {
    $this->postJson('/api/v1/admin/mountains', [])->assertUnauthorized();
});

test('admin store validates required fields', function () {
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)
        ->postJson('/api/v1/admin/mountains', [])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['name', 'slug', 'elevation_m', 'latitude', 'longitude']);
});
