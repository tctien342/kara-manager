<?php

namespace KaraManager\Http\Middleware;

use Closure;
use JWTAuth;
use KaraManager\Http\Controllers\Common;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class VerifyJWTToken
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
        try {
            if ($request->session()->exists('token')) {
                if (!$user = JWTAuth::setToken($request->session()->get('token'))->authenticate()){
                    return response()->json(Common::makeResponse('ERROR',[],'Token error'));
                }
                return $next($request);
            }
        }catch(\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return redirect('/');
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return redirect('/');
        }catch(\Tymon\JWTAuth\Exceptions\JWTException $e){
            return redirect('/');
        }
        return redirect('/');
    }
}
