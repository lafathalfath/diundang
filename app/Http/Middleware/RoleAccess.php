<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RoleAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$guards): Response
    {
        $guards = empty($guards) ? [null] : $guards;
        // dd($guards);
        if (!Auth::check()) return back()->withErrors('unauthorized');

        $user = Auth::user();
        foreach ($guards as $guard) {
            if ($user->role == $guard) {
                return $next($request);
            }
            return back()->withErrors('access restricted');
        }
    }
}
