<?php
/**
* 
*/
class GoodAdminAction extends Action
{
	
	function index(){
    $this->display();
	}
  function getGoods(){
    import('ORG.Util.Page');// 导入分页类
    $DBvender=M('venders');
    $v_id=$DBvender->where('vender_id=father_vender')->getField('vender_id',true);
    $v_name=$DBvender->where('vender_id=father_vender')->getField('vender_name',true);
  //  dump($v_id);
   // dump($v_name);
    $vender_num=count($v_id);
    for ($i=0; $i < count($v_id); $i++) { 
    echo "用户：";
    echo $v_name[$i];
    $DBGoods_infor[i]=M('wares_vender'.$v_id[$i]);
    $list=$DBGoods_infor[i]->select();
 
    $param = array(
            'result'=>$list,            //分页用的数组或sql
            'listvar'=>'item',            //分页循环变量
            'listRows'=>20,         //每页记录数
            'parameter'=>"",//url分页后继续带的参数
            'target'=>'showGoods',  //ajax更新内容的容器id，不带#
            'pagesId'=>'page',        //分页后页的容器id不带# target和pagesId同时定义才Ajax分页
            'template'=>'GoodAdmin:showGoods',//ajax更新模板
        );
        $this->page($param);
        $this->display();
         }
  }
  function delGood(){
    $id=I('ware_id');
    $DBGoods_infor=M('wares_vender1');
    $res=$DBGoods_infor->where("ware_id='".$id."'")->delete();
    if ($res) {
      $this->success('删除成功！','?m=GoodAdmin&a=sellingGood');
    }
    else{
      $this->error('删除失败，请重试！');
    }
  }
  function sellingGood(){
    $model=new Model('ecommercial');
    $Goods_array=$model->table('tb_wares_vender1 a,tb_wares_vender5 b')->where('a.cost_price<5000||b.cost_price<5000')
              ->field('b.* ,a.cost_price')
              ->order('a.market_price')
              ->limit(50)
              ->select();
    $this->assign('Good_array',$Goods_array);
    $this->display();
  }
  
	function Goodimport(){
		$this->display();
	}
	function Good_add(){
		import('ORG.Util.ExcelToArray');
		$tmp_file = $_FILES ['file_Goods'] ['tmp_name'];  
        $file_types = explode ( ".", $_FILES ['file_Goods'] ['name'] );  
        $file_type = $file_types [count ( $file_types ) - 1];/*判别是不是.xls文件，判别是不是excel文件*/  
        if (strtolower ( $file_type ) != "xlsx" && strtolower ( $file_type ) != "xls")        
         {  
              $this->error ( '不是Excel文件，重新上传' );  
         }  
         /*设置上传路径*/ 
        C('UPLOAD_DIR','../admin/Upload/') ;
        
        $savePath = C('UPLOAD_DIR'); 
         /*以时间来命名上传的文件*/  
        $str = date ( 'Ymdhis' );   
        $file_name = $str . "." . $file_type; 

         /*是否上传成功  */  
	    if (! copy ( $tmp_file, $savePath . $file_name )){  
	        echo "error";  
	    }
        $ExcelToArrary=new ExcelToArray();//实例化  
        $res=$ExcelToArrary->read(C('UPLOAD_DIR').$file_name,"UTF-8",$file_type);//传参,判断office2007还是office2003  
        foreach ( $res as $k => $v ) //循环excel表  
           {
               $k=$k-1;//addAll方法要求数组必须有0索引  
               $data[$k]['ware_name'] = $v [0];//创建二维数组  
               $data[$k]['category'] = $v [1];  
               $data[$k]['brand_name'] = $v [2];       
               $data[$k]['cost_price'] = $v [3];
               $data[$k]['market_price'] = $v [4]; 
               $data[$k]['productor'] = $v [4]; 
               $data[$k]['in_time'] =date ( 'Y-m-d h:i:s' );
          }  
        $DBGoods_infor=M('wares_vender1');//M方法  
        $result=$DBGoods_infor->addAll($data);  
        if(! $result)  
          {  
            $this->error('导入出错失败'); 
          }  
        else  
          {  
            $this->success('导入成功', '__URL__/Goodimport');
          }  
	}
	function Goodexport(){
		$this->display();
	}
  function exportExcel(){
    import('ORG.Util.ExcelToArray');
    $xlsName  = "Goods";
    $xlsCell  = array(
            array('ware_name','商品名'),
            array('category','商品分类'),
            array('brand_name','品牌'),
            array('cost_price','进价'),
            array('market_price','进价'),
            array('wares_vender_id','用户关联id')
        );
    $DBGoods_infor= M('wares_vender1');
    $xlsData  = $DBGoods_infor->Field('ware_name,category,brand_name,cost_price,market_price,wares_vender_id')->select();
    $ArrayToExcel=new ArrayToExcel();
    //dump($xlsData);die();
    $ArrayToExcel->exportExcel($xlsName,$xlsCell,$xlsData);
  }
  public function page($param) {
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
        $this->assign("Good_array", $voList);
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
?>