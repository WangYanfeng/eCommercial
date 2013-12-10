<?php
/**
* 订货单菜单中的后台操作程序
*/
class PurchaseOrderAction extends Action
{
	function getInfo(){
		$DBpurchaseorders=D('purchaseorders_vender1');
		$res=$DBpurchaseorders->select();
		//dump(json_encode($res));
		echo "{orders:".json_encode($res)."}";
	}
}
?>