<?php

namespace App\Actions\Photo;

use App\Models\MountainPhoto;

class ApprovePhotoAction
{
    public function execute(MountainPhoto $photo): MountainPhoto
    {
        $photo->update(['is_approved' => true]);

        return $photo;
    }
}
