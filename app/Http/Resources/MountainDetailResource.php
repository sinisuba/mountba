<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MountainDetailResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'elevation_m' => $this->elevation_m,
            'latitude' => (float) $this->latitude,
            'longitude' => (float) $this->longitude,
            'description' => $this->description,
            'difficulty' => $this->difficulty?->value,
            'region' => $this->region,
            'is_published' => $this->is_published,
            'photos' => MountainPhotoResource::collection($this->whenLoaded('photos')),
            'gpx_tracks' => GpxTrackResource::collection($this->whenLoaded('gpxTracks')),
        ];
    }
}
