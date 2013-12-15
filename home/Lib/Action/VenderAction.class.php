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
}
?>