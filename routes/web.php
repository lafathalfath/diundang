<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\undangan\UndanganController;
use App\Models\Undangan;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('/')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    });

    // undangan
    $all_undangan = Undangan::get();
    foreach ($all_undangan as $key=>$undangan) {
        Route::get("/$undangan->slug", function () use ($undangan) {
            return $undangan->title;
        })->name("guest.$undangan->slug");
    }
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware('role.access:admin')->group(function () {
        Route::get('/cek', function () {return 'lkzmc';});
    });

    Route::middleware('role.access:user')->group(function () {
        Route::prefix('/undangan')->group(function () {
            Route::get('/', [UndanganController::class, 'index'])->name('user.undangan.view');
            Route::get('/buat', [UndanganController::class, 'create'])->name('user.undangan.buat.view');
            Route::post('/store', [UndanganController::class, 'store'])->name('user.undangan.store');
            Route::get('/{id}/ubah', [UndanganController::class, 'edit'])->name('user.undangan.edit');
            Route::put('/{id}/update', [UndanganController::class, 'update'])->name('user.undangan.update');
            Route::delete('/{id}/destroy', [UndanganController::class, 'destroy'])->name('user.undangan.destroy');
        });
    });
});

require __DIR__.'/auth.php';
