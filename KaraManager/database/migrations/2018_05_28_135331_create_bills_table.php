<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBillsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bills', function (Blueprint $table) {
            $table->increments('id');
            $table->bigInteger('value')->default(0);
            $table->integer('staff_id')->unsigned();
            $table->integer('room_id')->unsigned();
            $table->integer('state')->default(0);
            $table->timestamps('paid_at')->nullable();
            $table->timestamps();

             //Foreign
             $table->foreign('staff_id')->references('id')->on('staff');
             $table->foreign('room_id')->references('id')->on('room');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bills');
    }
}
