<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PeakResource;
use App\Models\Mountain;
use App\Models\Peak;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class PeakController extends Controller
{
    public function index(Mountain $mountain): AnonymousResourceCollection
    {
        return PeakResource::collection($mountain->peaks);
    }

    public function show(Mountain $mountain, Peak $peak): PeakResource
    {
        $peak->load('mountain');

        return PeakResource::make($peak);
    }
}
