<?php

namespace KaraManager\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'products';
    protected $primaryKey = 'id';
    protected $hidden = ['updated_at','created_at'];
    protected $fillable = ['name','value','count', 'is_time', 'active'];

    public function even(){
        return $this->hasMany('KaraManager\Models\Even','prod_id','id');
    }
}
