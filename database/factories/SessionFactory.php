<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Session>
 *
 * @see \Illuminate\Session\DatabaseSessionHandler
 */
class SessionFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => Str::random(40),
            'user_id' => User::inRandomOrder()->first(['id'])?->id,
            'ip_address' => fake()->unique()->ipv4(),
            'user_agent' => fake()->unique()->userAgent(),
            'payload' => base64_encode(config('session.encrypt') ? encrypt(serialize([])) : serialize([])),
            'last_activity' => Carbon::make(fake()->dateTimeBetween('-1 month', 'now'))->unix(),
        ];
    }
}
