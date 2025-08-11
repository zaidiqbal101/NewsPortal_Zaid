<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AuthController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\StoryController;
use App\Http\Controllers\NewsTopicController;
use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    if (Auth::check()) {
        return redirect()->route('home');
    }
    return redirect()->route('login');
})->name('welcome');



Route::get('/home', [LandingController::class, 'index'])->middleware('auth')->name('home');

// Route::get('/admin/dashboard', function () {
//     return Inertia::render('admin/AdminDashboard');
// })->middleware('auth')->name('admin.dashboard');

Route::post('/newsletter/subscribe', [LandingController::class, 'subscribe'])->name('newsletter.subscribe');

Route::get('/stories', [StoryController::class, 'index'])->name('stories.index');
Route::get('/stories/{story:slug}', [StoryController::class, 'show'])->name('stories.show');

Route::get('/subscribe', function () {
    return Inertia::render('Subscribe');
})->name('subscribe');

Route::get('/politics', [NewsTopicController::class, 'politics'])->name('politics');
Route::get('/world', [NewsTopicController::class, 'world'])->name('world');
Route::get('/economy', [NewsTopicController::class, 'economy'])->name('economy');
Route::get('/science', [NewsTopicController::class, 'science'])->name('science');

Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
    Route::get('/articles', [AdminController::class, 'articles'])->name('articles');
    Route::get('/articles/fetch/{category}', [AdminController::class, 'fetchArticles']);
    Route::post('/articles/store/{category}', [AdminController::class, 'storeArticle']);
    Route::post('/articles/update/{category}/{id}', [AdminController::class, 'updateArticle']);
    Route::delete('/articles/delete/{category}/{id}', [AdminController::class, 'deleteArticle']);
    Route::get('/categories', [AdminController::class, 'categories'])->name('categories');
    Route::get('/users', [AdminController::class, 'users'])->name('users');
    Route::get('/settings', [AdminController::class, 'settings'])->name('settings');
});

Route::post('admin/articles/toggle-publish/{category}/{id}', [AdminController::class, 'togglePublish']);


// Authentication Routes
Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
Route::get('/register', [AuthController::class, 'showRegisterForm'])->name('register');
Route::post('/register', [AuthController::class, 'register']);