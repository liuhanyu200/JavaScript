<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Server_mod extends CI_Model {

    public function __construct()
    {
        parent::__construct();
        $this->load->library('sqlite');
        $this->load->library('session');
    }

    public function index()
    {
    	$db = new Sqlite();
    	$sql = 'create table if not exists user(id integer primary key,username text,password text)';
    	$result = $db->exec($sql);
    	$db->close();
    }

    public function user_register($username,$password)
    {
    	$db = new Sqlite();
    	$sql_sel =<<<EOF
			select * from user where username='$username';
EOF;
		$ret = $db->query($sql_sel);
    	
    	if( ! ($row = $ret->fetchArray(SQLITE3_ASSOC)))/*用户不存在*/
    	{
    		// 注册
    		$sql =<<<EOF
    		insert into user(username,password) values('$username','$password');
EOF;
			$db->exec($sql);
			// $array1 = array("username" => $username);
			// $this->session->set_userdata($array1);    	
        }
    	else
    	{
    		$this->load->view('server/fail');
    		return false;
    	}
    }

    public function show_info()
    {
    	$db = new Sqlite();
    	$sql = 'select * from user';
    	$result = $db->query($sql);
    	$db->close();
    	return $result;
    }

    public function delete_by_username($username)
    {
    	$db = new Sqlite();
    	$sql =<<<EOF
		delete from user where username='$username'
EOF;
		$db->exec($sql);
		$db->close();
    }

    public function check_username($username)
    {
    	$db = new Sqlite();
    	$sql_sel =<<<EOF
			select * from user where username='$username';
EOF;
		$ret = $db->query($sql_sel);
    	if( ! ($row = $ret->fetchArray(SQLITE3_ASSOC)))
    	{
            // 存储用户名
            // $array1 = array("username" => $username);
            // $this->session->set_userdata($array1);
    		return 1;
    	}
    	else
    	{
    		return 0;
    	}
    	$db->close();
    }

    // login check 
    public function login_check($username,$password)
    {
        // 取出单个密码
        $db = new Sqlite();
        $sql = <<<EOF
            select password from user where username='$username';
EOF;
        $ret = $db->query($sql);
        $row = $ret->fetchArray(SQLITE3_ASSOC);
        if($row['password'] === $password) {
        // 将用户名存入session
        // $array1 = array("username" => $username);
        // $this->session->set_userdata($array1);
            return TRUE;
        } else {
            return FALSE;
        }
    }

}