<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('admin/AdminDashboard');
    }

    public function articles()
    {
        return Inertia::render('admin/Articles');
    }

     public function fetchArticles($category)
    {
        $table = $this->resolveTable($category);
        if (!$table) return response()->json(['error' => 'Invalid category'], 400);

        $articles = DB::table($table)->orderByDesc('id')->get();

        return response()->json($articles);
    }

    public function storeArticle(Request $request, $category)
    {
        $table = $this->resolveTable($category);
        if (!$table) return response()->json(['error' => 'Invalid category'], 400);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'summary' => 'nullable|string',
            'date' => 'required|date',
            'source' => 'nullable|string',
            'image' => 'nullable|string',
            'publish' => 'boolean',
        ]);

        $validated['created_at'] = now();
        $validated['updated_at'] = now();

        DB::table($table)->insert($validated);

        return response()->json(['message' => 'Article created successfully']);
    }

    public function updateArticle(Request $request, $category, $id)
    {
        $table = $this->resolveTable($category);
        if (!$table) return response()->json(['error' => 'Invalid category'], 400);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'summary' => 'nullable|string',
            'date' => 'required|date',
            'source' => 'nullable|string',
            'image' => 'nullable|string',
            'publish' => 'boolean',
        ]);

        $validated['updated_at'] = now();

        DB::table($table)->where('id', $id)->update($validated);

        return response()->json(['message' => 'Article updated successfully']);
    }

    public function deleteArticle($category, $id)
    {
        $table = $this->resolveTable($category);
        if (!$table) return response()->json(['error' => 'Invalid category'], 400);

        DB::table($table)->where('id', $id)->delete();

        return response()->json(['message' => 'Article deleted successfully']);
    }

    private function resolveTable($category)
    {
        return match ($category) {
            'politics' => 'politics_news',
            'world' => 'world_news',
            'economy' => 'economic_news',
            'science' => 'science_news',
            default => null,
        };
    }
    public function togglePublish(Request $request, $category, $id)
{
    $table = $this->resolveTable($category);
    if (!$table) return response()->json(['error' => 'Invalid category'], 400);

    $validated = $request->validate([
        'publish' => 'required|in:0,1',
    ]);

    DB::table($table)->where('id', $id)->update(['publish' => $validated['publish']]);

    return response()->json(['message' => 'Publish status updated successfully']);
}
    public function users()
    {
        return Inertia::render('admin/Users');
    }

    
}
