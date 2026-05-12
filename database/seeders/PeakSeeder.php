<?php

namespace Database\Seeders;

use App\Models\Mountain;
use App\Models\Peak;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PeakSeeder extends Seeder
{
    public function run(): void
    {
        $peaksByMountainSlug = [
            'maglic' => [
                ['name' => 'Maglić', 'elevation_m' => 2386, 'latitude' => 43.2809856, 'longitude' => 18.7331169, 'description' => 'Najviši vrh Bosne i Hercegovine i čitavog Dinarskog gorja na teritoriji BiH.'],
            ],
            'volujak' => [
                ['name' => 'Velika Vlasulja', 'elevation_m' => 2336, 'latitude' => 43.2317631, 'longitude' => 18.7171253, 'description' => 'Drugi po visini vrh Bosne i Hercegovine, smješten unutar Nacionalnog parka Sutjeska.'],
            ],
            'zelengora' => [
                ['name' => 'Bregoč', 'elevation_m' => 2014, 'latitude' => 43.3545664, 'longitude' => 18.5677275, 'description' => 'Najviši vrh masiva Zelengore.'],
            ],
            'prenj' => [
                ['name' => 'Zelena Glava', 'elevation_m' => 2103, 'latitude' => 43.5496983, 'longitude' => 17.9037764, 'description' => 'Najviši vrh planine Prenj.'],
                ['name' => 'Lupoglav', 'elevation_m' => 2101, 'latitude' => 43.5510000, 'longitude' => 17.9120000, 'description' => 'Kondiciono jedan od najzahtjevnijih vrhova Prenja, pogotovo u zimskim uslovima. Pristup moguć iz više pravaca.'],
                ['name' => 'Otiš', 'elevation_m' => 2095, 'latitude' => 43.5460000, 'longitude' => 17.8990000, 'description' => null],
            ],
            'cvrsnica' => [
                ['name' => 'Pločno', 'elevation_m' => 2228, 'latitude' => 43.5993319, 'longitude' => 17.5646814, 'description' => 'Najviši vrh planine Čvrsnica.'],
            ],
            'bjelasnica' => [
                ['name' => 'Bjelašnica', 'elevation_m' => 2067, 'latitude' => 43.7037269, 'longitude' => 18.2576594, 'description' => 'Najviši vrh olimpijske planine Bjelašnice.'],
            ],
            'treskavica' => [
                ['name' => 'Mala Ćaba', 'elevation_m' => 2088, 'latitude' => 43.5961056, 'longitude' => 18.3462425, 'description' => 'Najviši vrh visoravni Treskavice.'],
            ],
            'vlasic' => [
                ['name' => 'Paljenik', 'elevation_m' => 1943, 'latitude' => 44.2926067, 'longitude' => 17.6363667, 'description' => 'Najviši vrh planine Vlašić.'],
            ],
            'vranica' => [
                ['name' => 'Nadkrstac', 'elevation_m' => 2112, 'latitude' => 43.9566500, 'longitude' => 17.7166025, 'description' => 'Najviši vrh centralnobosnijskog masiva Vranice.'],
            ],
            'cemernica' => [
                ['name' => 'Goli vis', 'elevation_m' => 1339, 'latitude' => 44.5218333, 'longitude' => 17.2130750, 'description' => 'Najviši vrh planine Čemernice.'],
            ],
            'klekovaca' => [
                ['name' => 'Velika Klekovača', 'elevation_m' => 1916, 'latitude' => 44.4301183, 'longitude' => 16.5090394, 'description' => 'Najviši vrh planinskog lanca Klekovače.'],
                ['name' => 'Mala Klekovača', 'elevation_m' => 1878, 'latitude' => 44.4350000, 'longitude' => 16.5040000, 'description' => null],
            ],
            'osjecenica' => [
                ['name' => 'Velika Osječenica', 'elevation_m' => 1795, 'latitude' => 44.5191247, 'longitude' => 16.2556125, 'description' => 'Najviši vrh planine Osječenice.'],
                ['name' => 'Mala Osječenica', 'elevation_m' => 1749, 'latitude' => 44.5230000, 'longitude' => 16.2490000, 'description' => null],
            ],
            'grmec' => [
                ['name' => 'Crni vrh', 'elevation_m' => 1605, 'latitude' => 44.6006803, 'longitude' => 16.5267433, 'description' => 'Najviši vrh planine Grmeč.'],
            ],
            'vitorog' => [
                ['name' => 'Veliki Vitorog', 'elevation_m' => 1906, 'latitude' => 44.1198194, 'longitude' => 17.0437611, 'description' => 'Najviši vrh planine Vitorog.'],
                ['name' => 'Mali Vitorog', 'elevation_m' => 1880, 'latitude' => 44.1240000, 'longitude' => 17.0390000, 'description' => null],
            ],
        ];

        foreach ($peaksByMountainSlug as $mountainSlug => $peaks) {
            $mountain = Mountain::where('slug', $mountainSlug)->first();

            if (!$mountain) {
                continue;
            }

            foreach ($peaks as $peakData) {
                $slug = Str::slug($peakData['name']);

                Peak::updateOrCreate(
                    ['slug' => $slug],
                    array_merge($peakData, [
                        'mountain_id' => $mountain->id,
                        'slug' => $slug,
                    ])
                );
            }
        }
    }
}
