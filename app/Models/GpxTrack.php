<?php

namespace App\Models;

use Database\Factories\GpxTrackFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['mountain_id', 'title', 'file_path', 'distance_km', 'duration_minutes', 'uploaded_by', 'is_approved'])]
class GpxTrack extends Model
{
    /** @use HasFactory<GpxTrackFactory> */
    use HasFactory;

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'is_approved' => 'boolean',
            'distance_km' => 'decimal:2',
        ];
    }

    public function mountain(): BelongsTo
    {
        return $this->belongsTo(Mountain::class);
    }

    public function uploader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    public function scopeApproved(Builder $query): void
    {
        $query->where('is_approved', true);
    }
}
