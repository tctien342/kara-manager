<?php

namespace KaraManager\Models;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    protected $table = 'rooms';
    protected $primaryKey = 'id';
    protected $hidden = ['updated_at','created_at'];
    protected $fillable = ['name','type_id', 'state','active'];

    public function type(){
        return $this->belongsTo('KaraManager\Models\RoomType','type_id', 'id');
    }

    public function bills(){
        return $this->hasMany('KaraManager\Models\Bill','room_id','id');
    }

}
