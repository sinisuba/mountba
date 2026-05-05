<?php

namespace App\Actions\GpxTrack;

use App\Models\GpxTrack;

class ApproveGpxAction
{
    public function execute(GpxTrack $gpxTrack): GpxTrack
    {
        $gpxTrack->update(['is_approved' => true]);

        return $gpxTrack;
    }
}
