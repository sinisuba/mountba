<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('mountain_photos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mountain_id')->constrained()->cascadeOnDelete();
            $table->string('file_path');
            $table->string('caption')->nullable();
            $table->foreignId('uploaded_by')->constrained('users');
            $table->boolean('is_approved')->default(false)->index();
            $table->timestamps();

            $table->index('mountain_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mountain_photos');
    }
};
