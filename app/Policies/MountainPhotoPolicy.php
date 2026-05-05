<?php

namespace App\Policies;

use App\Models\MountainPhoto;
use App\Models\User;

class MountainPhotoPolicy
{
    public function approve(User $user, MountainPhoto $mountainPhoto): bool
    {
        return $user->isAdmin();
    }
}
