<?php

namespace App\Http\Controllers\undangan;

use App\Http\Controllers\Controller;
use App\Models\Undangan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UndanganController extends Controller
{
    public function index() {
        $all_undangan = Undangan::where('user_id', Auth::user()->id)
            ->get();
        return Inertia::render('user/undangan/index', [
            'all_undangan' => $all_undangan,
        ]);
    }

    public function create() {
        return Inertia::render('user/undangan/create');
    }

    public function store(Request $request) {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
        ], [
            'title.required' => 'judul undangan kosong',
            'title.string' => 'tipe data tidak sesuai',
            'title.max' => 'judul tidak boleh melebihi 255 karakter',
            'slug.required' => 'slug kosong',
            'slug.string' => 'tipe data tidak sesuai',
            'slug.max' => 'slug tidak boleh melebihi 255 karakter',
        ]);

        Undangan::create([
            'user_id' => Auth::user()->id,
            'title' => $request->title,
            'slug' => $request->slug,
        ]);

        return redirect()->route('user.undangan.view')->with('success', 'berhasil membuat undangan baru');
    }

    public function edit($id) {
        $undangan = Undangan::find($id);
        if (!$undangan) return redirect()->back()->withErrors('undangan tidak ditemukan');
        if ($undangan->user_id != Auth::user()->id) return redirect()->back()->withErrors('undangan tidak ditemukan');
        return Inertia::render('user/undangan/edit', ['undangan' => $undangan]);
    }

    public function update(Request $request, $id) {
        $undangan = Undangan::find($id);
        if (!$undangan) return redirect()->back()->withErrors('undangan tidak ditemukan');
        if ($undangan->user_id != Auth::user()->id) return redirect()->back()->withErrors('undangan tidak ditemukan');

        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
        ], [
            'title.required' => 'judul undangan kosong',
            'title.string' => 'tipe data tidak sesuai',
            'title.max' => 'judul tidak boleh melebihi 255 karakter',
            'slug.required' => 'slug kosong',
            'slug.string' => 'tipe data tidak sesuai',
            'slug.max' => 'slug tidak boleh melebihi 255 karakter',
        ]);

        $undangan->update([
            'title' => $request->title,
            'slug' => $request->slug,
        ]);

        return redirect()->route('user.undangan.view')->with('success', 'undangan berhasil diperbarui');
    }

    public function destroy($id) {
        $undangan = Undangan::find($id);
        if (!$undangan) return redirect()->back()->withErrors('undangan tidak ditemukan');
        if ($undangan->user_id != Auth::user()->id) return redirect()->back()->withErrors('undangan tidak ditemukan');
        $undangan->delete();
        return redirect()->route('user.undangan.view')->with('success', 'undangan berhasil dihapus');
    }
}
