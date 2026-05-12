<?php

namespace App\Http\Controllers\Api;

use App\Actions\GpxTrack\UploadGpxAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\GpxTrack\UploadGpxRequest;
use App\Http\Resources\GpxTrackResource;
use App\Models\Mountain;

class GpxTrackController extends Controller
{
    public function store(UploadGpxRequest $request, Mountain $mountain, UploadGpxAction $action): GpxTrackResource
    {
        $track = $action->execute(
            mountain: $mountain,
            file: $request->file('file'),
            uploader: $request->user(),
            title: $request->input('title'),
            distanceKm: $request->input('distance_km'),
            durationMinutes: $request->input('duration_minutes'),
        );

        return GpxTrackResource::make($track);
    }
}
