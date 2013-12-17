<?php
/**
* 退货单
*/
class CancelOrderAction extends Action
{
	
	function newOrder(){
		$data['vender_id']=I('vender_id');
		$father_vender=I('father_vender');
		$data['ware_id']=I('ware_id');
		$data['ware_num']=I('ware_num');
		$data['order_payment']=I('order_total_price');
		$data['order_time']=date('y-m-d H:i:s',time());
		$data['customer_name']=I('customer_name');		
		$data['others']=I('others');
		$DBcancelorders=D('cancelorders_vender'.$father_vender);
		$res=$DBcancelorders->add($data);
		if($res){
			echo "{success:true}";
		}
	}
	function getOrders(){
		//viewPurchaseOrder.js调用，查看进货单
		$father_vender=I('father_vender');
		$DBcancelorders=D('cancelorders_vender'.$father_vender);
		$res=$DBcancelorders->select();
		//dump(json_encode($res));
		echo "{orders:".json_encode($res)."}";
	}
}
?>