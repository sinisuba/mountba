<?php

use App\Models\User;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;

uses(LazilyRefreshDatabase::class);

test('user can register with valid data', function () {
    $this->postJson('/api/v1/auth/register', [
        'name' => 'Haris Begović',
        'email' => 'haris@test.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ])
        ->assertSuccessful()
        ->assertJsonStructure(['data' => ['id', 'name', 'email', 'role']]);

    expect(User::where('email', 'haris@test.com')->exists())->toBeTrue();
});

test('register validates required fields', function () {
    $this->postJson('/api/v1/auth/register', [])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['name', 'email', 'password']);
});

test('register rejects duplicate email', function () {
    User::factory()->create(['email' => 'taken@test.com']);

    $this->postJson('/api/v1/auth/register', [
        'name' => 'Other',
        'email' => 'taken@test.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ])->assertUnprocessable()
        ->assertJsonValidationErrors(['email']);
});

test('user can login with correct credentials', function () {
    User::factory()->create(['email' => 'user@test.com']);

    $this->postJson('/api/v1/auth/login', [
        'email' => 'user@test.com',
        'password' => 'password',
    ])
        ->assertSuccessful()
        ->assertJsonStructure(['data' => ['id', 'email']]);
});

test('login rejects wrong password', function () {
    User::factory()->create(['email' => 'user@test.com']);

    $this->postJson('/api/v1/auth/login', [
        'email' => 'user@test.com',
        'password' => 'wrong-password',
    ])->assertUnprocessable();
});

test('authenticated user can fetch their profile', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->getJson('/api/v1/auth/user')
        ->assertSuccessful()
        ->assertJsonPath('data.id', $user->id)
        ->assertJsonPath('data.email', $user->email);
});

test('unauthenticated request to user endpoint returns 401', function () {
    $this->getJson('/api/v1/auth/user')->assertUnauthorized();
});

test('authenticated user can logout', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->postJson('/api/v1/auth/logout')
        ->assertSuccessful();
});
