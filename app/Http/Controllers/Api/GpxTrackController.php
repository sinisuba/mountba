<?php

namespace App\Http\Controllers\Api;

use App\Actions\GpxTrack\UploadGpxAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\GpxTrack\UploadGpxRequest;
use App\Http\Resources\GpxTrackResource;
use App\Models\GpxTrack;
use App\Models\Mountain;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

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

    public function download(Mountain $mountain, GpxTrack $gpxTrack): StreamedResponse
    {
        abort_unless($gpxTrack->mountain_id === $mountain->id, 404);
        abort_unless($gpxTrack->is_approved, 404);

        return Storage::disk('local')->download(
            $gpxTrack->file_path,
            str($gpxTrack->title)->slug()->append('.gpx')->toString(),
        );
    }
}
