<?php

namespace App\Http\Controllers\Api\Admin;

use App\Actions\GpxTrack\ApproveGpxAction;
use App\Http\Controllers\Controller;
use App\Http\Resources\GpxTrackResource;
use App\Models\GpxTrack;

class GpxTrackController extends Controller
{
    public function approve(GpxTrack $gpxTrack, ApproveGpxAction $action): GpxTrackResource
    {
        $gpxTrack = $action->execute($gpxTrack);

        return GpxTrackResource::make($gpxTrack);
    }
}
