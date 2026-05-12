<?php

use App\Models\Mountain;
use App\Models\MountainPhoto;
use App\Models\User;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

uses(LazilyRefreshDatabase::class);

beforeEach(function () {
    Storage::fake('public');
});

test('unauthenticated user cannot upload photo', function () {
    $mountain = Mountain::factory()->create(['slug' => 'vlasic']);

    $this->postJson('/api/v1/admin/mountains/vlasic/photos', [
        'photo' => UploadedFile::fake()->create('summit.jpg', 100, 'image/jpeg'),
    ])->assertUnauthorized();
});

test('non-admin user cannot upload photo', function () {
    $user = User::factory()->create();
    $mountain = Mountain::factory()->create(['slug' => 'vlasic']);

    $this->actingAs($user)
        ->postJson('/api/v1/admin/mountains/vlasic/photos', [
            'photo' => UploadedFile::fake()->create('summit.jpg', 100, 'image/jpeg'),
        ])
        ->assertForbidden();
});

test('admin can upload photo', function () {
    $admin = User::factory()->admin()->create();
    $mountain = Mountain::factory()->create(['slug' => 'vlasic']);

    $this->actingAs($admin)
        ->postJson('/api/v1/admin/mountains/vlasic/photos', [
            'photo' => UploadedFile::fake()->create('summit.jpg', 100, 'image/jpeg'),
            'caption' => 'View from the top',
        ])
        ->assertSuccessful()
        ->assertJsonPath('data.caption', 'View from the top');

    expect(MountainPhoto::where('mountain_id', $mountain->id)->exists())->toBeTrue();
});

test('admin can approve a photo', function () {
    $admin = User::factory()->admin()->create();
    $user = User::factory()->create();
    $mountain = Mountain::factory()->create();
    $photo = MountainPhoto::factory()->create([
        'mountain_id' => $mountain->id,
        'uploaded_by' => $user->id,
        'is_approved' => false,
    ]);

    $this->actingAs($admin)
        ->patchJson("/api/v1/admin/photos/{$photo->id}/approve")
        ->assertSuccessful()
        ->assertJsonPath('data.is_approved', true);

    expect($photo->fresh()->is_approved)->toBeTrue();
});

test('non-admin cannot approve a photo', function () {
    $user = User::factory()->create();
    $mountain = Mountain::factory()->create();
    $photo = MountainPhoto::factory()->create([
        'mountain_id' => $mountain->id,
        'uploaded_by' => $user->id,
    ]);

    $this->actingAs($user)
        ->patchJson("/api/v1/admin/photos/{$photo->id}/approve")
        ->assertForbidden();
});
