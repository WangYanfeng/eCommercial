<?php
// 本类由系统自动生成，仅供测试用途
class IndexAction extends Action {
	function index(){
    	if($this->isPost()){  
        //$this->redirect('?m=Index&a=mainpage');die();      
      	$vender_name = $_POST['vender_name'];
        $vender_pwd = $_POST['vender_pwd'];
        $DBvenders=D('venders');
        $res=$DBvenders->where("vender_name='" . $vender_name . "' AND vender_pwd='" . $vender_pwd. "'")->find();
        if ($res) {
            $father_vender=$res['father_vender'];
            session('vender', array(
                        'vender_id' => $res['vender_id'],
                        'vender_name' => $res['vender_name'],
                        'father_vender'=>$father_vender
            ));
            $this->redirect('?m=Index&a=mainpage');
        }else{
            $this->error('密码错误');
        }
    	}else{
    		$this->display();
    	}
  }
  function mainpage(){
      $this->display();
  }
  function regist(){      
      $data['vender_name']=I('vender_name');
      $data['vender_pwd']=I('vender_pwd');
      $data['vender_addr']=I('vender_addr');
      $data['vender_phone']=I('vender_phone');
      $data['in_time']=date('y-m-d H:i:s',time());
      $DBvenders=D('venders');
      $res=$DBvenders->where("vender_name='".$data['vender_name']."'")->find();
      if($res){
          echo "{success:false}";
      }else{
          $res=$DBvenders->add($data);
          if($res){
              $vender_id=$DBvenders->where("vender_name='".$data['vender_name']."'")->getField('vender_id');
              $DBvenders->where("vender_id='".$vender_id."'")->setField('father_vender',$vender_id);
              $this->createTB($vender_id);
              echo "{success:true}";
          }
      }      
  }
  public function createTB($id){
    M()->query("CREATE TABLE `tb_purchaseorders_vender$id` (
                  `order_id` int(255) NOT NULL AUTO_INCREMENT,
                  `vender_id` int(255) NOT NULL,
                  `ware_id` int(255) NOT NULL,
                  `ware_num` int(255) NOT NULL,
                  `order_total_price` int(255) NOT NULL,
                  `seller_discount` int(255) NOT NULL,
                  `order_payment` int(255) NOT NULL,
                  `order_time` datetime NOT NULL,
                  `supplier_name` varchar(255) DEFAULT NULL,
                  `supplier_phone` varchar(255) DEFAULT NULL,
                  `supplier_addr` varchar(255) DEFAULT NULL,
                  PRIMARY KEY (`order_id`)
                  ) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8");
    M()->query("CREATE TABLE `tb_saleorders_vender$id` (
                  `order_id` int(255) NOT NULL AUTO_INCREMENT,
                  `vender_id` int(255) NOT NULL,
                  `ware_id` int(255) NOT NULL,
                  `ware_num` int(255) NOT NULL,
                  `order_total_price` int(255) NOT NULL,
                  `saller_discount` int(255) NOT NULL DEFAULT '0',
                  `order_payment` int(255) NOT NULL,
                  `order_time` datetime NOT NULL,
                  `customer_name` varchar(255) DEFAULT NULL,
                  `customer_addr` varchar(255) DEFAULT NULL,
                  `customer_phone` int(25) DEFAULT NULL,
                  `saleperson` varchar(255) NOT NULL,
                  `other` varchar(255) NULL,
                  PRIMARY KEY (`order_id`)
                  ) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8");
    M()->query("CREATE TABLE `tb_cancelorders_vender$id` (
                  `order_id` int(255) NOT NULL AUTO_INCREMENT,
                  `vender_id` int(255) NOT NULL,
                  `ware_id` int(255) NOT NULL,
                  `ware_num` int(255) NOT NULL,
                  `total_price` int(255) NOT NULL,
                  `order_time` datetime NOT NULL,
                  `customer_name` varchar(255) DEFAULT NULL,
                  `others` varchar(255) DEFAULT NULL,
                  PRIMARY KEY (`order_id`)
                  ) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8");
    M()->query("CREATE TABLE `tb_wares_vender$id` (
                  `ware_id` int(255) NOT NULL AUTO_INCREMENT,
                  `ware_name` varchar(255) NOT NULL,
                  `category` varchar(255) NOT NULL,
                  `brand_name` varchar(255) NOT NULL,
                  `cost_price` int(255) DEFAULT '0',
                  `market_price` int(255) NOT NULL,
                  `productor` varchar(255) NOT NULL,
                  `in_time` datetime NOT NULL,
                  PRIMARY KEY (`ware_id`)
                  ) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8");
    M()->query("ALTER TABLE `tb_cancelorders_vender$id`
            ADD CONSTRAINT `tb_cancelorders_vender$id` FOREIGN KEY (`ware_id`) REFERENCES `tb_wares_vender$id` (`ware_id`);
          ");
    M()->query("ALTER TABLE `tb_purchaseorders_vender$id`
            ADD CONSTRAINT `tb_purchaseorders_vender$id` FOREIGN KEY (`ware_id`) REFERENCES `tb_wares_vender$id` (`ware_id`);
          ");
    M()->query("ALTER TABLE `tb_saleorders_vender$id`
            ADD CONSTRAINT `tb_saleorders_vender$id` FOREIGN KEY (`ware_id`) REFERENCES `tb_wares_vender$id` (`ware_id`);
      ");
  }
  public function logout(){
      session(null);
      $this->success('退出成功，返回首页','__APP__');
  }  
}