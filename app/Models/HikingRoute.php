<?php

namespace App\Models;

use Database\Factories\HikingRouteFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['mountain_id', 'name', 'description', 'gpx_path', 'distance_km', 'duration_minutes', 'is_published'])]
class HikingRoute extends Model
{
    /** @use HasFactory<HikingRouteFactory> */
    use HasFactory;

    protected $table = 'routes';

    protected function casts(): array
    {
        return [
            'is_published' => 'boolean',
            'distance_km' => 'decimal:2',
        ];
    }

    public function mountain(): BelongsTo
    {
        return $this->belongsTo(Mountain::class);
    }

    public function scopePublished(Builder $query): void
    {
        $query->where('is_published', true);
    }
}
