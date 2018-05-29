<?php

namespace KaraManager\Http\Controllers;

use Illuminate\Http\Request;
use JWTAuth;
use JWTFactory;
use JWTAuthException;
use Carbon\Carbon;
use KaraManager\Models\Room;
use KaraManager\Models\Bill;
use KaraManager\Models\Product;
use KaraManager\Models\Even;
use KaraManager\Http\Controllers\Common;

class DataProcess extends Controller
{
    public function get_ds_phong(){
        return response()->json(Common::makeResponse('SUCCESS',Room::all(),'DS ROOM'));
    }

    public function get_ds_bill(){
        $bills = Bill::where('state', 0)->get();
        foreach ($bills as $key => $value) {
           $value->room;
           $value->room->type;
           $value->staff;
           $value->evens;
           foreach($value->evens as $key2 => $value2){
                $value2->prod;
           }
        }
        return response()->json(Common::makeResponse('SUCCESS',$bills,'DS active Bill'));
    }

    public function get_empty_room(){
        $rooms = Room::where('state', 0)->get();
        foreach ($rooms as $key => $value) {
            $value->type;
        }
        return response()->json(Common::makeResponse('SUCCESS',$rooms,'DS empty room'));
    }

    public function get_time_prod(){
        return response()->json(Common::makeResponse('SUCCESS',Product::where('is_time',1)->get(),'DS time prods'));
    }

    public function post_make_bill(Request $request){
        $data = json_decode($request->getContent());
        if ($bill = Bill::where([
            ['room_id',$data->room_id],
            ['state',0]
        ])->first()) return response()->json(Common::makeResponse('ERROR',$bill,'Room has created'));
        $user_id = JWTAuth::parseToken()->getPayload()['id'];
        $bill = new Bill;
        $bill->staff_id = $user_id;
        $bill->room_id = $data->room_id;
        $bill->state = 0;
        $bill->value = 0;
        $bill->save();
        $time_pack = new Even;
        $time_pack->staff_id = $user_id;
        $time_pack->prod_id = $data->time_id;
        $time_pack->bill_id = $bill->id;
        $time_pack->save();
        $bill->evens;
        $room = Room::where('id', $data->room_id)->first();
        $room->state = 1;
        $room->save();
        return response()->json(Common::makeResponse('SUCCESS',$bill,'Room created'));
    }

    public function get_all_prod(){
        return response()->json(Common::makeResponse('SUCCESS',Product::where('is_time',0)->get(),'DS prods'));
    }

    public function post_edit_even(Request $request){
        $data = json_decode($request->getContent());
        if ($even = Even::where('id', $data->even_id)->first()){
            $prod = Product::where('id',$even->prod_id)->first();
            if ($prod->count + ( $even->number - $data->number) < 1){
                return response()->json(Common::makeResponse('ERROR',$prod ,'Prod limited'));
            }
            $prod->count = $prod->count + ( $even->number - $data->number);
            $prod->save();
            if ($data->number < 1){
                $even->delete();
                return response()->json(Common::makeResponse('SUCCESS',[],'Delete even complete'));
            }
            $even->number = $data->number;
            $even->save();
            return response()->json(Common::makeResponse('SUCCESS',$even,'Update even complete'));
        }
        return response()->json(Common::makeResponse('ERROR',[],'Unknow even'));
    }

    public function post_add_even(Request $request){
        $data = json_decode($request->getContent());
        $prod = Product::where('id',$data->prod_id)->first();
        if ($prod->count < $data->number){
            return response()->json(Common::makeResponse('ERROR',$prod ,'Prod limited'));
        }
        $prod->count = $prod->count - $data->number;
        $prod->save();
        if ($even = Even::where([
            ['bill_id', $data->bill_id],
            ['prod_id', $data->prod_id]
        ])->first()){
            $even->number = $even->number + $data->number;
            $even->save();
            return response()->json(Common::makeResponse('SUCCESS',$even ,'Add prod to room'));
        }
        $user_id = JWTAuth::parseToken()->getPayload()['id'];
        $even = new Even;
        $even->staff_id = $user_id;
        $even->number = $data->number;
        $even->prod_id = $data->prod_id;
        $even->bill_id = $data->bill_id;
        $even->save();
        return response()->json(Common::makeResponse('SUCCESS',$even ,'Add prod to room'));
    }

    public function get_room(Request $request){
        return response()->json(Common::makeResponse('SUCCESS',Room::where('id', $request->input('room_id'))->first(),'Get room info'));
    }
    public function get_bill(Request $request){
        $bill = Bill::where('id',$request->input('bill_id'))->first();
        $bill->room;
        $bill->room->type;
        $bill->staff;
        $bill->evens;
        foreach($bill->evens as $key2 => $value2){
            $value2->prod;
        }
        return response()->json(Common::makeResponse('SUCCESS',$bill ,'Get bill info'));
    }

    public function post_paid_bill(Request $request){
        $data = json_decode($request->getContent());
        $bill = Bill::where('id',$data->bill_id)->first();
        $bill->value = $data->value;
        $bill->state = 1;
        $bill->room;
        $bill->paid_at = Carbon::now();
        $bill->room->state = 0;
        $bill->room->save();
        $bill->save();
        return response()->json(Common::makeResponse('SUCCESS',$bill ,'Room paid'));
    }
}
