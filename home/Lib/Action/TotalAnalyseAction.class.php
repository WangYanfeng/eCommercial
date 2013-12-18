<?php
/**
* 
*/
class TotalAnalyseAction extends Action
{
	
	function getTotalAnalyseData()
	{
		//返回每月的所有金额的总金额
		if($this->isPost()){
			$beginDate=I('beginDate');
			$endDate=I('endDate');
			$father_vender=I('father_vender');
			$data[0]=$this->getOrderData('purchaseorders_vender'.$father_vender,$beginDate,$endDate);
			$data[1]=$this->getOrderData('saleorders_vender'.$father_vender,$beginDate,$endDate);
			$data[2]=$this->getOrderData('cancelorders_vender'.$father_vender,$beginDate,$endDate);
			$result=$this->sortDataByMonth($data);
			echo "{success:true,datas:".json_encode($result)."}";
		}
		else{
			$beginDate="2013-01-01 00:00:00";
			$endDate="2013-12-31 23:59:59";
			$father_vender=I('father_vender');
			$data[0]=$this->getOrderData('purchaseorders_vender'.$father_vender,$beginDate,$endDate);
			$data[1]=$this->getOrderData('saleorders_vender'.$father_vender,$beginDate,$endDate);
			$data[2]=$this->getOrderData('cancelorders_vender'.$father_vender,$beginDate,$endDate);
			$result=$this->sortDataByMonth($data);
			echo json_encode($result);
		}
		//
			// $data=array();
			// $data[0]=array("month"=>"一月","销售"=>"2100","退货"=>"1000","入库"=>"2300");
			// $data[1]=array("month"=>"二月","销售"=>"3500","入库"=>"3700");
			// $data[2]=array("month"=>"三月","销售"=>"2700","入库"=>"2600");
			// $data[3]=array("month"=>"四月","销售"=>"2300","入库"=>"2000");
			// $data[4]=array("month"=>"五月","销售"=>"3500","入库"=>"4000");
			// $data[5]=array("month"=>"六月","销售"=>"2900","入库"=>"3600");
			// $data[6]=array("month"=>"七月","销售"=>"3800","入库"=>"3400");
			// $data[7]=array("month"=>"八月","销售"=>"3200","入库"=>"3800");
			// $data[8]=array("month"=>"九月","销售"=>"2500","入库"=>"2500");
			// $data[9]=array("month"=>"十月","销售"=>"2300","入库"=>"3000");
			// $data[10]=array("month"=>"十一月","销售"=>"3200","入库"=>"3400");
			// $data[11]=array("month"=>"十二月","销售"=>"3000","入库"=>"3200");
			// echo json_encode($data);
		//
	}
	function getOrderData($dbname,$beginDate,$endDate){
		$DB=D($dbname);
		$res=$DB->where("order_time>='".$beginDate."' AND order_time<='".$endDate."'")->select();
		return $res;
	}
	function sortDataByMonth($data)
	{
		$total=array();
		for ($i=0; $i < count($data); $i++) { 
			for ($j=0; $j < 13; $j++) { 
				$total[$i][$j]=0;
			}
		}
		for ($i=0; $i < count($data); $i++) { 
			for ($j=0; $j < count($data[$i]); $j++) {
				$time=$data[$i][$j]['order_time'];
				$payment=$data[$i][$j]['order_payment'];
				$month=substr($time, 5,2);
				switch ($month) {
					case '01':
						$total[$i][1]+=$payment;
						break;
					case '02':
						$total[$i][2]+=$payment;
						break;
					case '03':
						$total[$i][3]+=$payment;
						break;
					case '04':
						$total[$i][4]+=$payment;
						break;
					case '05':
						$total[$i][5]+=$payment;
						break;
					case '06':
						$total[$i][6]+=$payment;
						break;
					case '07':
						$total[$i][7]+=$payment;
						break;
					case '08':
						$total[$i][8]+=$payment;
						break;
					case '09':
						$total[$i][9]+=$payment;
						break;
					case '10':
						$total[$i][10]+=$payment;
						break;
					case '11':
						$total[$i][11]+=$payment;
						break;
					case '12':
						$total[$i][12]+=$payment;
						break;
				}
			}
		}
		$data[0]=array("month"=>"一月","销售"=>$total[1][1],"入库"=>$total[0][1],"退货"=>$total[2][1]);
		$data[1]=array("month"=>"二月","销售"=>$total[1][2],"入库"=>$total[0][2],"退货"=>$total[2][2]);
		$data[2]=array("month"=>"三月","销售"=>$total[1][3],"入库"=>$total[0][3],"退货"=>$total[2][3]);
		$data[3]=array("month"=>"四月","销售"=>$total[1][4],"入库"=>$total[0][4],"退货"=>$total[2][4]);
		$data[4]=array("month"=>"五月","销售"=>$total[1][5],"入库"=>$total[0][5],"退货"=>$total[2][5]);
		$data[5]=array("month"=>"六月","销售"=>$total[1][6],"入库"=>$total[0][6],"退货"=>$total[2][6]);
		$data[6]=array("month"=>"七月","销售"=>$total[1][7],"入库"=>$total[0][7],"退货"=>$total[2][7]);
		$data[7]=array("month"=>"八月","销售"=>$total[1][8],"入库"=>$total[0][8],"退货"=>$total[2][8]);
		$data[8]=array("month"=>"九月","销售"=>$total[1][9],"入库"=>$total[0][9],"退货"=>$total[2][9]);
		$data[9]=array("month"=>"十月","销售"=>$total[1][10],"入库"=>$total[0][10],"退货"=>$total[2][10]);
		$data[10]=array("month"=>"十一月","销售"=>$total[1][11],"入库"=>$total[0][11],"退货"=>$total[2][11]);
		$data[11]=array("month"=>"十二月","销售"=>$total[1][12],"入库"=>$total[0][12],"退货"=>$total[2][12]);
		return $data;
	}
	function getIncomeAnalyseData()
	{
		if($this->isPost()){
			$beginDate=I('beginDate');
			$endDate=I('endDate');
			$father_vender=I('father_vender');
			$data[0]=$this->getOrderData('purchaseorders_vender'.$father_vender,$beginDate,$endDate);
			$data[1]=$this->getOrderData('saleorders_vender'.$father_vender,$beginDate,$endDate);
			$data[2]=$this->getOrderData('cancelorders_vender'.$father_vender,$beginDate,$endDate);
			$result=$this->sortIncomeByMonth($data);
			echo "{success:true,datas:".json_encode($result)."}";
		}
		else{
			$beginDate="2013-01-01 00:00:00";
			$endDate="2013-12-31 23:59:59";
			$father_vender=I('father_vender');
			$data[0]=$this->getOrderData('purchaseorders_vender'.$father_vender,$beginDate,$endDate);
			$data[1]=$this->getOrderData('saleorders_vender'.$father_vender,$beginDate,$endDate);
			$data[2]=$this->getOrderData('cancelorders_vender'.$father_vender,$beginDate,$endDate);
			$result=$this->sortIncomeByMonth($data);
			echo json_encode($result);
		}
	}
	function sortIncomeByMonth($orderData)
	{
		$res=$this->sortDataByMonth($orderData);
		for ($i=0; $i < count($res); $i++) { 
			$total[$i]=$res[$i]["销售"]-$res[$i]["入库"]-$res[$i]["退货"];
		}
		$data[0]=array("month"=>"一月","data"=>$total[0]);
		$data[1]=array("month"=>"二月","data"=>$total[1]);
		$data[2]=array("month"=>"三月","data"=>$total[2]);
		$data[3]=array("month"=>"四月","data"=>$total[3]);
		$data[4]=array("month"=>"五月","data"=>$total[4]);
		$data[5]=array("month"=>"六月","data"=>$total[5]);
		$data[6]=array("month"=>"七月","data"=>$total[6]);
		$data[7]=array("month"=>"八月","data"=>$total[7]);
		$data[8]=array("month"=>"九月","data"=>$total[8]);
		$data[9]=array("month"=>"十月","data"=>$total[9]);
		$data[10]=array("month"=>"十一月","data"=>$total[10]);
		$data[11]=array("month"=>"十二月","data"=>$total[11]);
		return $data;
	}
	function getIncomeTipData()
	{
		$beginDate=I('beginDate');
		$endDate=I('endDate');
		if ($beginDate==null) {
			$beginDate="2013-01-01 00:00:00";
		}
		$father_vender=I('father_vender');
		$month=I('month');
		$data[0]=$this->getOrderData('purchaseorders_vender'.$father_vender,$beginDate,$endDate);
		$data[1]=$this->getOrderData('saleorders_vender'.$father_vender,$beginDate,$endDate);
		$data[2]=$this->getOrderData('cancelorders_vender'.$father_vender,$beginDate,$endDate);
		$res=$this->sortDataByMonth($data);
		$result=$res[$month];
		echo json_encode($result);
	}
}
?>