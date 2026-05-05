<?php

namespace App\Actions\Photo;

use App\Models\Mountain;
use App\Models\MountainPhoto;
use App\Models\User;
use Illuminate\Http\UploadedFile;

class UploadPhotoAction
{
    public function execute(Mountain $mountain, UploadedFile $file, User $uploader, ?string $caption): MountainPhoto
    {
        $path = $file->store("photos/{$mountain->id}", 'public');

        return MountainPhoto::create([
            'mountain_id' => $mountain->id,
            'file_path' => $path,
            'caption' => $caption,
            'uploaded_by' => $uploader->id,
            'is_approved' => false,
        ]);
    }
}
