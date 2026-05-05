<?php

namespace App\Policies;

use App\Models\GpxTrack;
use App\Models\User;

class GpxTrackPolicy
{
    public function approve(User $user, GpxTrack $gpxTrack): bool
    {
        return $user->isAdmin();
    }
}
