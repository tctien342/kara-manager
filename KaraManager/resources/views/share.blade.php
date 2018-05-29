<?php $host  = $_SERVER['HTTP_HOST'] ?>
<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>{{ config('app.name') }}</title>
        <link rel="icon" href="http://<?php echo($host)?>/Images/icon.png" type="image/png">
        <meta property="og:url"                content="terrabook.vn/watch/{{ $id }}" />
        <meta property="og:type"               content="product" />
        <meta property="og:title"              content="{{ $title }}" />
        <meta property="og:description"        content="TerrabookVN" />
        <meta property="og:image"              content="{{ $image }}" />
        <meta property="fb:app_id"             content="500558836766092" />
    </head>
    <style>
        #root,body,html{
            height: 100%;
        }
        #root{
            display: flex;
            justify-content: center;
            align-items: center;
        }
        h1{
            opacity: 0.6;
            font-family: "Arial", Arial, Sans-serif;
        }
    </style>
    <body>
        <div id="root">
            <h1>Terrabook VN</h1>
        </div>
    </body>
</html>