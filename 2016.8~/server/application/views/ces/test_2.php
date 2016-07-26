<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>test_2</title>
	<style>
		.eve{
			width:800px;
			display:block;
			background:#ccc;
			border-radius:5px;
			padding:2px;
			float:left;
			overflow: hidden;
		}
	</style>
</head>
<body>
	<form action="/server/index.php/lhy/index" method="post">
		<input type="text" name="info">
		<input type="submit" value="submit">
	</form>
	<h3>hello</h3>
	<h2><?php echo $data1;?></h2>
	<h2><?php echo $info;?></h2>
	<span class="eve"><?php echo $show;?></span>
</body>
</html>