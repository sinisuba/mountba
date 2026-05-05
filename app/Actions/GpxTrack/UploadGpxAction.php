<?php

namespace App\Actions\GpxTrack;

use App\Models\GpxTrack;
use App\Models\Mountain;
use App\Models\User;
use Illuminate\Http\UploadedFile;

class UploadGpxAction
{
    public function execute(
        Mountain $mountain,
        UploadedFile $file,
        User $uploader,
        string $title,
        ?float $distanceKm = null,
        ?int $durationMinutes = null,
    ): GpxTrack {
        $path = $file->store("gpx/{$mountain->id}", 'local');

        return GpxTrack::create([
            'mountain_id' => $mountain->id,
            'title' => $title,
            'file_path' => $path,
            'distance_km' => $distanceKm,
            'duration_minutes' => $durationMinutes,
            'uploaded_by' => $uploader->id,
            'is_approved' => false,
        ]);
    }
}
