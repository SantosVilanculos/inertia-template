<?php

declare(strict_types=1);

namespace App\Http\Controllers\Authentication;

use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmailVerificationController
{
    public function create(): Response
    {
        return Inertia::render('verify-email');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->user()->sendEmailVerificationNotification();

        return back();
    }

    public function update(EmailVerificationRequest $request): RedirectResponse
    {
        $request->fulfill();

        return to_route('home');
    }
}
