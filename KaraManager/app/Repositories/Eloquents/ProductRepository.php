<?php
// app/Repositories/Eloquents/ProductRepository.php

namespace KaraManager\Repositories\Eloquents;
use KaraManager\Models\Even;
use KaraManager\Models\Product;
use KaraManager\Repositories\Contracts\ProductRepositoryInterface;

class ProductRepository implements ProductRepositoryInterface
{
    //function find item exist in array or not(if not return -1 else return item position)
    public function findArray($array,$item){
        for ($i=0;$i<count($array);$i++){
            if($array[$i]==$item)
                return $i;
        }
        return -1;
    }
    //function find name from id prod
    public function findNameProd($id){
        return Product::where('id',$id)->first()->name;
    }
    //function find count from id prod
    public function findCountProd($id){
        return Product::where('id',$id)->first()->count;
    }
    //function find value from id prod
    public function findValueProd($id){
        return Product::where('id',$id)->first()->value;
    }
    //function find prod from array even
    public function findProdFromEven($even){
        $product_id = array();
        $product_count=array();
        $result = array();
        if (count($even)==0)
            return $result;
        else{
            for($i=0;$i<count($even);$i++){
                $product = $even[$i]->prod;
                if(!$product->is_time==1){
                    $id_temp=$this->findArray($product_id,$product->id);
                    if($id_temp!=-1){
                        $product_count[$id_temp]++;
                    }
                    else{
                        array_push($product_id,$product->id);
                        array_push($product_count,1);
                    }
                } 
            }
        }
        for ($i=0;$i<count($product_id);$i++){
            $id = $product_id[$i];
            $item = (object)['id'=>$id,
                            'name'=>$this->findNameProd($id),
                            'stock'=>$this->findCountProd($id),
                            'count'=>$product_count[$i],
                            'value'=>$this->findValueProd($id)*$product_count[$i]
                            ];
            array_push($result,$item);
        }
        return $result;
    }
    //function find even in date exactly
    public function findOneDay($time){
        $even = Even::whereDate('created_at','=',$time)->get();
        return $this->findProdFromEven($even);
    }
    //function find all even from date
    public function findFromDay($time){
        $even = Even::whereDate('created_at','>=',$time)->get();
        return $this->findProdFromEven($even);
    }
    //function find from date to date
    public function findFromToDay($time_start,$time_end){
        $even = Even::whereDate('created_at','>=',$time_start)
                    ->whereDate('created_at','<=',$time_end)
                    ->get();
        return $this->findProdFromEven($even);
    }
} 
?>