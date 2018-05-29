<?php

namespace KaraManager\Models;

use Illuminate\Database\Eloquent\Model;

class Even extends Model
{
    protected $table = 'evens';
    protected $primaryKey = 'id';
    protected $hidden = ['updated_at','created_at'];
    protected $fillable = ['staff_id','number','prod_id','bill_id'];

    public function staff(){
        return $this->belongsTo('KaraManager\Models\Staff','staff_id', 'id');
    }

    public function prod(){
        return $this->hasOne('KaraManager\Models\Product','id','prod_id');
    }

    public function bill(){
        return $this->belongsTo('KaraManager\Models\Bill','bill_id', 'id');
    }

}
