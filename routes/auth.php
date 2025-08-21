<?php

declare(strict_types=1);

use App\Http\Controllers\Authentication\EmailVerificationController;
use App\Http\Controllers\Authentication\PasswordConfirmationController;
use App\Http\Controllers\Authentication\PasswordResetController;
use App\Http\Controllers\Authentication\RegistrationController;
use App\Http\Controllers\Authentication\SessionController;

Route::get('/register', [RegistrationController::class, 'create'])
    ->middleware(['guest'])
    ->name('register');
Route::post('/register', [RegistrationController::class, 'store'])
    ->middleware(['guest']);

Route::get('/login', [SessionController::class, 'create'])
    ->middleware(['guest'])
    ->name('login');
Route::post('/login', [SessionController::class, 'store'])
    ->middleware(['guest']);
Route::delete('/logout', [SessionController::class, 'destroy'])
    ->middleware(['auth'])
    ->name('logout');

Route::get('/forgot-password', [PasswordResetController::class, 'create'])
    ->middleware('guest')
    ->name('password.email');
Route::post('/forgot-password', [PasswordResetController::class, 'store'])
    ->middleware('guest');
Route::get('/reset-password/{token}', [PasswordResetController::class, 'edit'])
    ->middleware('guest')
    ->name('password.reset');
Route::post('/reset-password', [PasswordResetController::class, 'update'])
    ->middleware('guest')
    ->name('password.update');

Route::get('/confirm-password', [PasswordConfirmationController::class, 'create'])
    ->middleware('auth')
    ->name('password.confirm');
Route::post('/confirm-password', [PasswordConfirmationController::class, 'store'])
    ->middleware(['auth', 'throttle:6,1']);

Route::get('/email/verify', [EmailVerificationController::class, 'create'])
    ->middleware('auth')
    ->name('verification.notice');
Route::post('/email/verification-notification', [EmailVerificationController::class, 'store'])
    ->middleware(['auth', 'throttle:6,1'])
    ->name('verification.send');
Route::get('/email/verify/{id}/{hash}', [EmailVerificationController::class, 'update'])
    ->middleware(['auth', 'signed'])->name('verification.verify');
