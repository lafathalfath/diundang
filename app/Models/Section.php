<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Section extends Model
{
    use HasFactory;
    protected $table = 'section';
    protected $guarded = [];

    public function component() : BelongsTo {
        return $this->belongsTo(mComponent::class);
    }

    public function page_undangan() : HasMany {
        return $this->hasMany(PageUndangan::class);
    }
}
