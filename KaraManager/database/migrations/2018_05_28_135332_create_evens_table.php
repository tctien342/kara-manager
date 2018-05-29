<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEvensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('evens', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('staff_id')->unsigned();
            $table->integer('number')->default(1);
            $table->integer('prod_id')->unsigned();
            $table->integer('bill_id')->unsigned();
            $table->timestamps();

            //Foreign
            $table->foreign('staff_id')->references('id')->on('staff');
            $table->foreign('prod_id')->references('id')->on('products');
            $table->foreign('bill_id')->references('id')->on('bills');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('evens');
    }
}
