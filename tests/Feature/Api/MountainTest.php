<?php

use App\Models\Mountain;
use App\Models\MountainPhoto;
use App\Models\User;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;

uses(LazilyRefreshDatabase::class);

test('mountains index returns published mountains only', function () {
    Mountain::factory()->create(['name' => 'Maglić', 'slug' => 'maglic', 'is_published' => true]);
    Mountain::factory()->create(['name' => 'Hidden Peak', 'slug' => 'hidden-peak', 'is_published' => false]);

    $response = $this->getJson('/api/v1/mountains')->assertSuccessful();

    expect($response->json('data'))->toHaveCount(1)
        ->and($response->json('data.0.name'))->toBe('Maglić');
});

test('mountains index returns correct fields', function () {
    Mountain::factory()->create(['slug' => 'test-peak']);

    $this->getJson('/api/v1/mountains')
        ->assertSuccessful()
        ->assertJsonStructure([
            'data' => [['id', 'name', 'slug', 'elevation_m', 'latitude', 'longitude', 'difficulty', 'region']],
        ]);
});

test('mountains show returns mountain detail with approved photos only', function () {
    $user = User::factory()->create();
    $mountain = Mountain::factory()->create(['slug' => 'bjelasnica']);

    MountainPhoto::factory()->create([
        'mountain_id' => $mountain->id,
        'uploaded_by' => $user->id,
        'is_approved' => true,
    ]);
    MountainPhoto::factory()->create([
        'mountain_id' => $mountain->id,
        'uploaded_by' => $user->id,
        'is_approved' => false,
    ]);

    $response = $this->getJson('/api/v1/mountains/bjelasnica')->assertSuccessful();

    expect($response->json('data.photos'))->toHaveCount(1)
        ->and($response->json('data.photos.0.is_approved'))->toBeTrue();
});

test('mountains show returns 404 for unknown slug', function () {
    $this->getJson('/api/v1/mountains/does-not-exist')->assertNotFound();
});

test('mountains show includes description', function () {
    Mountain::factory()->create(['slug' => 'prenj', 'description' => 'Wild mountain above Neretva.']);

    $this->getJson('/api/v1/mountains/prenj')
        ->assertSuccessful()
        ->assertJsonPath('data.description', 'Wild mountain above Neretva.');
});
