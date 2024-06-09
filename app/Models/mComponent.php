<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class mComponent extends Model
{
    use HasFactory;
    protected $table = 'm_component';
    protected $guarded = [];

    public function section() : HasMany {
        return $this->hasMany(Section::class);
    }
}
