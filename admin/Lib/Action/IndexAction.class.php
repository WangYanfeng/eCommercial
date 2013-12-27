<?php
// 2013.12.15
class IndexAction extends Action {
	function index(){
    	$this->display('login');
    }

    function login(){
    	$user=I('userName');
        $pwd= md5(I('password'));
        $DBadmin = D('admin');
        $res = $DBadmin->where("userName='".$user."' AND password='".$pwd."'")->find();
        if($res){
            session('admin', array('id' =>$res["id"],'admin_name' => $user));
            echo "success";
        }       
        else{
            echo "";
        }
    }

    function logout(){
        session(null);
        $this->success('退出成功，返回首页','__APP__');
    }
}