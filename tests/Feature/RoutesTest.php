<?php

use App\Models\HikingRoute;
use App\Models\Mountain;
use App\Models\User;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

uses(LazilyRefreshDatabase::class);

beforeEach(function () {
    Storage::fake('local');
});

test('it lists only published routes with mountain name', function () {
    $mountain = Mountain::factory()->create(['name' => 'Čemernica']);
    HikingRoute::factory()->create(['mountain_id' => $mountain->id, 'name' => 'Summit Trail', 'is_published' => true]);
    HikingRoute::factory()->unpublished()->create(['mountain_id' => $mountain->id]);

    $this->getJson('/api/v1/routes')
        ->assertOk()
        ->assertJsonCount(1, 'data')
        ->assertJsonPath('data.0.mountain_name', 'Čemernica')
        ->assertJsonPath('data.0.name', 'Summit Trail');
});

test('it shows a route with parsed coordinates', function () {
    $gpx = <<<'GPX'
<?xml version="1.0"?>
<gpx version="1.1" xmlns="http://www.topografix.com/GPX/1/1">
  <trk><trkseg>
    <trkpt lat="43.5" lon="17.2"></trkpt>
    <trkpt lat="43.6" lon="17.3"></trkpt>
  </trkseg></trk>
</gpx>
GPX;

    Storage::put('routes/test.gpx', $gpx);

    $route = HikingRoute::factory()->create(['gpx_path' => 'routes/test.gpx']);

    $this->getJson("/api/v1/routes/{$route->id}")
        ->assertOk()
        ->assertJsonPath('data.id', $route->id)
        ->assertJsonCount(2, 'coordinates')
        ->assertJsonPath('coordinates.0.0', 43.5)
        ->assertJsonPath('coordinates.0.1', 17.2);
});

test('it allows admin to create a route', function () {
    $admin = User::factory()->admin()->create();
    $mountain = Mountain::factory()->create();

    $file = UploadedFile::fake()->create('trail.gpx', 10, 'application/gpx+xml');

    $this->actingAs($admin)
        ->postJson('/api/v1/admin/routes', [
            'mountain_id' => $mountain->id,
            'name' => 'New Trail',
            'file' => $file,
            'is_published' => true,
        ])
        ->assertCreated()
        ->assertJsonPath('data.name', 'New Trail');

    expect(HikingRoute::where('mountain_id', $mountain->id)->exists())->toBeTrue();
});

test('it forbids non-admin from creating a route', function () {
    $user = User::factory()->create();
    $mountain = Mountain::factory()->create();
    $file = UploadedFile::fake()->create('trail.gpx', 10, 'application/gpx+xml');

    $this->actingAs($user)
        ->postJson('/api/v1/admin/routes', [
            'mountain_id' => $mountain->id,
            'name' => 'Unauthorized Trail',
            'file' => $file,
        ])
        ->assertForbidden();
});
