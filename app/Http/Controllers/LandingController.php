<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Story;

class LandingController extends Controller
{
    public function index()
    {
        // Fetch featured stories from database
        $featuredStories = Story::where('is_featured', true)
            ->with('author', 'category')
            ->latest()
            ->take(6)
            ->get()
            ->map(function ($story) {
                return [
                    'id' => $story->id,
                    'title' => $story->title,
                    'excerpt' => $story->excerpt,
                    'category' => $story->category->name ?? 'News',
                    'author' => $story->author->name ?? 'Editorial Team',
                    'time' => $story->created_at->diffForHumans(),
                    'image_text' => $story->image_text ?? 'Breaking News',
                    'slug' => $story->slug,
                    'views_count'=>$story->views_count,
                ];
            });

        return Inertia::render('Landing', [
            'featuredStories' => $featuredStories,
        ]);
    }

    public function subscribe(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:newsletter_subscriptions,email',
        ]);

        // Store newsletter subscription
        \App\Models\NewsletterSubscription::create([
            'email' => $request->email,
            'subscribed_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Thank you for subscribing!');
    }
}