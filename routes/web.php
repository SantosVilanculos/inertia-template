<?php

declare(strict_types=1);

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

Route::get('/', fn (Request $request): Response => Inertia::render('home'))->name('home');

Route::group(['prefix' => '/dashboard'], function (): void {
    Route::get('/', fn (Request $request): Response => Inertia::render('dashboard', [
        'LARAVEL_VERSION' => Illuminate\Foundation\Application::VERSION,
        'PHP_VERSION' => PHP_VERSION,
    ]))->name('dashboard');
});

// require_once __DIR__.'/auth.php';
// require_once __DIR__.'/settings.php';
// require_once __DIR__.'/admin.php';
