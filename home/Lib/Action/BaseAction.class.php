<?php
/**
* 权限认证
*/
class BaseAction extends Action
{
	
	function _initialize()
	{
		$this->checklogin();
	}
	function checklogin(){
		if ((!isset($_SESSION['vender']) || !$_SESSION['vender'])) {
			$this->error("没有登录", '?m=Index&a=index');
		}
		
	}
}
?>