<?php

namespace App\Http\Controllers\Api\Admin;

use App\Actions\Peak\CreatePeakAction;
use App\Actions\Peak\UpdatePeakAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Peak\StorePeakRequest;
use App\Http\Requests\Peak\UpdatePeakRequest;
use App\Http\Resources\PeakResource;
use App\Models\Mountain;
use App\Models\Peak;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class PeakController extends Controller
{
    public function store(Mountain $mountain, StorePeakRequest $request, CreatePeakAction $action): JsonResponse
    {
        $peak = $action->execute($mountain, $request->validated());

        return PeakResource::make($peak)->response()->setStatusCode(201);
    }

    public function update(Peak $peak, UpdatePeakRequest $request, UpdatePeakAction $action): PeakResource
    {
        $peak = $action->execute($peak, $request->validated());

        return PeakResource::make($peak);
    }

    public function destroy(Peak $peak): Response
    {
        $peak->delete();

        return response()->noContent();
    }
}
