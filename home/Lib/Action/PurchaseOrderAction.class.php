<?php
/**
* 订货单菜单中的后台操作程序
*/
class PurchaseOrderAction extends Action
{
	function getOrders(){
		//viewPurchaseOrder.js调用，查看进货单
		$DBpurchaseorders=D('purchaseorders_vender1');
		$res=$DBpurchaseorders->select();
		//dump(json_encode($res));
		echo "{orders:".json_encode($res)."}";
	}
	function getAnalyseData(){
		//返回每月的进货单的总金额
		$data=array();
		$data[0]=array("month"=>"一月","data"=>"2500");
		$data[1]=array("month"=>"二月","data"=>"3400");
		$data[2]=array("month"=>"三月","data"=>"1500");
		$data[3]=array("month"=>"四月","data"=>"4500");
		$data[4]=array("month"=>"五月","data"=>"3100");
		$data[5]=array("month"=>"六月","data"=>"5600");
		$data[6]=array("month"=>"七月","data"=>"4200");
		$data[7]=array("month"=>"八月","data"=>"5200");
		$data[8]=array("month"=>"九月","data"=>"2800");
		$data[9]=array("month"=>"十月","data"=>"3500");
		$data[10]=array("month"=>"十一月","data"=>"4200");
		$data[11]=array("month"=>"十二月","data"=>"5400");
		echo json_encode($data);
	}
}
?>