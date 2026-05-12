<?php

use App\Http\Controllers\Api\Admin;
use App\Http\Controllers\Api\Auth;
use App\Http\Controllers\Api\GpxTrackController;
use App\Http\Controllers\Api\MountainController;
use App\Http\Controllers\Api\PhotoController;
use App\Http\Controllers\Api\RouteController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    // Public mountain routes
    Route::get('/mountains', [MountainController::class, 'index']);
    Route::get('/mountains/{mountain}', [MountainController::class, 'show']);

    // Public routes
    Route::get('/routes', [RouteController::class, 'index']);
    Route::get('/routes/{hikingRoute}', [RouteController::class, 'show']);

    // Auth endpoints
    Route::post('/auth/register', Auth\RegisterController::class);
    Route::post('/auth/login', Auth\LoginController::class);

    Route::middleware('auth:sanctum')->group(function () {
        // Auth user endpoint
        Route::post('/auth/logout', Auth\LogoutController::class);
        Route::get('/auth/user', Auth\UserController::class);

        // Authenticated uploads
        Route::post('/mountains/{mountain}/gpx', [GpxTrackController::class, 'store']);

        // Admin-only routes
        Route::middleware('admin')->prefix('admin')->group(function () {
            Route::post('/mountains', [Admin\MountainController::class, 'store']);
            Route::put('/mountains/{mountain}', [Admin\MountainController::class, 'update']);
            Route::post('/mountains/{mountain}/photos', [PhotoController::class, 'store']);
            Route::patch('/photos/{photo}/approve', [Admin\PhotoController::class, 'approve']);
            Route::patch('/gpx/{gpxTrack}/approve', [Admin\GpxTrackController::class, 'approve']);
            Route::get('/routes', [Admin\RouteController::class, 'index']);
            Route::post('/routes', [Admin\RouteController::class, 'store']);
            Route::delete('/routes/{hikingRoute}', [Admin\RouteController::class, 'destroy']);
        });
    });
});
