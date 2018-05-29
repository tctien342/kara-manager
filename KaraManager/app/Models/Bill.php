<?php

namespace KaraManager\Models;

use Illuminate\Database\Eloquent\Model;

class Bill extends Model
{
    protected $table = 'bills';
    protected $primaryKey = 'id';
    protected $hidden = ['updated_at'];
    protected $fillable = ['value','staff_id','room_id','state','paid_at','created_at'];

    public function room(){
        return $this->hasOne('KaraManager\Models\Room','id','room_id');
    }

    public function evens(){
        return $this->hasMany('KaraManager\Models\Even','bill_id','id');
    }

    public function staff(){
        return $this->belongsTo('KaraManager\Models\Staff','staff_id', 'id');
    }
}
