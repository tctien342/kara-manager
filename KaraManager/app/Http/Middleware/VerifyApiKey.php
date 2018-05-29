<?php

namespace KaraManager\Http\Middleware;

use Closure;
use Config;
use KaraManager\Http\Controllers\Common;
class VerifyApiKey
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($request->header('ApiKey') != Config::get('system.API_KEY')) {
            return response()->json(Common::makeResponse('ERROR',[],'Apikey wrong'));
        }

        return $next($request);
    }
}