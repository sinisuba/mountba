<?php

use App\Models\GpxTrack;
use App\Models\Mountain;
use App\Models\User;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

uses(LazilyRefreshDatabase::class);

beforeEach(function () {
    Storage::fake('local');
});

test('unauthenticated user cannot upload GPX', function () {
    $mountain = Mountain::factory()->create(['slug' => 'maglic']);

    $this->postJson('/api/v1/mountains/maglic/gpx', [
        'file' => UploadedFile::fake()->create('route.gpx', 50, 'application/gpx+xml'),
        'title' => 'Summit Route',
    ])->assertUnauthorized();
});

test('authenticated user can upload a GPX file', function () {
    $user = User::factory()->create();
    $mountain = Mountain::factory()->create(['slug' => 'maglic']);

    $this->actingAs($user)
        ->postJson('/api/v1/mountains/maglic/gpx', [
            'file' => UploadedFile::fake()->create('route.gpx', 50, 'application/gpx+xml'),
            'title' => 'Summit Route',
            'distance_km' => 12.5,
            'duration_minutes' => 360,
        ])
        ->assertSuccessful()
        ->assertJsonPath('data.is_approved', false)
        ->assertJsonPath('data.title', 'Summit Route');

    expect(GpxTrack::where('mountain_id', $mountain->id)->exists())->toBeTrue();
});

test('uploaded GPX is pending approval by default', function () {
    $user = User::factory()->create();
    $mountain = Mountain::factory()->create(['slug' => 'maglic']);

    $this->actingAs($user)
        ->postJson('/api/v1/mountains/maglic/gpx', [
            'file' => UploadedFile::fake()->create('route.gpx', 50, 'application/gpx+xml'),
            'title' => 'My Route',
        ])
        ->assertSuccessful()
        ->assertJsonPath('data.is_approved', false);
});

test('admin can approve a GPX track', function () {
    $admin = User::factory()->admin()->create();
    $user = User::factory()->create();
    $mountain = Mountain::factory()->create();
    $track = GpxTrack::factory()->create([
        'mountain_id' => $mountain->id,
        'uploaded_by' => $user->id,
        'is_approved' => false,
    ]);

    $this->actingAs($admin)
        ->patchJson("/api/v1/admin/gpx/{$track->id}/approve")
        ->assertSuccessful()
        ->assertJsonPath('data.is_approved', true);

    expect($track->fresh()->is_approved)->toBeTrue();
});
