<?php

namespace App\Http\Requests\Mountain;

use App\Enums\MountainDifficulty;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreMountainRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:mountains,slug'],
            'elevation_m' => ['required', 'integer', 'min:0', 'max:9000'],
            'latitude' => ['required', 'numeric', 'between:-90,90'],
            'longitude' => ['required', 'numeric', 'between:-180,180'],
            'description' => ['nullable', 'string'],
            'difficulty' => ['nullable', Rule::enum(MountainDifficulty::class)],
            'region' => ['nullable', 'string', 'max:255'],
            'is_published' => ['boolean'],
        ];
    }
}
