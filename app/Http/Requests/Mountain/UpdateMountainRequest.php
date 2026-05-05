<?php

namespace App\Http\Requests\Mountain;

use App\Enums\MountainDifficulty;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateMountainRequest extends FormRequest
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
        $mountain = $this->route('mountain');

        return [
            'name' => ['sometimes', 'string', 'max:255'],
            'slug' => ['sometimes', 'string', 'max:255', Rule::unique('mountains', 'slug')->ignore($mountain?->id)],
            'elevation_m' => ['sometimes', 'integer', 'min:0', 'max:9000'],
            'latitude' => ['sometimes', 'numeric', 'between:-90,90'],
            'longitude' => ['sometimes', 'numeric', 'between:-180,180'],
            'description' => ['nullable', 'string'],
            'difficulty' => ['nullable', Rule::enum(MountainDifficulty::class)],
            'region' => ['nullable', 'string', 'max:255'],
            'is_published' => ['boolean'],
        ];
    }
}
