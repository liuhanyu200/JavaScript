<!DOCTYPE html>
<html lang="en">
<?php
// header("Location: http://www.example.com/");
?>
<head>
	<meta charset="UTF-8">
	<title>login page</title>
	<link rel="stylesheet" href="/server/style/main.css">

	<?php
	    // session_start();
	    $t=time();
	    $_SESSION['conn_id']=$t;
	    $_SESSION['conn']=$t;
	    var_dump($_SESSION);
	    var_dump($_COOKIE);
	?>

</head>
<body>
	<div class="state">
		<span id="txtHint">
		</span>
	</div>
	<div class="login">
		<form action="/server/index.php/login/user_login" method="get">
			<input type="text" value="<?php if(isset($usr)) {echo $usr;}?>" id="username_login" name="username" placeholder="请输入用户名" required />
			<input type="password" value="<?php if(isset($psw)) {echo $psw;}?>" id="password_login" name="password" placeholder="请输入密码" required />
			<input type="hidden" id="hidden" name="hidden" value="<?php echo $_SESSION['conn_id'];?>">
			<input type="submit" id="reg" value="登&nbsp;陆">
		</form>
	</div>
	<div id="turn">没有账号？<a href="/server/index.php/login/turn_to_register">注册</a>一个？</div>
<script src="/server/js/main.js"></script>
</body>
</html>