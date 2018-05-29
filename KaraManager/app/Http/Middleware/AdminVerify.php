<?php

namespace KaraManager\Http\Middleware;

use Closure;
use JWTAuth;
use KaraManager\Models\Staff;
use KaraManager\Http\Controllers\Common;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class AdminVerify
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
        $user_id = JWTAuth::parseToken()->getPayload()['id'];
        if ($staff = Staff::where('id',$user_id)->first()){
            if ($staff->type->id == 1)
                return $next($request);
        }
        return response()->json(Common::makeResponse('ERROR',[],'You are not admin'));
    }
}
