<?php


	class SystemAdminAction extends BaseAction
{
	// 查看所有房间的信息
	function shop(){
		$DBvenders=M('venders');
		$res=$DBvenders->select();
		$this->assign('array',$res); 
		$this->display();  
        //dump($list); 

	}
	function del_shop(){
        $shopid = $_GET['id'];
        $DBvenders = M('venders');
        $res = $DBvenders->where("vender_id='" . $shopid . "'")->delete();
        if ($res) {
            $this->success('删除成功！', '__URL__/shop');
        } else {
            $this->error('删除失败！', '__URL__/shop');
        }
	}

	function conf(){}
	function dbcopy(){}
	function optimie(){}
}