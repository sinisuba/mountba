<?php

use App\Models\Mountain;
use App\Models\Peak;
use App\Models\User;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;

uses(LazilyRefreshDatabase::class);

test('public can list peaks for a mountain', function () {
    $mountain = Mountain::factory()->create(['slug' => 'prenj']);
    Peak::factory()->create(['mountain_id' => $mountain->id, 'name' => 'Lupoglav', 'slug' => 'lupoglav', 'elevation_m' => 2101]);
    Peak::factory()->create(['mountain_id' => $mountain->id, 'name' => 'Zelena Glava', 'slug' => 'zelena-glava', 'elevation_m' => 2103]);

    $this->getJson('/api/v1/mountains/prenj/peaks')
        ->assertOk()
        ->assertJsonCount(2, 'data');
});

test('public can view a peak by slug', function () {
    $mountain = Mountain::factory()->create(['slug' => 'prenj']);
    Peak::factory()->create([
        'mountain_id' => $mountain->id,
        'name' => 'Lupoglav',
        'slug' => 'lupoglav',
        'elevation_m' => 2101,
    ]);

    $this->getJson('/api/v1/mountains/prenj/peaks/lupoglav')
        ->assertOk()
        ->assertJsonPath('data.name', 'Lupoglav')
        ->assertJsonPath('data.elevation_m', 2101)
        ->assertJsonPath('data.slug', 'lupoglav');
});

test('mountain detail includes peaks', function () {
    $mountain = Mountain::factory()->create(['slug' => 'prenj']);
    Peak::factory()->count(3)->create(['mountain_id' => $mountain->id]);

    $this->getJson('/api/v1/mountains/prenj')
        ->assertOk()
        ->assertJsonCount(3, 'data.peaks');
});

test('admin can create a peak', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    $mountain = Mountain::factory()->create(['slug' => 'prenj']);

    $this->actingAs($admin, 'sanctum')
        ->postJson('/api/v1/admin/mountains/prenj/peaks', [
            'name' => 'Lupoglav',
            'elevation_m' => 2101,
        ])
        ->assertCreated()
        ->assertJsonPath('data.name', 'Lupoglav')
        ->assertJsonPath('data.elevation_m', 2101)
        ->assertJsonPath('data.slug', 'lupoglav');

    expect(Peak::where('slug', 'lupoglav')->exists())->toBeTrue();
});

test('admin can update a peak', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    $mountain = Mountain::factory()->create(['slug' => 'prenj']);
    $peak = Peak::factory()->create(['mountain_id' => $mountain->id, 'slug' => 'lupoglav', 'elevation_m' => 2000]);

    $this->actingAs($admin, 'sanctum')
        ->putJson("/api/v1/admin/peaks/{$peak->slug}", [
            'elevation_m' => 2101,
        ])
        ->assertOk()
        ->assertJsonPath('data.elevation_m', 2101);

    expect($peak->fresh()->elevation_m)->toBe(2101);
});

test('admin can delete a peak', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    $mountain = Mountain::factory()->create();
    $peak = Peak::factory()->create(['mountain_id' => $mountain->id]);

    $this->actingAs($admin, 'sanctum')
        ->deleteJson("/api/v1/admin/peaks/{$peak->slug}")
        ->assertNoContent();

    expect(Peak::find($peak->id))->toBeNull();
});

test('non-admin cannot create a peak', function () {
    $user = User::factory()->create(['role' => 'user']);
    $mountain = Mountain::factory()->create(['slug' => 'prenj']);

    $this->actingAs($user, 'sanctum')
        ->postJson('/api/v1/admin/mountains/prenj/peaks', ['name' => 'Lupoglav'])
        ->assertForbidden();
});

test('create peak auto-generates slug from name', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    $mountain = Mountain::factory()->create(['slug' => 'prenj']);

    $this->actingAs($admin, 'sanctum')
        ->postJson('/api/v1/admin/mountains/prenj/peaks', [
            'name' => 'Zelena Glava',
        ])
        ->assertCreated()
        ->assertJsonPath('data.slug', 'zelena-glava');
});
