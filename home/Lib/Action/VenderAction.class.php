<?php
/**
* 店铺管理后台
*/
class VenderAction extends Action
{
	
	function getVender(){
		$father_vender=I('father_vender');
		$DBvenders=D('venders');
		$res=$DBvenders->where("father_vender='".$father_vender."'")->select();
		//dump(json_encode($res));
		echo "{venders:".json_encode($res)."}";
	}
	function newVender(){
		$father_vender_id=I('father_vender');
		$data['vender_name']=I('vender_name');
		$data['vender_pwd']=I('vender_pwd');
		$data['vender_addr']=I('vender_addr');
		$data['vender_phone']=I('vender_phone');
		$data['father_vender']=$father_vender_id;
		$data['in_time']=date('y-m-d H:i:s',time());
		$DBvenders=D('venders');
		$res=$DBvenders->where("vender_name='".$data['vender_name']."'")->find();
		if($res){echo "{success:false}";}
		else{
			$vender_id=$DBvenders->add($data);
			if($vender_id){
				// $father_vender=$DBvenders->where("vender_id='".$father_vender_id."'")->find();
				// $branch_venders=$father_vender['branch_venders'];
				// if($branch_venders==null){
				// 	$branch_venders=$vender_id;
				// }
				// else{
				// 	$branch_venders=$branch_venders.",".$vender_id;
				// }
				// $result=$DBvenders->where("vender_id='".$father_vender_id."'")->setField('branch_venders',$branch_venders);
				echo "{success:true}";
			}
		}
	}
	function getVenderRank()
	{
		if($this->isPost()){
			$beginDate=I('beginDate');
			$endDate=I('endDate');
			$father_vender=I('father_vender');
			$DBvenders=D('venders');
			$DBsale=D('saleorders_vender'.$father_vender);
	    	$sale_array=$DBsale->where("order_time>='".$beginDate."' AND order_time<='".$endDate."'")->select();
	    	$DBcancel=D('cancelorders_vender'.$father_vender);
	    	$cancel_array=$DBcancel->where("order_time>='".$beginDate."' AND order_time<='".$endDate."'")->select();
	    	$sale_array=$this->sortOrderWareNum($sale_array);
	    	$cancel_array=$this->sortOrderWareNum($cancel_array);
	    	for ($i=0; $i < count($cancel_array); $i++) { 
	    		for ($j=0; $j < count($sale_array); $j++) { 
	    			if($cancel_array[$i]['vender_id']==$sale_array[$j]['vender_id']&&$cancel_array[$i]['ware_id']==$sale_array[$j]['ware_id']){
	    				$sale_array[$j]['order_payment']-=$cancel_array[$i]['order_payment'];
	    				break;
	    			}
	    		}
	    	}
	    	$DBvenders=D('venders');
	    	$result=array();
	    	for($i=0; $i < count($sale_array); $i++) { 
	    		$vender_id=$sale_array[$i]['vender_id'];
	    		$res=$DBvenders->where("vender_id='".$vender_id."'")->find();
	    		$result[$i]['sale_total']=$sale_array[$i]['order_payment'];
	    		$result[$i]['vender_name']=$res['vender_name'];
	    		$result[$i]['vender_phone']=$res['vender_phone'];
	    		$result[$i]['vender_addr']=$res['vender_addr'];
	    	}
			echo "{success:true,datas:".json_encode($result)."}";
		}
		else{
			$beginDate="2013-01-01 00:00:00";
			$endDate="2013-12-31 23:59:59";
			$father_vender=I('father_vender');
			$DBvenders=D('venders');
			$DBsale=D('saleorders_vender'.$father_vender);
	    	$sale_array=$DBsale->where("order_time>='".$beginDate."' AND order_time<='".$endDate."'")->select();
	    	$DBcancel=D('cancelorders_vender'.$father_vender);
	    	$cancel_array=$DBcancel->where("order_time>='".$beginDate."' AND order_time<='".$endDate."'")->select();
	    	$sale_array=$this->sortOrderWareNum($sale_array);
	    	$cancel_array=$this->sortOrderWareNum($cancel_array);
	    	for ($i=0; $i < count($cancel_array); $i++) { 
	    		for ($j=0; $j < count($sale_array); $j++) { 
	    			if($cancel_array[$i]['vender_id']==$sale_array[$j]['vender_id']&&$cancel_array[$i]['ware_id']==$sale_array[$j]['ware_id']){
	    				$sale_array[$j]['order_payment']-=$cancel_array[$i]['order_payment'];
	    				break;
	    			}
	    		}
	    	}
	    	$DBvenders=D('venders');
	    	$result=array();
	    	for($i=0; $i < count($sale_array); $i++) { 
	    		$vender_id=$sale_array[$i]['vender_id'];
	    		$res=$DBvenders->where("vender_id='".$vender_id."'")->find();
	    		$result[$i]['sale_total']=$sale_array[$i]['order_payment'];
	    		$result[$i]['vender_name']=$res['vender_name'];
	    		$result[$i]['vender_phone']=$res['vender_phone'];
	    		$result[$i]['vender_addr']=$res['vender_addr'];
	    	}
	    	echo json_encode($result);
		}		    	
	}
	function sortOrderWareNum($ware_array)
	{//同一个店中同类商品的购买或销售件数
		$result=array();
		$n=count($ware_array);
		for ($i=0; $i < $n; $i++) { 
			for ($j=0; $j < count($result); $j++) { 
				if ($ware_array[$i]['ware_id']==$result[$j]['ware_id']&&$ware_array[$i]['vender_id']==$result[$j]['vender_id']) {
					break;
				}
			}
			if($j==count($result)){
				$result[$j]=$ware_array[$i];
			}else{
				$result[$j]['ware_num']+=$ware_array[$i]['ware_num'];
			}			
		}
    	return $result;
	}
}
?>