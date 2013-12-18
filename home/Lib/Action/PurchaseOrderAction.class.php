<?php
/**
* 订货单菜单中的后台操作程序
*/
class PurchaseOrderAction extends Action
{
	function getOrders(){
		//viewPurchaseOrder.js调用，查看进货单
		$father_vender=I('father_vender');
		$DBpurchaseorders=D('purchaseorders_vender'.$father_vender);
		$res=$DBpurchaseorders->select();
		//dump(json_encode($res));
		echo "{orders:".json_encode($res)."}";
	}
	function newOrder(){
		$data['vender_id']=I('vender_id');
		$father_vender=I('father_vender');
		$data['ware_id']=I('ware_id');
		$data['ware_num']=I('ware_num');
		$data['order_total_price']=I('order_total_price');
		$data['seller_discount']=I('seller_discount');
		$data['order_payment']=I('order_payment');
		$data['order_time']=date('y-m-d H:i:s',time());
		$data['supplier_name']=I('supplier_name');	
		$data['supplier_phone']=I('supplier_phone');
		$data['supplier_addr']=I('supplier_addr');
		$DBpurchaseorders=D('purchaseorders_vender'.$father_vender);
		$res=$DBpurchaseorders->add($data);
		if($res){
			echo "{success:true}";
		}		
	}
	function getAnalyseData(){
		//返回每月的进货单的总金额
		if($this->isPost()){
			$beginDate=I('beginDate');
			$endDate=I('endDate');
			$father_vender=I('father_vender');
			$DBpurchaseorders=D('purchaseorders_vender'.$father_vender);
			$res=$DBpurchaseorders->where("order_time>='".$beginDate."' AND order_time<='".$endDate."'")->select();
			$data=$this->sortDataByMonth($res);
			echo "{success:true,datas:".json_encode($data)."}";
		}
		else{
			$beginDate="2013-01-01 00:00:00";
			$endDate="2013-12-31 23:59:59";
			$father_vender=I('father_vender');
			$DBpurchaseorders=D('purchaseorders_vender'.$father_vender);
			$res=$DBpurchaseorders->where("order_time>='".$beginDate."' AND order_time<='".$endDate."'")->select();
			$data=$this->sortDataByMonth($res);
			echo json_encode($data);
		}		
	}
	function getWareId(){
		//此方法是获得商品名称异步式查询商品编号.所有的账单都公用这个方法
		$ware_name=I('ware_name');
		$vender_id=I('vender_id');
		$DBwares=D('wares_vender'.$vender_id);
		$ware_id=$DBwares->where("ware_name='".$ware_name."'")->getField('ware_id');
		echo $ware_id;
	}
	function sortDataByMonth($res){
		$data=array();
		$total=array();
		for ($j=0; $j < 13; $j++) { 
			$total[$j]=0;
		}
		for ($i=0; $i < count($res); $i++) { 
			$time=$res[$i]['order_time'];
			$payment=$res[$i]['order_payment'];
			$month=substr($time, 5,2);
			switch ($month) {
				case '01':
					$total[1]+=$payment;
					break;
				case '02':
					$total[2]+=$payment;
					break;
				case '03':
					$total[3]+=$payment;
					break;
				case '04':
					$total[4]+=$payment;
					break;
				case '05':
					$total[5]+=$payment;
					break;
				case '06':
					$total[6]+=$payment;
					break;
				case '07':
					$total[7]+=$payment;
					break;
				case '08':
					$total[8]+=$payment;
					break;
				case '09':
					$total[9]+=$payment;
					break;
				case '10':
					$total[10]+=$payment;
					break;
				case '11':
					$total[11]+=$payment;
					break;
				case '12':
					$total[12]+=$payment;
					break;
			}
		}
		$data[0]=array("month"=>"一月","data"=>$total[1]);
		$data[1]=array("month"=>"二月","data"=>$total[2]);
		$data[2]=array("month"=>"三月","data"=>$total[3]);
		$data[3]=array("month"=>"四月","data"=>$total[4]);
		$data[4]=array("month"=>"五月","data"=>$total[5]);
		$data[5]=array("month"=>"六月","data"=>$total[6]);
		$data[6]=array("month"=>"七月","data"=>$total[7]);
		$data[7]=array("month"=>"八月","data"=>$total[8]);
		$data[8]=array("month"=>"九月","data"=>$total[9]);
		$data[9]=array("month"=>"十月","data"=>$total[10]);
		$data[10]=array("month"=>"十一月","data"=>$total[11]);
		$data[11]=array("month"=>"十二月","data"=>$total[12]);
		return $data;
	}
}
?>