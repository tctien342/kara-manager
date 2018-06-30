<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
use App\Mail\AuthorizationMail;

Route::get('','WebController@login');
Route::any('/doc', function () {
    return view('docs');
});
Route::get('main','WebController@main');
Route::get('redirect/{token}','WebController@redirect');