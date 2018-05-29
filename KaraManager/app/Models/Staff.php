<?php

namespace KaraManager\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Staff extends Model implements Authenticatable,JWTSubject
{
    protected $table = 'staff';
    protected $primaryKey = 'id';
    protected $hidden = ['updated_at','remember_token','pass'];
    protected $fillable = ['name','email','phone','cmnd','adress', 'type_id', 'created_at'];

    public function type(){
        return $this->belongsTo('KaraManager\Models\StaffType','type_id', 'id');
    }

    public function bills(){
        return $this->hasMany('KaraManager\Models\Bill','staff_id','id');
    }

    public function evens(){
        return $this->hasMany('KaraManager\Models\Even','staff_id','id');
    }

    /**
     * @return string
     */
    public function getAuthIdentifierName()
    {
        return $this->email;
    }

    /**
     * @return mixed
     */
    public function getAuthIdentifier()
    {
        // Return the unique identifier for the user (e.g. their ID, 123)
        return $this->id;
    }

    /**
     * @return string
     */
    public function getAuthPassword()
    {
        // Returns the (hashed) password for the user
        return $this->pass;
    }

    /**
     * @return string
     */
    public function getRememberToken()
    {
        // Return the token used for the "remember me" functionality
        return $this->remember_token;
    }

    /**
     * @param  string  $value
     * @return void
     */
    public function setRememberToken($value)
    {
        // Store a new token user for the "remember me" functionality
        $this->remember_token = $value;
        $this->save();
        return true;
    }

    /**
     * @return string
     */
    public function getRememberTokenName()
    {
        // Return the name of the column / attribute used to store the "remember me" token
        return $this->email;
    }

    // Rest omitted for brevity

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->id;
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [
            'id'=>$this->id,
            'user_name'=>$this->email
        ];
    }

}
