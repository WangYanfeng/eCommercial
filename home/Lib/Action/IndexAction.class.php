<?php
// 本类由系统自动生成，仅供测试用途
class IndexAction extends Action {
	function index(){
      $this->redirect('?m=Index&a=mainpage');die();
    	if($this->isPost()){        
      	$vender_name = $_POST['vender_name'];
        $vender_pwd = $_POST['vender_pwd'];
        $DBvenders=D('venders');
        $res=$DBvenders->where("vender_name='" . $vender_name . "' AND vender_pwd='" . $vender_pwd. "'")->find();
        if ($res) {
            session('vender', array(
                        'vender_id' => $res['vender_id'],
                        'vender_name' => $res['vender_name']
            ));
            //$this->redirect('?m=Index&a=mainpage');die();
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
              $DBuser_active=D('user_active');
              $vender_id=$DBvenders->where("vender_name='".$data['vender_name']."'")->getField('id');
              createTB($vender_id);
              echo "{success:true}";
          }
      }      
  }
  public function createTB($id){
    M()->query("CREATE TABLE `ib_data_bridge$id` (`id` int(11) NOT NULL AUTO_INCREMENT,
                     `sensor_id` int(11) NOT NULL,
                     `sensor_model` varchar(255) NOT NULL,
                     `name` varchar(255) DEFAULT NULL,
                     `bridge_id` int(11) NOT NULL,
                     `value` double(255,3) NOT NULL,
                     `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                     `temperature` double(255,2) DEFAULT NULL,
                     PRIMARY KEY (`id`)
                    ) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8");
  }
  public function logout(){
      session(null);
      $this->success('退出成功，返回首页','__APP__');
  }  
}