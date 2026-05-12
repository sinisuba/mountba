<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\MountainDetailResource;
use App\Http\Resources\MountainResource;
use App\Models\Mountain;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class MountainController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $mountains = Mountain::published()->get();

        return MountainResource::collection($mountains);
    }

    public function show(Mountain $mountain): MountainDetailResource
    {
        $mountain->load([
            'photos' => fn ($query) => $query->approved()->with('uploader'),
            'gpxTracks' => fn ($query) => $query->approved()->with('uploader'),
            'hikingRoutes' => fn ($query) => $query->published(),
            'peaks',
        ]);

        return MountainDetailResource::make($mountain);
    }
}
