{{ csrf_field() }}
<?php
session_start(); 
if (isset($_SESSION['LOGGED'])) {
    header('Location: api/documentation');
    exit;
}
if (isset($_POST['username']) && isset($_POST['password'])) {
	if (isset($_SESSION['COUNT'])) {
		$_SESSION['COUNT'] = $_SESSION['COUNT'] + 1;
	}else{
		$_SESSION['COUNT'] = 1;
	}
	if ($_SESSION['COUNT'] > 5) {
		echo "Đăng nhập quá nhiều lần!";
	    exit;
	}
    if ($_POST['username'] == 'admin' && $_POST['password'] == 'terrabook@2018') {
        $_SESSION['LOGGED'] = 1;
        header('Location: api/documentation');
        exit;
    }
}
?>
<style type="text/css">
    .box{
        box-shadow: 0px 0px 10px rgba(0,0,0,0.3);
        width: min-content;
        border-radius: 4px;
        padding: 20px;
        padding-left: 50px;
        padding-right: 50px;
        background: rgba(255,255,255,0.8);
    }
    .button{
        margin-top: 25px;
        width: 70%;
        background: white;
    }
    .button:hover{
        opacity: 0.5;
    }
    input{
        width: 200px;
        border-radius: 4px;
        border: none;
        box-shadow: 0px 0px 2px;
        height: 30px;
        padding-left: 5px;
        margin: 5px;
    }
    p{
        font-size: 20;
        opacity: 0.7;
    }
    .center{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
    body{
    margin:0;
      background: #136a8a;  /* fallback for old browsers */
      background: -webkit-linear-gradient(to right, #267871, #136a8a);  /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(to right, #267871, #136a8a); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }
</style>
<div style='width: 100%; height: 100%;'>
<center class=center >
    <form class=box name='login' method="post" action='doc'>
        <center><p><b>KALEYA</b>documentation</p></center>
        <table>
            <input type="hidden" name="_token" value="{{ csrf_token() }}" >
            <tr>
                <td><input name='username' type="text" placeholder="Admin ID"/></td>
            </tr>
            <tr>
                <td><input name='password' type="password" placeholder="Admin Password"/></td>
            </tr>
            <tr>
                <td><center><input class=button name='Login' value='Login' type="submit" /></center></td>
            </tr>
        </table>
    </form>
</center>
</div>