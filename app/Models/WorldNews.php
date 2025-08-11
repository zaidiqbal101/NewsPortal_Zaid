<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorldNews extends Model
{
    protected $table = 'world_news';

    protected $fillable = [
        'title',
        'summary',
        'date',
        'source',
        'image',
        'publish',
    ];
}
