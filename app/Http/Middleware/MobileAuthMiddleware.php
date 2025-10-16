<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MobileAuthMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if ($request->has('mobile_token')) {
            $token = $request->get('mobile_token');

            if ($user = User::where('remember_token', $token)->first()) {
                Auth::login($user);
                return $next($request);
            }
        }

        if ($request->hasCookie('mobile_token')) {
            $token = $request->cookie('mobile_token');
            if ($user == User::where('remember_token', $token)->first()) {
                Auth::login($user);
                return $next($request);
            }
        }

        return $next($request);
    }
}
