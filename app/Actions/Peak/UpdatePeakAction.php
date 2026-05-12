<?php

namespace App\Actions\Peak;

use App\Models\Peak;

class UpdatePeakAction
{
    public function execute(Peak $peak, array $data): Peak
    {
        $peak->update($data);

        return $peak->fresh();
    }
}
