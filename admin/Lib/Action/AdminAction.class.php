<?php
/**
* 
*/
class AdminAction extends BaseAction
{
	function main(){}
	function admin(){
		$this->display();
	}
	public function menu($item=1){
    //在top框架点击后，传来参数item
    if($item==1){
      	$menulist=array(
      			'key' => '用户管理',
           	    'list'=>array(
                            array('name'=>'用户账号','url'=>'?m=UserAdmin&a=index'),
                            array('name'=>'用户信息','url'=>'?m=UserAdmin&a=userinfo')
            	        )
        );
    }
    elseif ($item==2) {
      	$menulist=array(
      			'key' => '商品管理',
          	    'list'=>array(
                            array('name'=>'库存商品列表','url'=>'?m=GoodAdmin&a=index'),
                            array('name'=>'热销商品列表','url'=>'?m=GoodAdmin&a=sellingGood'),
                            array('name'=>'商品入库','url'=>'?m=GoodAdmin&a=Goodimport'),
                            array('name'=>'商品导出','url'=>'?m=GoodAdmin&a=Goodexport'),
            	        )
        );
    }
    elseif ($item==3) {
      $menulist=array(
      			'key' => '物流管理',
            	'list'=>array(
                        	array('name'=>'物流网点列表','url'=>'?m=LogisticsAdmin&a=index'),
                        	array('name'=>'物流网点导入','url'=>'?m=LogisticsAdmin&a=logisticsimport'),
                          array('name'=>'物流网点导出','url'=>'?m=LogisticsAdmin&a=logisticsexport')
            			)
        );
    }
    elseif ($item==4) {
      $menulist=array('key' => '系统管理',
            	'list'=>array(
                            array('name'=>'店面设置','url'=>'?m=SystemAdmin&a=shop'),
                            array('name'=>'系统设置','url'=>'?m=SystemAdmin&a=conf'),
                            array('name'=>'数据库备份','url'=>'?m=SystemAdmin&a=dbcopy'),
                            array('name'=>'系统优化','url'=>'?m=SystemAdmin&a=optimie')
            	        )
        );
    }
    $this->assign('menulist',$menulist);
    //$this->assign('item',$item);
    $this->display();
  }
}
?>