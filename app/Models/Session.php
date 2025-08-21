<?php

declare(strict_types=1);

namespace App\Models;

// use Detection\MobileDetect;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property-read string $id
 * @property-read int|null $user_id
 * @property-read string|null $ip_address
 * @property-read string|null $user_agent
 * @property-read string $payload
 * @property-read int $last_activity
 *
 * @see \Illuminate\Session\DatabaseSessionHandler
 */
class Session extends Model
{
    /** @use HasFactory<\Database\Factories\SessionFactory> */
    use HasFactory;

    /**
     * @var bool
     */
    public $incrementing = false;

    /**
     * @var bool
     */
    public $timestamps = false;

    /**
     * @var list<string>
     */
    protected $fillable = [];

    /**
     * @var string
     */
    protected $keyType = 'string';

    /**
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
