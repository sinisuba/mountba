<?php

namespace App\Http\Controllers\Api\Admin;

use App\Actions\Mountain\CreateMountainAction;
use App\Actions\Mountain\UpdateMountainAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Mountain\StoreMountainRequest;
use App\Http\Requests\Mountain\UpdateMountainRequest;
use App\Http\Resources\MountainDetailResource;
use App\Models\Mountain;

class MountainController extends Controller
{
    public function store(StoreMountainRequest $request, CreateMountainAction $action): MountainDetailResource
    {
        $mountain = $action->execute($request->validated());

        return MountainDetailResource::make($mountain);
    }

    public function update(UpdateMountainRequest $request, Mountain $mountain, UpdateMountainAction $action): MountainDetailResource
    {
        $mountain = $action->execute($mountain, $request->validated());

        return MountainDetailResource::make($mountain);
    }
}
