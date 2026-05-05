<?php

namespace App\Http\Controllers\Api;

use App\Actions\Photo\UploadPhotoAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Photo\UploadPhotoRequest;
use App\Http\Resources\MountainPhotoResource;
use App\Models\Mountain;

class PhotoController extends Controller
{
    public function store(UploadPhotoRequest $request, Mountain $mountain, UploadPhotoAction $action): MountainPhotoResource
    {
        $photo = $action->execute(
            mountain: $mountain,
            file: $request->file('photo'),
            uploader: $request->user(),
            caption: $request->input('caption'),
        );

        return MountainPhotoResource::make($photo);
    }
}
