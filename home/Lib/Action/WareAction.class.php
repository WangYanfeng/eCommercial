<?php
/**
* 商品档案管理后台
*/
class WareAction extends Action
{
	
	function getWare(){
		$father_vender=I('father_vender');
		$DBwares=D('wares_vender'.$father_vender);
		$res=$DBwares->select();
		//dump(json_encode($res));
		echo "{wares:".json_encode($res)."}";
	}
	function newWare(){
		$data['vender_id']=I('vender_id');
		$father_vender=I('father_vender');
		$data['ware_name']=I('ware_name');
		$data['category']=I('category');
		$data['brand_name']=I('brand_name');
		$data['cost_price']=I('cost_price');
		$data['order_time']=date('y-m-d H:i:s',time());
		$data['market_price']=I('market_price');		
		$data['productor']=I('productor');
		$DBwares=D('wares_vender'.$father_vender);
		$res=$DBwares->add($data);
		if($res){
			echo "{success:true}";
		}
	}
}
?>