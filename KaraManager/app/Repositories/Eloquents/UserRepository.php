<?php
// app/Repositories/Eloquents/ProductRepository.php

namespace KaraManager\Repositories\Eloquents;
use Carbon\Carbon;
use KaraManager\Models\Staff;
use KaraManager\Models\Admin;
use KaraManager\Repositories\Contracts\UserRepositoryInterface;

class UserRepository implements UserRepositoryInterface
{
    public function all()
    {
        $users = Staff::all();
        return $users;
    }

    public function find($id)
    {
        return Staff::where('id','=',$id)->first();
    }

    public function findUserWithEmail($email){
        return Staff::Where('email', $email)->first();
    }

    public function createNewUser($profile){
        $user = new Staff;
        $user->pass = $profile->password;
        $user->name = $profile->name;
        $user->email = $profile->email;
        $user->phone = $profile->phone;
        $user->cmnd = $profile->cmnd;
        $user->adress = $profile->adress;
        $user->save();
        return $user;
    }

    public function newUserWithEmail($email, $pass){
        $user = new Staff;
        $user->email = $email;
        $user->pass = $pass;
        $user->save();
        return $user;
    }

    public function forgot($email, $newpassword){
        $user = Staff::where('email', $email)->first();
        $user->pass = $newpassword;
        $user->save();
        return true;
    }
    
}
