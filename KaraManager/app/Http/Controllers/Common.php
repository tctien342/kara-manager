<?php

namespace KaraManager\Http\Controllers;

use Config;
use Illuminate\Support\Facades\Storage;

class Common
{
    static function makeResponse($error,$data,$message){
    	return (object)[
    		'error_code' => Config::get('system.ReCode.'.$error),
    		'message' => $message,
    		'data' => (object)$data,
    	];
	}
	
	static function base64_to_jpeg($base64_string, $output_file) {
		// open the output file for writing
		$ifp = fopen( $output_file, 'wb' ); 
	
		// split the string on commas
		// $data[ 0 ] == "data:image/png;base64"
		// $data[ 1 ] == <actual base64 string>
		$data = explode( ',', $base64_string );
	
		// we could add validation here with ensuring count( $data ) > 1
		fwrite( $ifp, base64_decode( $data[ 1 ] ) );
	
		// clean up the file resource
		fclose( $ifp ); 
	
		return $output_file; 
	}

	static function storeFile($where,$file){
		Storage::put('data/'+$where, $file);
		return Storage::url($where);
	}

	static function getFile($name){
		return Storage::get('data/'+$name);
	}

	static function password_generator($mail, $pass){
		$md5_e = md5($mail);
		$md5_p = md5($pass);
		return strrev($md5_e).$md5_p;
	}
}
