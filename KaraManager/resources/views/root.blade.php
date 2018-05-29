<?php $host  = $_SERVER['HTTP_HOST'] ?>
<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>{{ config('app.name') }}</title>
        <link rel="icon" href="http://<?php echo($host)?>/Images/logo.png" type="image/png">
        <link href="{{ mix('css/app.css') }}" rel="stylesheet" type="text/css">
        <link
            href="http://<?php echo($host)?>/css/fontawesome-all.min.css"
            rel="stylesheet"
            type="text/css">
        <link
            href="https://fonts.googleapis.com/css?family=Baloo+Tamma"
            rel="stylesheet">
    </head>
    <body>
        <div id="root"></div>
        <script>
            window.token = "<?php if(isset($token)) echo($token);else echo('');?>";
        </script>
        <script src="{{ mix('js/app.js') }}"></script>
    </body>
</html>