<?php

namespace App\Actions\Peak;

use App\Models\Mountain;
use App\Models\Peak;
use Illuminate\Support\Str;

class CreatePeakAction
{
    public function execute(Mountain $mountain, array $data): Peak
    {
        if (empty($data['slug'])) {
            $base = Str::slug($data['name']);
            $data['slug'] = Peak::where('slug', $base)->exists()
                ? $base.'-'.$mountain->id
                : $base;
        }

        return $mountain->peaks()->create($data);
    }
}
