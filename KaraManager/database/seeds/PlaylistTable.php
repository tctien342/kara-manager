<?php

use Illuminate\Database\Seeder;

class PlaylistTable extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('playlist')->insert([
            ['title'=>'Kho cổ tích','tube_id'=>'PL1elwYsEkdxmihLCWw4YwGMOzRXF3nSEN','type'=>'enjoy'],
            ['title'=>'Truyện ngụ ngôn','tube_id'=>'PL1elwYsEkdxlquZNr6tNw6I-xw-IumDCY','type'=>'enjoy'],
            ['title'=>'Truyện đạo đức','tube_id'=>'PL1elwYsEkdxlXiOYVic0NdpSVeom0JqQu','type'=>'study'],
            ['title'=>'Truyện hiện đại','tube_id'=>'PL1elwYsEkdxkmiB63GzWLSm3jRpsS8e68','type'=>'enjoy'],
            ['title'=>'Vườn âm nhạc','tube_id'=>'PL1elwYsEkdxl3ChlmvAAEf7ems30aNnLl','type'=>'music'],
            ['title'=>'English story','tube_id'=>'PL1elwYsEkdxlk6VPAR1r9KFdG0g3rcxUA','type'=>'study'],
            ['title'=>'Dạy con ngoan','tube_id'=>'PL1elwYsEkdxnk0Lffdc3wh3ut3nrr19VU','type'=>'study'],
            ['title'=>'Học mẫu giáo','tube_id'=>'PL1elwYsEkdxkvxqZxOnK45qVICfXFqHaP','type'=>'study']
        ]);
    }
}
