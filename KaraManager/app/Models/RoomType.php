<?php

namespace KaraManager\Models;

use Illuminate\Database\Eloquent\Model;

class RoomType extends Model
{
    protected $table = 'room_types';
    protected $primaryKey = 'id';
    protected $hidden = ['updated_at','created_at'];
    protected $fillable = ['name','ratio'];

    public function rooms(){
        return $this->hasMany('KaraManager\Models\Room','type_id','id');
    }
}
