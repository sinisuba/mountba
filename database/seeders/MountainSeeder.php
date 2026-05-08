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
            ['name' => 'Maglić', 'elevation_m' => 2386, 'latitude' => 43.2809856, 'longitude' => 18.7331169, 'region' => 'Sutjeska', 'difficulty' => 'strenuous', 'description' => 'Maglić je najviši vrh Bosne i Hercegovine, smješten na granici s Crnom Gorom u sklopu Nacionalnog parka Sutjeska. Planina je poznata po dramatičnim liticama i spektakularnim pogledima na Trnovačko jezero.'],
            ['name' => 'Volujak', 'elevation_m' => 2336, 'latitude' => 43.2317631, 'longitude' => 18.7171253, 'region' => 'Sutjeska', 'difficulty' => 'strenuous', 'description' => 'Volujak je drugi po visini vrh u Bosni i Hercegovini, smješten unutar Nacionalnog parka Sutjeska. Planina nudi izazovne uspone i prekrasne poglede na okolno planinsko područje.'],
            ['name' => 'Zelengora', 'elevation_m' => 2014, 'latitude' => 43.3545664, 'longitude' => 18.5677275, 'region' => 'Zelengora', 'difficulty' => 'moderate', 'description' => 'Zelengora je planinski masiv u jugoistočnoj Bosni poznat po ljepoti planinskih jezera i šumovitim padinama. Pruža odlične mogućnosti za višednevne planinarenje.'],
            ['name' => 'Prenj', 'elevation_m' => 2103, 'latitude' => 43.5496983, 'longitude' => 17.9037764, 'region' => 'Prenj', 'difficulty' => 'strenuous', 'description' => 'Prenj je divlji i teško pristupačan planinski masiv iznad doline Neretve, poznat po kraškim oblicima reljefa i izoliranim vrhovima. Čest cilj iskusnih planinarskih ekspedicija.'],
            ['name' => 'Čvrsnica', 'elevation_m' => 2228, 'latitude' => 43.5993319, 'longitude' => 17.5646814, 'region' => 'Čvrsnica', 'difficulty' => 'strenuous', 'description' => 'Čvrsnica je masivna planina u Hercegovini, s najvišim vrhom Pločno. Poznata je po dubokim kanjonima, vrtačama i bogatoj planinskoj flori.'],
            ['name' => 'Bjelašnica', 'elevation_m' => 2067, 'latitude' => 43.7037269, 'longitude' => 18.2576594, 'region' => 'Bjelašnica', 'difficulty' => 'moderate', 'description' => 'Bjelašnica je planina nedaleko Sarajeva, domaćin zimskih olimpijskih igara 1984. godine. Nudi pristupačne staze i prekrasne poglede na Sarajevsko polje.'],
            ['name' => 'Treskavica', 'elevation_m' => 2088, 'latitude' => 43.5961056, 'longitude' => 18.3462425, 'region' => 'Treskavica', 'difficulty' => 'moderate', 'description' => 'Treskavica je krška visoravan južno od Sarajeva, poznata po planinskim jezerima i bogatim pašnjacima. Nudi mirne i manje posjećene planinske staze.'],
            ['name' => 'Vlašić', 'elevation_m' => 1943, 'latitude' => 44.2926067, 'longitude' => 17.6363667, 'region' => 'Vlašić', 'difficulty' => 'easy', 'description' => 'Vlašić je planina u središnjoj Bosni iznad Travnika, popularna skijaška destinacija. Ljeti nudi bogatu mrežu planinarskih staza kroz livade i bukove šume.'],
            ['name' => 'Vranica', 'elevation_m' => 2112, 'latitude' => 43.9566500, 'longitude' => 17.7166025, 'region' => 'Vranica', 'difficulty' => 'moderate', 'description' => 'Vranica je najviši planinski masiv u središnjoj Bosni, poznat po netaknutoj prirodi i čistim planinskim izvorima. Odlično polazište za višednevne planinarenje.'],
            ['name' => 'Čemernica', 'elevation_m' => 1339, 'latitude' => 44.5218333, 'longitude' => 17.2130750, 'region' => 'Bočac', 'difficulty' => 'moderate', 'description' => 'Čemernica je planina u Dinarskom planinskom sistemu, koja se nalazi između opština Banja Luka, Čelinac, Mrkonjić Grad, Kneževo i Kotor Varoš. Nalazi se istočno od planine Manjače, a okružena je rijekama Vrbas i Ugar. Najviši vrh planine je Goli vis.'],
            ['name' => 'Klekovača', 'elevation_m' => 1916, 'latitude' => 44.4301183, 'longitude' => 16.5090394, 'region' => 'Bosanski Petrovac', 'difficulty' => 'moderate', 'description' => 'Klekovača je surova planina, koja se proteže dužinom od 43 km. Klekovaču odlikuje velike stijene koje se protežu samim vrhom od Velike do Male Klekovače. Najviši vrh planine je Velika Klekovača.'],
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
