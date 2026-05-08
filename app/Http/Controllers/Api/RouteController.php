<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\RouteResource;
use App\Models\HikingRoute;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Storage;

class RouteController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $routes = HikingRoute::published()->with('mountain')->get();

        return RouteResource::collection($routes);
    }

    public function show(HikingRoute $hikingRoute): JsonResponse
    {
        $hikingRoute->load('mountain');

        $content = preg_replace('/\sxmlns[^=]*="[^"]*"/', '', Storage::get($hikingRoute->gpx_path));
        $xml = simplexml_load_string($content);

        $coordinates = [];
        foreach ($xml->trk->trkseg->trkpt as $pt) {
            $coordinates[] = [(float) $pt['lat'], (float) $pt['lon']];
        }

        return response()->json([
            'data' => RouteResource::make($hikingRoute)->resolve(),
            'coordinates' => $coordinates,
        ]);
    }
}
