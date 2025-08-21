<?php

declare(strict_types=1);

namespace App\Http\Controllers\Authentication;

use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;

class PasswordResetController
{
    public function create(): Response
    {
        return Inertia::render('forgot-password');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate(['email' => ['required', 'email']]);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::ResetLinkSent
            ? back()
            : back()->withErrors(['email' => __($status)]);
    }

    public function edit(string $token): Response
    {
        return Inertia::render('reset-password', ['token' => $token]);
    }

    public function update(Request $request): RedirectResponse
    {
        $request->validate([
            'token' => 'required',
            'email' => ['required', 'email'],
            'password' => ['required', Rules\Password::defaults(), 'confirmed'],
            'logout_other_devices' => ['required', 'boolean'],
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password): void {
                $user->forceFill([
                    'password' => Hash::make($password),
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );

        if ($status !== Password::PasswordReset) {
            throw ValidationException::withMessages([
                'email' => __($status),
            ]);
        }

        if ($request->boolean('logout_other_devices')) {
            Auth::logoutOtherDevices((string) $request->string('password'));
        }

        return to_route('login');
    }
}
