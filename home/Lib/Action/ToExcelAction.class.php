<?php
/**
* 文件导入导出
*/
class ToExcelAction extends BaseAction
{
	
	function importExcel()
	{
		$dbname=I('dbname');
		import('ORG.Util.ExcelToArray');
		$tmp_file = $_FILES ['file_words'] ['tmp_name'];  
        $file_types = explode ( ".", $_FILES ['file_words'] ['name'] );  
        $file_type = $file_types [count ( $file_types ) - 1];/*判别是不是.xls文件，判别是不是excel文件*/  
        if (strtolower ( $file_type ) != "xlsx" && strtolower ( $file_type ) != "xls")        
         {  
              $this->error ( '不是Excel文件，重新上传' );  
         }  
         /*设置上传路径*/ 
        C('UPLOAD_DIR','../home/Upload/') ;
        
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
        $db=substr($dbname, 0,5);
        switch ($db) {
			case 'cance':
	        	foreach ( $res as $k => $v ) //循环excel表  
	            {
	               $k=$k-1;//addAll方法要求数组必须有0索引  
	               $data[$k]['order_id'] = $v [0];//创建二维数组  
	               $data[$k]['vender_id'] = $v [1];  
	               $data[$k]['ware_id'] = $v [2];       
	               $data[$k]['ware_num'] = $v [3];
	               $data[$k]['order_payment'] = $v [4];
	               $data[$k]['order_time'] =date ( 'Y-m-d h:i:s' );
	               $data[$k]['customer_name'] = $v [6];
	               $data[$k]['others'] = $v [7]; 
	            }
				break;
			case 'purch':
	        	foreach ( $res as $k => $v ) //循环excel表  
	            {
	               $k=$k-1;//addAll方法要求数组必须有0索引  
	               $data[$k]['order_id'] = $v [0];//创建二维数组  
	               $data[$k]['vender_id'] = $v [1];  
	               $data[$k]['ware_id'] = $v [2];       
	               $data[$k]['ware_num'] = $v [3];
	               $data[$k]['order_total_price'] = $v [4];
	               $data[$k]['seller_discount'] = $v [5];
	               $data[$k]['order_payment'] = $v [6];
	               $data[$k]['order_time'] =date ( 'Y-m-d h:i:s' );
	               $data[$k]['supplier_name'] = $v [8];
	               $data[$k]['supplier_phone'] = $v [9];
	               $data[$k]['supplier_addr'] = $v [10]; 
	            }
				break;
			case 'saleo':
				foreach ( $res as $k => $v ) //循环excel表  
	            {
	               $k=$k-1;//addAll方法要求数组必须有0索引  
	               $data[$k]['order_id'] = $v [0];//创建二维数组  
	               $data[$k]['vender_id'] = $v [1];  
	               $data[$k]['ware_id'] = $v [2];       
	               $data[$k]['ware_num'] = $v [3];
	               $data[$k]['order_total_price'] = $v [4];
	               $data[$k]['seller_discount'] = $v [5];
	               $data[$k]['order_payment'] = $v [6];
	               $data[$k]['order_time'] =date ( 'Y-m-d h:i:s' );
	               $data[$k]['customer_name'] = $v [8];
	               $data[$k]['customer_addr'] = $v [9];
	               $data[$k]['customer_phone'] = $v [10]; 
	            }
				break;
			case 'wares':
				$xlsCell  = array(
		            array('ware_id','商品号'),
		            array('ware_name','商品名称'),
		            array('category','分类'),
		            array('brand_name','品牌名称'),
		            array('cost_price','进价'),
		            array('market_price','额定售价'),
		            array('productor','生成厂商'),
		            array('in_time','创建时间')
	        	);
	        	foreach ( $res as $k => $v ) //循环excel表  
	            {
	               $k=$k-1;//addAll方法要求数组必须有0索引  
	               $data[$k]['ware_id'] = $v [0];//创建二维数组  
	               $data[$k]['ware_name'] = $v [1];  
	               $data[$k]['category'] = $v [2];       
	               $data[$k]['brand_name'] = $v [3];
	               $data[$k]['cost_price'] = $v [4];
	               $data[$k]['market_price'] = $v [5];
	               $data[$k]['productor'] = $v [6];
	               $data[$k]['in_time'] =date ( 'Y-m-d h:i:s' ); 
	            }
				break;
		}
        $DBtable=M($dbname);//M方法  
        $result=$DBtable->addAll($data);  
        if(! $result)
          {  
            $this->error('导入出错,请确认数据表的各个列是否正确！'); 
          }  
        else
          {  
            $this->success('导入成功');
          }
	}
	function exportExcel()
	{
		$dbname=I('dbname');
		$db=substr($dbname, 0,5);
		switch ($db) {
			case 'cance':
				$xlsCell  = array(
					array('order_id','订单号'),
		            array('vender_id','店铺号'),
		            array('ware_id','商品号'),
		            array('ware_num','商品个数'),
		            array('order_payment','退货金额'),
		            array('order_time','退货时间'),
		            array('customer_name','客户姓名'),
		            array('others','反馈信息')
	        );
				break;
			case 'purch':
				$xlsCell  = array(
					array('order_id','订单号'),
		            array('vender_id','店铺号'),
		            array('ware_id','商品号'),
		            array('ware_num','商品个数'),
		            array('order_total_price','购货金额'),
		            array('seller_discount','折扣'),
		            array('order_payment','实付金额'),
		            array('order_time','退货时间'),
		            array('supplier_name','供应商名称'),
		            array('supplier_phone','供应商联系方式'),
		            array('supplier_addr','供应商地址')
	        );
				break;
			case 'saleo':
				$xlsCell  = array(
					array('order_id','订单号'),
		            array('vender_id','店铺号'),
		            array('ware_id','商品号'),
		            array('ware_num','商品个数'),
		            array('order_total_price','总金额'),
		            array('seller_discount','折扣'),
		            array('order_payment','实付金额'),
		            array('order_time','退货时间'),
		            array('customer_name','客户姓名'),
		            array('customer_addr','客户地址'),
		            array('customer_phone','客户电话')
            );
				break;
			case 'wares':
				$xlsCell  = array(
		            array('ware_id','商品号'),
		            array('ware_name','商品名称'),
		            array('category','分类'),
		            array('brand_name','品牌名称'),
		            array('cost_price','进价'),
		            array('market_price','额定售价'),
		            array('productor','生成厂商'),
		            array('in_time','创建时间')
	        );
				break;
		}
		import('ORG.Util.ArrayToExcel');
	    $xlsName  = $dbname;
	    $DBtable= M($dbname);
	    $xlsData  = $DBtable->select();
	    $ArrayToExcel=new ArrayToExcel();
	    //dump($xlsData);die();
	    $ArrayToExcel->exportExcel($xlsName,$xlsCell,$xlsData);
	}
}
?>