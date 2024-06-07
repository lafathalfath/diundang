<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Undangan extends Model
{
    use HasFactory;
    protected $table = 'undangan';
    protected $guarded = [];

    public function user() : BelongsTo {
        return $this->belongsTo(User::class);
    }
}
