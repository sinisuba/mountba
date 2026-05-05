<?php

namespace App\Actions\Mountain;

use App\Models\Mountain;

class UpdateMountainAction
{
    public function execute(Mountain $mountain, array $data): Mountain
    {
        $mountain->update($data);

        return $mountain->fresh();
    }
}
