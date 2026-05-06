<?php

namespace App\Enums;

enum MountainDifficulty: string
{
    case Easy = 'easy';
    case Moderate = 'moderate';
    case Strenuous = 'strenuous';
    case Technical = 'technical';
}
