<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sqlite_model extends CI_Model
{
	
	function __construct()
	{
		// 初始化
		parent::__construct();
		// 载入sqlite类
		$this->load->library('sqlite');
	}

	// 建表
	public function sqlite_test()
	{
		// $this->load->library('sqlite');
	    $db = new sqlite();
	    // if not exists -> from stackoverflow
	    $sql = 'create table if not exists table1(id integer primary key,name text)';
	    $ret = $db->exec($sql);
	    $db->close();
	    return $ret;
	}

	// 添加
	public function _insert($name)
	{
		$db = new sqlite();
		$sql =<<<EOF
		insert into table1(name) values('$name');
EOF;
		$ret = $db->exec($sql);
		$db->close();
		return $ret;
	}

	// 输出
	public function _show()
	{
		$db = new sqlite();
		$sql = 'select * from table1';
		$ret = $db->query($sql);
   		// while($row = $ret->fetchArray(SQLITE3_ASSOC) ){
   		// echo $row['name']."\n";
		//}
         while ($row = $ret->fetchArray()) {
		   echo $row['name']."\n";
		}
		// return $ret;
		$db->close();
	}

	// 删除
	public function _delete($delname)
	{
		$db = new sqlite();
		$sql =<<<EOF
		delete from table1 where name=$delname;
EOF;
	}
}