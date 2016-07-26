<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class User_info_model extends CI_Model {

	// 初始化CI模型
	public function __construct()
	{
	    parent::__construct();
	    $this->load->library('sqlite');
	    $this->load->library('session');
	}

	public function create_userinfo()
	{
		$db = new Sqlite();
		$sql = <<<EOF
			create table if not exist userinfo(
				oid integer primary key,
				username text,
				age text,
				occupation text,
				sex text
			);
EOF;
		$db->exec($sql);
	}

	public function get_username()
	{
		$username = $this->session->userdata('username');
		return $username;
	}

	// 如何做到动态的只修改其中某几个值，像Java那样
	public function update_userinfo($username,$age,$occupation,$sex)
	{
		$sql = <<<EOF
			update userinfo set age=$age,occupation=$occupation,sex=$sex where username=$username;
EOF;
	}
}