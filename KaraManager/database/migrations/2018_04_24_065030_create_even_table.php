<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEvenTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('even', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('number')->default(1);
            $table->integer('user_id')->unsigned();
            $table->integer('item_id')->unsigned();
            $table->integer('bill_id')->unsigned();
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('staff');
            $table->foreign('item_id')->references('id')->on('item');
            $table->foreign('bill_id')->references('id')->on('bill');
        });
    }

    /**
     * Reverse the migrations.
     * @return void
     *
     */
    public function down()
    {
        Schema::dropIfExists('even');
    }
}
