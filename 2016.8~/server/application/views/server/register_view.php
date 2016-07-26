<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>register page</title>
	<link rel="stylesheet" href="/server/style/main.css">
</head>
<body>
	<div class="state">
		<span id="txtHint">
		</span>
	</div>
	<div class="login">
		<form action="/server/index.php/login/register" method="get">
			<input type="text" value="" id="username_register" name="username" placeholder="请输入用户名" required />
			<input type="password" value="" id="password_register" name="password" placeholder="请输入密码" required />
			<input type="submit" id="reg" value="注&nbsp;册">
		</form>
	</div>
	<div id="turn">已有账号？<a href="/server/index.php/login/turn_to_login">登陆</a></div>
<script src="/server/js/main.js"></script>
</body>
</html>