<?php

namespace App\Actions\Mountain;

use App\Models\Mountain;
use Illuminate\Support\Str;

class CreateMountainAction
{
    public function execute(array $data): Mountain
    {
        $data['slug'] ??= Str::slug($data['name']);

        return Mountain::create($data);
    }
}
