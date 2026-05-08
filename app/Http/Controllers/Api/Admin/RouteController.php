<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRouteRequest;
use App\Http\Resources\RouteResource;
use App\Models\HikingRoute;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Storage;

class RouteController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $routes = HikingRoute::with('mountain')->latest()->get();

        return RouteResource::collection($routes);
    }

    public function store(StoreRouteRequest $request): JsonResponse
    {
        $file = $request->file('file');
        $path = $file->store('routes');

        $route = HikingRoute::create([
            'mountain_id' => $request->mountain_id,
            'name' => $request->name,
            'description' => $request->description,
            'gpx_path' => $path,
            'distance_km' => $request->distance_km,
            'duration_minutes' => $request->duration_minutes,
            'is_published' => $request->boolean('is_published'),
        ]);

        $route->load('mountain');

        return response()->json(['data' => RouteResource::make($route)->resolve()], 201);
    }

    public function destroy(HikingRoute $hikingRoute): JsonResponse
    {
        Storage::delete($hikingRoute->gpx_path);
        $hikingRoute->delete();

        return response()->json(null, 204);
    }
}
