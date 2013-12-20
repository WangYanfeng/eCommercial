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
	function getAllWare(){
		$father_vender=I('father_vender');
		$model=new Model('ecommercial');   //数据库名
		$ware_array=$model->table('tb_purchaseorders_vender'.$father_vender.' b,tb_wares_vender'.$father_vender.' a')->where('a.ware_id=b.ware_id')
              ->field('b.order_id,b.vender_id,b.ware_id,b.ware_num,a.ware_name,a.brand_name')->select();
		$ware_array=$this->sortOrderWareNum($ware_array);
    	//echo "---->ware_array--->";dump($ware_array);
    	//$ware_array是同一个店中同类商品的购买件数
    	$DBsale=D('saleorders_vender'.$father_vender);
    	$sale_array=$DBsale->select();
    	$DBcancel=D('cancelorders_vender'.$father_vender);
    	$cancel_array=$DBcancel->select();
    	$sale_array=$this->sortOrderWareNum($sale_array);
    	$cancel_array=$this->sortOrderWareNum($cancel_array);    	
    	//echo "---->sale--->";dump($sale_array);
    	for ($i=0; $i < count($sale_array); $i++) { 
    		for ($j=0; $j < count($ware_array); $j++) { 
    			if($sale_array[$i]['vender_id']==$ware_array[$j]['vender_id']&&$sale_array[$i]['ware_id']==$ware_array[$j]['ware_id']){
    				$ware_array[$j]['ware_num']-=$sale_array[$i]['ware_num'];
    				break;
    			}
    		}
    	}
    	for ($i=0; $i < count($cancel_array); $i++) { 
    		for ($j=0; $j < count($ware_array); $j++) { 
    			if($cancel_array[$i]['vender_id']==$ware_array[$j]['vender_id']&&$cancel_array[$i]['ware_id']==$ware_array[$j]['ware_id']){
    				$ware_array[$j]['ware_num']+=$cancel_array[$i]['ware_num'];
    				break;
    			}
    		}
    	}
    	$DBvenders=D('venders');
    	for($i=0; $i < count($ware_array); $i++) { 
    		$vender_id=$ware_array[$i]['vender_id'];
    		$res=$DBvenders->where("vender_id='".$vender_id."'")->find();
    		$ware_array[$i]['vender_name']=$res['vender_name'];
    		$ware_array[$i]['vender_phone']=$res['vender_phone'];
    		$ware_array[$i]['vender_addr']=$res['vender_addr'];
    	}
		echo "{wares:".json_encode($ware_array)."}";
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