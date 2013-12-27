<?php
/**
* 
*/
class UserAdminAction extends BaseAction
{
	function index(){
		$this->display();
	}
	function userinfo(){
		$this->display();
	}
	function getFW($db,$list,$str){
		$array=explode(',', $list);
		for ($i=0; $i < count($array); $i++) { 
			$result.=$db->where("vender_id='".$array[$i]."'")->getField($str).',';
		}
		return $result;
	}
	function deluser(){
		$uid=I("id");
		$DBvenders=M('venders');
		$res=$DBvenders->where("vender_id='".$uid."'")->delete();
		if ($res) {
			$this->success('删除成功！','?m=UserAdmin&a=getUser');
		}
		else{
			$this->error('删除失败，请重试！');
		}
	}
	function getUser(){
		import('ORG.Util.Page');// 导入分页类
		$DBvenders=M('venders');
		$list=$DBvenders->select();
		$param = array(
            'result'=>$list,            //分页用的数组或sql
            'listvar'=>'item',            //分页循环变量
            'listRows'=>20,         //每页记录数
            'parameter'=>"",//url分页后继续带的参数
            'target'=>'showUsers',  //ajax更新内容的容器id，不带#
            'pagesId'=>'page',        //分页后页的容器id不带# target和pagesId同时定义才Ajax分页
            'template'=>'UserAdmin:showUsers',//ajax更新模板
        );
        $this->page($param,"user_array");
        $this->display();
	}
	function getUserinfo(){
		import('ORG.Util.Page');// 导入分页类
		$model=new Model('ecommercial');
    	$userinfo_array=$model->table('tb_venders a')
              ->select();
        for ($i=0; $i < count($userinfo_array); $i++) { 
        	$userinfo_array[$i]["friends"]=$this->getFW(M('user_basic'),$userinfo_array[$i]["friends"],'account');
        	$userinfo_array[$i]["error_words"]=$this->getFW(M('words_basic'),$userinfo_array[$i]["error_words"],'topic');
        }
		$param = array(
            'result'=>$userinfo_array,            //分页用的数组或sql
            'listvar'=>'item',            //分页循环变量
            'listRows'=>20,         //每页记录数
            'parameter'=>"",//url分页后继续带的参数
            'target'=>'showUserinfo',  //ajax更新内容的容器id，不带#
            'pagesId'=>'page',        //分页后页的容器id不带# target和pagesId同时定义才Ajax分页
            'template'=>'UserAdmin:showUserinfo',//ajax更新模板
        );
        $this->page($param,"userinfo_array");
        $this->display();
	}
	public function page($param,$assign) {
        extract($param);
        //总记录数
        $flag = is_string($result);
        $listvar = $listvar ? $listvar : 'list';
        $listRows = $listRows? $listRows : 21;
        if ($flag)
            $totalRows = M()->table($result . ' a')->count();
        else
            $totalRows = ($result) ? count($result) : 1;
        //创建分页对象
        if ($target && $pagesId)
            $p = new Page($totalRows, $listRows, $parameter, $url,$target, $pagesId);
        else
            $p = new Page($totalRows, $listRows, $parameter,$url);
        //抽取数据
        if ($flag) {
            $result .= " LIMIT {$p->firstRow},{$p->listRows}";
            $voList = M()->query($result);
        } else {
            $voList = array_slice($result, $p->firstRow, $p->listRows);
        }
        $pages = C('PAGE');//要ajax分页配置PAGE中必须theme带%ajax%，其他字符串替换统一在配置文件中设置，
        //可以使用该方法前用C临时改变配置
        foreach ($pages as $key => $value) {
            $p->setConfig($key, $value);
             // 'theme'=>'%upPage% %linkPage% %downPage% %ajax%'; 要带 %ajax%
        }
        //分页显示
        $page = $p->show();
        //模板赋值
        $this->assign($assign, $voList);
        $this->assign("page", $page);
        if($this->isPost()){
          return $voList;
        }
        if ($this->isAjax()) {//判断ajax请求
            layout(false);
            $template = (!$template) ? 'ajaxlist' : $template;
            exit($this->fetch($template));
        }       
    }
}