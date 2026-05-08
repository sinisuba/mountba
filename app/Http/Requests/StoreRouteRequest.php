<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRouteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'mountain_id' => ['required', 'integer', 'exists:mountains,id'],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'distance_km' => ['nullable', 'numeric', 'min:0'],
            'duration_minutes' => ['nullable', 'integer', 'min:0'],
            'is_published' => ['boolean'],
            'file' => ['required', 'file', 'mimetypes:application/gpx+xml,text/xml,application/xml', 'max:10240'],
        ];
    }
}
