<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ScienceNews extends Model
{
    protected $table = 'science_news';

    protected $fillable = [
        'title', 'summary', 'date', 'source', 'image', 'publish'
    ];

    public $timestamps = false;
}
