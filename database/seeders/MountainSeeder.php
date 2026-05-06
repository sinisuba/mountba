<?php

namespace Database\Seeders;

use App\Models\Mountain;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class MountainSeeder extends Seeder
{
    public function run(): void
    {
        $mountains = [
            ['name' => 'Maglić', 'elevation_m' => 2386, 'latitude' => 43.2442, 'longitude' => 18.8347, 'region' => 'Sutjeska', 'difficulty' => 'strenuous', 'description' => 'Maglić je najviši vrh Bosne i Hercegovine, smješten na granici s Crnom Gorom u sklopu Nacionalnog parka Sutjeska. Planina je poznata po dramatičnim liticama i spektakularnim pogledima na Trnovačko jezero.'],
            ['name' => 'Volujak', 'elevation_m' => 2336, 'latitude' => 43.3028, 'longitude' => 18.7228, 'region' => 'Sutjeska', 'difficulty' => 'strenuous', 'description' => 'Volujak je drugi po visini vrh u Bosni i Hercegovini, smješten unutar Nacionalnog parka Sutjeska. Planina nudi izazovne uspone i prekrasne poglede na okolno planinsko područje.'],
            ['name' => 'Zelengora', 'elevation_m' => 2014, 'latitude' => 43.3667, 'longitude' => 18.6333, 'region' => 'Zelengora', 'difficulty' => 'moderate', 'description' => 'Zelengora je planinski masiv u jugoistočnoj Bosni poznat po ljepoti planinskih jezera i šumovitim padinama. Pruža odlične mogućnosti za višednevne planinarenje.'],
            ['name' => 'Prenj', 'elevation_m' => 2155, 'latitude' => 43.5500, 'longitude' => 17.8833, 'region' => 'Prenj', 'difficulty' => 'strenuous', 'description' => 'Prenj je divlji i teško pristupačan planinski masiv iznad doline Neretve, poznat po kraškim oblicima reljefa i izoliranim vrhovima. Čest cilj iskusnih planinarskih ekspedicija.'],
            ['name' => 'Čvrsnica', 'elevation_m' => 2228, 'latitude' => 43.6167, 'longitude' => 17.5833, 'region' => 'Čvrsnica', 'difficulty' => 'strenuous', 'description' => 'Čvrsnica je masivna planina u Hercegovini, s najvišim vrhom Pločno. Poznata je po dubokim kanjonima, vrtačama i bogatoj planinskoj flori.'],
            ['name' => 'Čabulja', 'elevation_m' => 1785, 'latitude' => 43.5500, 'longitude' => 17.7167, 'region' => 'Čabulja', 'difficulty' => 'moderate', 'description' => 'Čabulja je planina u Hercegovini, smještena između Mostara i Jablanice. Pruža lijepe poglede na Neretvu i okolne planine te je popularna planinarska destinacija.'],
            ['name' => 'Bjelašnica', 'elevation_m' => 2067, 'latitude' => 43.7167, 'longitude' => 18.2667, 'region' => 'Bjelašnica', 'difficulty' => 'moderate', 'description' => 'Bjelašnica je planina nedaleko Sarajeva, domaćin zimskih olimpijskih igara 1984. godine. Nudi pristupačne staze i prekrasne poglede na Sarajevsko polje.'],
            ['name' => 'Treskavica', 'elevation_m' => 2088, 'latitude' => 43.6167, 'longitude' => 18.3333, 'region' => 'Treskavica', 'difficulty' => 'moderate', 'description' => 'Treskavica je krška visoravan južno od Sarajeva, poznata po planinskim jezerima i bogatim pašnjacima. Nudi mirne i manje posjećene planinske staze.'],
            ['name' => 'Vlašić', 'elevation_m' => 1943, 'latitude' => 44.2833, 'longitude' => 17.6000, 'region' => 'Vlašić', 'difficulty' => 'easy', 'description' => 'Vlašić je planina u središnjoj Bosni iznad Travnika, popularna skijaška destinacija. Ljeti nudi bogatu mrežu planinarskih staza kroz livade i bukove šume.'],
            ['name' => 'Vranica', 'elevation_m' => 2112, 'latitude' => 43.9500, 'longitude' => 17.5667, 'region' => 'Vranica', 'difficulty' => 'moderate', 'description' => 'Vranica je najviši planinski masiv u središnjoj Bosni, poznat po netaknutoj prirodi i čistim planinskim izvorima. Odlično polazište za višednevne planinarenje.'],
        ];

        foreach ($mountains as $data) {
            Mountain::updateOrCreate(
                ['slug' => Str::slug($data['name'])],
                array_merge($data, [
                    'slug' => Str::slug($data['name']),
                    'is_published' => true,
                ])
            );
        }
    }
}
