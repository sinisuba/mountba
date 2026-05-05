<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GpxTrackResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'mountain_id' => $this->mountain_id,
            'title' => $this->title,
            'distance_km' => $this->distance_km !== null ? (float) $this->distance_km : null,
            'duration_minutes' => $this->duration_minutes,
            'is_approved' => $this->is_approved,
            'uploaded_by_name' => $this->whenLoaded('uploader', fn () => $this->uploader->name),
            'created_at' => $this->created_at,
        ];
    }
}
