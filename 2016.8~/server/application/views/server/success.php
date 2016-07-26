<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>ces</title>
	<link rel="stylesheet" type="text/css" href="/server/style/main.css">
</head>
<body>
	<?php
	    var_dump($_SESSION);
	    var_dump($_COOKIE);
	?>
<div class="pre">
	欢迎您！
	<span>
	<?php 
		$this->load->library('session');
		if($this->session->userdata('username'))
		{
			echo $this->session->userdata('username');
			// session_start();
			// echo session_encode();
		}
	?>
	</span><br><br>
	<a href="/server/index.php/login/logout?a=1">注销</a>
</div>
<div class="select">
	<?php $this->load->library('sqlite');    	
		  $db = new Sqlite();
    	  $sql = 'select * from user';
    	  $result = $db->query($sql);
    ?>
	<?php while($row = $result->fetchArray(SQLITE3_ASSOC)){?>
	<span id="box" class="box"><?php
		echo "ID: ".$row['id'].'<br>';
		echo "usr:".$row['username'].'<br>';
		echo "psw:".$row['password'].'<br>';
		?>
		<a id="delete" href="/server/index.php/login/del?username=<?php echo $row['username'];?>">
			删除
		</a>
	</span>
	<?php }?>
</div>
<script src="/server/js/main.js"></script>
</body>
</html>