<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Login extends CI_Controller {

	function __construct()
	{
		parent::__construct();
		$this->load->model('server/server_mod');
		$this->load->helper('url');
	}

	public function index()
	{
		// 跳转怎么写
		if($username = $this->session->userdata('username')) {
			// 系统检测到您已经登陆
			$this->load_success();
		} else {
			$this->load_login();
		}

	}

	public function set_session($username)
	{	
		$array1 = array("username" => $username);
		$this->session->set_userdata($array1);
	}

	// 加载页面之前的逻辑
	public function check_session()
	{
		if($this->session->userdata('username'))
			{return TRUE;}
		else
			{return FALSE;}
	}

	// 加载成功页面
	public function load_success()
	{
		if($this->check_session())
			{
				// $this->load->view('server/echo_session');
				$this->load->view('server/success');
			}
		else
			{
				// $this->load->view('server/echo_session');
				$this->load->view('server/login_view');
			}
	}
	// 加载登陆界面
	public function load_login()
	{
		if($this->check_session())
			{
				// $this->load->view('server/echo_session');
				$this->load->view('server/success');
			}
		else
			{
				// $this->load->view('server/echo_session');
				$this->load->view('server/login_view');
			}
	}


	// 注册
	public function register()
	{	
		$username = $this->input->get('username');
		$password = $this->input->get('password');
		$this->server_mod->user_register($username,$password);// 注册
		// $this->load->view('server/register_success');
		$this->load_login();
		redirect('/login/turn_to_login');
	}

	// 登陆
	public function user_login()
	{
		$username = $this->input->get('username');
		$password = $this->input->get('password');
		$data['hide'] = $this->input->get('hidden');

		if ($this->server_mod->login_check($username,$password)) {
			$this->set_session($username); // 添加session
			$this->load_success(); // 跳转到成功页面
			redirect('/login/turn_to_login');
		} else {
			// 加载反馈信息
			$data['usr'] = $username;
			$data['psw'] = ''; 
			$this->load->view('server/login_view',$data);
		}

	}

	// 注销
	public function logout()
	{
		$this->session->unset_userdata('username');
		$this->turn_to_login();
		redirect('/login/turn_to_login');
	}

	// 删除
	public function del()
	{
		// $this->load->view('server/success');
		// echo "username=".$_GET['username'];
		$this->server_mod->delete_by_username($_GET['username']);
		// $this->load->view('succ_del');
		$this->load->view('server/del_succ');
		$this->load_success();
	}
	// 检测用户是否存在
	public function check_user()
	{
		$result = $this->server_mod->check_username($_GET['q']);
		echo $result;
	}

	public function login_success()
	{
		$this->load_success();
	}
	// public function
	public function turn_to_login()
	{
		$this->load_login();
	}
	public function turn_to_register()
	{
		$this->load->view('server/register_view');
	}
	public function test_jq()
	{
		$this->load->view('test/demo.html');
	}
}