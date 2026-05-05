<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class MountainPhotoResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'mountain_id' => $this->mountain_id,
            'caption' => $this->caption,
            'photo_url' => Storage::disk('public')->url($this->file_path),
            'is_approved' => $this->is_approved,
            'uploaded_by_name' => $this->whenLoaded('uploader', fn () => $this->uploader->name),
            'created_at' => $this->created_at,
        ];
    }
}
