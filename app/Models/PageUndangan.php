<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PageUndangan extends Model
{
    use HasFactory;
    protected $table = 'page_undangan';
    protected $guarded = [];

    public function undangan() : BelongsTo {
        return $this->belongsTo(Undangan::class);
    }

    public function section() : BelongsTo {
        return $this->belongsTo(Section::class);
    }
}
