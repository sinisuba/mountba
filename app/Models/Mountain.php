<?php

namespace App\Models;

use App\Enums\MountainDifficulty;
use Database\Factories\MountainFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['name', 'slug', 'elevation_m', 'latitude', 'longitude', 'description', 'difficulty', 'region', 'is_published'])]
class Mountain extends Model
{
    /** @use HasFactory<MountainFactory> */
    use HasFactory;

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'difficulty' => MountainDifficulty::class,
            'is_published' => 'boolean',
            'latitude' => 'decimal:7',
            'longitude' => 'decimal:7',
        ];
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function gpxTracks(): HasMany
    {
        return $this->hasMany(GpxTrack::class);
    }

    public function hikingRoutes(): HasMany
    {
        return $this->hasMany(HikingRoute::class);
    }

    public function photos(): HasMany
    {
        return $this->hasMany(MountainPhoto::class);
    }

    public function scopePublished(Builder $query): void
    {
        $query->where('is_published', true);
    }
}
