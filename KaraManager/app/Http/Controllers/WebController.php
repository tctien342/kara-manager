<?php

namespace KaraManager\Http\Controllers;

use Illuminate\Http\Request;
use JWTAuth;
use JWTFactory;
use JWTAuthException;
use Mobile_Detect;
class WebController extends Controller
{
    public function redirect($token, Request $request){
        try {
            if (!$user = JWTAuth::setToken($token)->authenticate()){
                return response()->json(Common::makeResponse('ERROR',[],'Token error'));
            }
        }catch(\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json('token_expired', 404);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json('token_invalid', 404);
        }catch(\Tymon\JWTAuth\Exceptions\JWTException $e){
            return response()->json('token_denied', 404);
        }
        $request->session()->put('token', $token);
        $request->session()->save();
        return redirect('main');
    }

    public function main(Request $request){
        $detect = new Mobile_Detect;
        // Check for mobile environment.
        // if ($detect->isMobile() && !$detect->isTablet()) {
        //     return redirect('/');
        // }else{
            if ($request->session()->has('token')){
                if (!JWTAuth::setToken($request->session()->get('token'))->authenticate()){
                    return redirect('/');
                }
            }else{
                return redirect('/');
            };
            $view = view('root',[
                'token' => $request->session()->get('token')
            ]);
            return $view;
        // }
    }


    public function login(Request $request){
        $detect = new Mobile_Detect;
        // Check for mobile environment.
        if ($request->session()->has('token')){
            if (JWTAuth::setToken($request->session()->get('token'))->authenticate()){
                return redirect('main');
            }
        };
        return view('root');
    }

    public function logout(Request $request){
        if ($request->session()->has('token')){
            JWTAuth::setToken($request->session()->get('token'))->invalidate();
            $request->session()->forget('token');
        };
        return redirect('/');
    }
}
