<?php
namespace KaraManager\Http\Controllers\Auth;
use KaraManager\Models\Staff;
use Carbon\Carbon;
use Illuminate\Auth\GenericUser; 
use Illuminate\Contracts\Auth\Authenticatable; 
use Illuminate\Contracts\Auth\UserProvider;

class CustomUserProvider implements UserProvider {
    /**
     * Retrieve a user by their unique identifier.
     *
     * @param  mixed $identifier
     * @return \Illuminate\Contracts\Auth\Authenticatable|null
     */
    public function retrieveById($identifier)
    {
        // TODO: Implement retrieveById() method.


        $qry = Staff::where('id','=',$identifier);

        if($qry->count() >0)
        {
            $user = $qry->select('id', 'name', 'email', 'phone', 'cmnd','adress','type_id', 'pass')->first();

            // $attributes = array(
            //     'user_id' => $user->user_id,
            //     'tp_id' => $user->tp_id,
            //     'tp_token' => $user ->tp_token,
            //     'tp_'
            //     'username' => $user->username,
            //     'password' => $user->password,
            //     'name' => $user->first_name . ' ' . $user->last_name,
            // );

            return $user;
        }
        return null;
    }

    /**
     * Retrieve a user by by their unique identifier and "remember me" token.
     *
     * @param  mixed $identifier
     * @param  string $token
     * @return \Illuminate\Contracts\Auth\Authenticatable|null
     */
    public function retrieveByToken($identifier, $token)
    {
        // TODO: Implement retrieveByToken() method.
        $qry = Staff::where('email','=',$identifier)->where('pass','=',$token);

        if($qry->count() >0)
        {
            $user = $qry->select('id', 'name', 'email', 'phone', 'cmnd','adress','type_id', 'pass')->first();

            // $attributes = array(
            //     'id' => $user->admin_id,
            //     'username' => $user->username,
            //     'password' => $user->password,
            //     'name' => $user->first_name . ' ' . $user->last_name,
            // );

            return $user;
        }
        return null;



    }

    /**
     * Update the "remember me" token for the given user in storage.
     *
     * @param  \Illuminate\Contracts\Auth\Authenticatable $user
     * @param  string $token
     * @return void
     */
    public function updateRememberToken(Authenticatable $user, $token)
    {
        // TODO: Implement updateRememberToken() method.
        $user->setRememberToken($token);

        $user->save();
        return true;

    }

    /**
     * Retrieve a user by the given credentials.
     *
     * @param  array $credentials
     * @return \Illuminate\Contracts\Auth\Authenticatable|null
     */
    public function retrieveByCredentials(array $credentials)
    {
        // TODO: Implement retrieveByCredentials() method.
        $qry = Staff::where([
            ['email','=',$credentials['email']],
            ['pass','=',$credentials['password']]
        ]);

        if($qry->count() >0)
        {
            $user = $qry->select('id', 'name', 'email', 'phone', 'cmnd','adress','type_id', 'pass')->first();
            return $user;
        }
        return null;


    }

    /**
     * Validate a user against the given credentials.
     *
     * @param  \Illuminate\Contracts\Auth\Authenticatable $user
     * @param  array $credentials
     * @return bool
     */
    public function validateCredentials(Authenticatable $user, array $credentials)
    {
        // TODO: Implement validateCredentials() method.
        // we'll assume if a user was retrieved, it's good

        if($user->email == $credentials['email'] && $user->pass == $credentials['password'])
        {
            return true;
        }
        return false;


    }
}
