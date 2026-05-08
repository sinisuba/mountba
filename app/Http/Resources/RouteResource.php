<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RouteResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'mountain_id' => $this->mountain_id,
            'mountain_name' => $this->mountain?->name,
            'name' => $this->name,
            'description' => $this->description,
            'distance_km' => $this->distance_km,
            'duration_minutes' => $this->duration_minutes,
            'is_published' => $this->is_published,
        ];
    }
}
