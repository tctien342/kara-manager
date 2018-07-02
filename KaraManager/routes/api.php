<?php

use Illuminate\Http\Request;
use Carbon\Carbon;
//Controller
use App\Http\Controllers\Common;
///
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Default API
//API LOGIN
Route::post('auth/login', 'UserController@login_v2');
Route::post('reg', 'UserController@createUserWithEmail');
Route::post('forgot','UserController@userForgotPassword');
//API RENEWTOKEN
//Route::middleware('jwt.refresh')->post('/user-renew','UserController@getUserInfo');	BUGGING

Route::group(['middleware' => 'jwt.auth'], function () {
	Route::get('ds_room','DataProcess@get_ds_phong');
	Route::get('ds_active_bill','DataProcess@get_ds_bill');
	Route::get('ds_empty_room','DataProcess@get_empty_room');
	Route::get('get_time_prod','DataProcess@get_time_prod');
	Route::post('post_make_bill','DataProcess@post_make_bill');
	Route::get('get_all_prod','DataProcess@get_all_prod');
	Route::get('get_room','DataProcess@get_room');
	Route::get('get_bill','DataProcess@get_bill');
	Route::post('post_edit_even','DataProcess@post_edit_even');
	Route::post('post_add_even','DataProcess@post_add_even');
	Route::post('post_paid_bill','DataProcess@post_paid_bill');
	Route::post('post_add_prod','DataProcess@post_add_prod');
	Route::post('post_edit_prod','DataProcess@post_edit_prod');
});
//PUBLIC API
Route::get('statistical','WebController@productStatistical');
//API LOGOUT
Route::get('logout','WebController@logout');
