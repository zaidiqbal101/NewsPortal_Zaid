<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PoliticsNews extends Model
{
    protected $table = 'politics_news'; // Match your DB table name

    protected $fillable = [
        'title',
        'summary',
        'date',
        'source',
        'image',
        'publish',
    ];

    // Optional: if you're not using Laravel's timestamps
    // public $timestamps = false;
}
