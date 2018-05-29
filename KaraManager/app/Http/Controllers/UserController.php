<?php
namespace KaraManager\Http\Controllers;

use KaraManager\Http\Controllers\Controller;
use Illuminate\Http\Request;
use JWTAuth;
use JWTFactory;
use JWTAuthException;
use Hash;
use Config;
use Carbon\Carbon;
use KaraManager\Repositories\Contracts\UserRepositoryInterface;
use KaraManager\Http\Controllers\Common;

class UserController extends Controller
{   
    protected $userRepository;

    //Return function
    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function login_v2(Request $request){
        //Storing data
        $data = json_decode($request->getContent());
        //Checking method login
        $user = $this->userRepository->findUserWithEmail($data->email);
        if($user){
            // $password = Common::password_generator($data->email,$data->password);
            if($user->pass == $data->password){
                return $this->makeToken($user);
            }
            return response()->json(Common::makeResponse('ERROR',[],'Wrong password'));
        }
        return response()->json(Common::makeResponse('ERROR',[],'User can not validated'));
    }

    public function logout(){
        if ($request->session()->has('token')){
            if (!JWTAuth::setToken($request->session()->get('token'))->invalidate()){
                return redirect('/');
            }
        };
        return redirect('/');
    }

    public function createUserWithEmail(Request $request){
        //TODO
        return response()->json(Common::makeResponse('SUCCESS',[$data->email],'Create user success'));
    }

    public function userForgotPassword(Request $request){
        //TODO
        return response()->json(Common::makeResponse('SUCCESS',[$data->email],'New password sent to mail'));
    }


    // Protected place here
    protected function makeToken($user){
        $credentials = [
            'email' => $user->email,
            'password' => $user->pass
        ];
        $token = null;
        try {
           if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(Common::makeResponse('INVALID_AUTH_HEADER',[],'Invalid user'));
           }
        } catch (JWTAuthException $e) {
            return response()->json(Common::makeResponse('ERROR',[],'Cant create token'));
        }
        return response()->json(Common::makeResponse('SUCCESS',['user'=>$user,'token'=>$token],'Login success'));
    }
}  