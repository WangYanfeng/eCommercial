<?php
/**
* 
*/
class LogisticsAdminAction extends BaseAction
{
	function index(){
		$DBlogistics=M('logisticsnet');
		$logistics_array=$DBlogistics->getField('loginet_id,loginet_name,loginet_range,loginet_servers');
		$this->assign('logistics_array',$logistics_array);
		$this->display();
	}

	// 查看文章的内容
	function get_logistics(){
		$DBlogistics=M('logisticsnet');
		$res=$DBlogistics->where("loginet_id='".$_REQUEST['loginet_id']."'")->find();
		$this->assign('logistics',$res);
		
		$this->display();
	}

	function editlogistics(){
		if ($this->isPost()) {
			$aid=$_POST['id'];
			$data[loginet_name]=$_POST['name'];
			$data[loginet_range]=$_POST['range'];
			$data[loginet_servers]=$_POST['servers'];
			$DBlogistics=M('logisticsnet');
			$res=$DBlogistics->where("loginet_id='".$aid."'")->save($data);
			if($res){
				$this->success('更新成功','?m=LogisticsAdmin&a=index');
			}
			else{
				$this->error('编辑失败，请重试');
			}
		}else{
			$aid=I('loginet_id');
			$DBlogistics=M('logisticsnet');
			$logistics=$DBlogistics->where("loginet_id='".$aid."'")->find();
			$this->assign('logistics',$logistics);
			$this->display();
		}
	}

	function dellogistics(){
		$aid=I('loginet_id');
		$DBlogistics=M('logisticsnet');
		$res=$DBlogistics->where("loginet_id='".$aid."'")->delete();
		if($res){
			$this->success('删除成功','?m=LogisticsAdmin&a=index');
		}else{
			$this->error('删除失败，请重试！');
		}
	}

	function logisticsimport(){
		if($this->isPost()){
			$data['loginet_name']=$_POST['name'];
			$data['loginet_range']=$_POST['range'];
			$data['loginet_servers']=$_POST['servers'];
			$DBlogistics=M('logisticsnet');
			$res=$DBlogistics->add($data);
			if ($res) {
				$this->success('添加成功','?m=LogisticsAdmin&a=index');
			}else{
				$this->error('添加失败');
			}
		}else{
			$this->display();
		}
	}

	function logisticsexport(){
		$this->show('<style type="text/css">*{ padding: 0; margin: 0; } div{ padding: 4px 48px;} body{ background: #fff; font-family: "微软雅黑"; color: #333;} h1{ font-size: 100px; font-weight: normal; margin-bottom: 12px; } p{ line-height: 1.8em; font-size: 36px }</style><div style="padding: 24px 48px;"> <h1>:)</h1><p>欢迎使用 <b>ThinkPHP</b>！</p></div><script type="text/javascript" src="http://tajs.qq.com/stats?sId=9347272" charset="UTF-8"></script>','utf-8');
		$this->display();
	}
}