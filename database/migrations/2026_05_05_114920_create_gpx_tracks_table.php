<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('gpx_tracks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mountain_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->string('file_path');
            $table->decimal('distance_km', 6, 2)->nullable();
            $table->unsignedInteger('duration_minutes')->nullable();
            $table->foreignId('uploaded_by')->constrained('users');
            $table->boolean('is_approved')->default(false)->index();
            $table->timestamps();

            $table->index('mountain_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('gpx_tracks');
    }
};
