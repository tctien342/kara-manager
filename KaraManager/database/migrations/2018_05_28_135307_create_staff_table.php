<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStaffTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('staff', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('cmnd')->nullable();
            $table->string('adress')->nullable();
            $table->string('pass')->default('123456');
            $table->integer('type_id')->unsigned();
            $table->string('remember_token')->nullable();
            $table->timestamps();

            //Foreign
            $table->foreign('type_id')->references('id')->on('staff_types');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('staff');
    }
}
