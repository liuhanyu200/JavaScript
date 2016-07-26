<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>封装sql</title>
	<style>
		.head{
			width:500px;
		}
		.show{
			width:500px;
			overflow:hidden;
			border:2px solid #ccc;
			background:#eee;
		}
	</style>
</head>
<body>
	<div class="show">
		<?php
		// open
			class MyDB extends SQLite3
			{
			    function __construct()
			    {
			        $this->open('./application/sql/test.sql');
			    }
			}

		// new
			$db = new MyDB();

		// get
			$result = $db->query('select * from test1');

	    // out
			while ($row = $results->fetchArray()) {
			    // var_dump($row);
			    echo "username: ".$row['username']."\n";
			    echo "password: ".$row['password'];
			}
		?>
	</div>
</body>
</html>