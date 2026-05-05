<?php

namespace App\Http\Controllers\Api\Admin;

use App\Actions\Photo\ApprovePhotoAction;
use App\Http\Controllers\Controller;
use App\Http\Resources\MountainPhotoResource;
use App\Models\MountainPhoto;

class PhotoController extends Controller
{
    public function approve(MountainPhoto $photo, ApprovePhotoAction $action): MountainPhotoResource
    {
        $photo = $action->execute($photo);

        return MountainPhotoResource::make($photo);
    }
}
