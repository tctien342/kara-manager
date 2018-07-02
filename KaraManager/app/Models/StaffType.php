<?php

namespace KaraManager\Models;

use Illuminate\Database\Eloquent\Model;

class StaffType extends Model
{
    protected $table = 'staff_types';
    protected $primaryKey = 'id';
    protected $hidden = ['created_at', 'updated_at'];
    protected $fillable = ['salary','name','active'];

    public function staffs(){
        return $this->hasMany('KaraManager\Models\Staff','type_id','id');
    }
}
