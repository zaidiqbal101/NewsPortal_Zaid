<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EconomicNews extends Model
{
    protected $table = 'economic_news';

    protected $fillable = [
        'title',
        'summary',
        'date',
        'source',
        'image',
        'publish',
    ];

    public $timestamps = false; // If you're not using created_at / updated_at
}
