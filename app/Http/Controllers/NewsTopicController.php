<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\PoliticsNews;
use App\Models\WorldNews;
use App\Models\EconomicNews;
use App\Models\ScienceNews;

class NewsTopicController extends Controller
{
public function politics()
{
    $newsItems = \App\Models\PoliticsNews::where('publish', 1)
        ->orderBy('date', 'desc')
        ->get();

    return \Inertia\Inertia::render('Politics', [
        'newsItems' => $newsItems
    ]);
}
public function world()
{
    $newsItems = WorldNews::where('publish', 1)
        ->orderBy('date', 'desc')
        ->get();

    return \Inertia\Inertia::render('World', [
        'newsItems' => $newsItems
    ]);
}
public function economy()
{
    $newsItems = EconomicNews::where('publish', 1)->orderBy('date', 'desc')->get();

    return Inertia::render('Economy', [
        'newsItems' => $newsItems
    ]);
}
public function science()
{
    $newsItems = ScienceNews::where('publish', 1)->orderBy('date', 'desc')->get();

    return Inertia::render('Science', [
        'newsItems' => $newsItems
    ]);
}
}
