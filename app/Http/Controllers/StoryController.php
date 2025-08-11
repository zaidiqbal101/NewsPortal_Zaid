<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Story;


class StoryController extends Controller
{
  public function show(Story $story)
    {
        $story->load('author', 'category', 'tags');
        
        // Get related stories
        $relatedStories = Story::where('category_id', $story->category_id)
            ->where('id', '!=', $story->id)
            ->take(3)
            ->get();

        return Inertia::render('Story/Show', [
            'story' => $story,
            'relatedStories' => $relatedStories,
        ]);
    }

    public function index(Request $request)
    {
        $query = Story::with('author', 'category')
            ->latest();

        // Filter by category if provided
        if ($request->category) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        // Search functionality
        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('content', 'like', '%' . $request->search . '%');
            });
        }

        $stories = $query->paginate(12);

        return Inertia::render('Stories/Index', [
            'stories' => $stories,
            'filters' => $request->only(['category', 'search']),
        ]);
    }
}