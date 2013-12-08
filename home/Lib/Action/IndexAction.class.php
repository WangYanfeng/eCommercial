<?php
// 本类由系统自动生成，仅供测试用途
class IndexAction extends Action {
    public function index(){
    	//$this->display();
    	$this->display('login');
	}
	function login(){
    	if($this->isPost()){
    		$user = $_POST['userName'];
            $pwd = $_POST['password'];
            $DBuser_basic=D('user_basic');
            $res=$DBuser_basic->where("account='" . $user . "' AND pwd='" . $pwd. "'")->find();
            $id=$res['id'];
            if ($res) {
                session('user', array(
                            'id' => $res['id'],
                            'account' => $res['account']
                ));
                //echo $_SESSION['user']['name'];die();
                header('Location: index.php?m=GameHall&a=hall');
            }else{
                $result='密码错误';
                $this->assign('result',$result);
                $this->display();
            }
    	}else{
    		$this->display();
    	}
    }
    function regist(){
        if($this->isPost()){
            $data['account']=I('userName');
            $data['pwd']=I('userPassword');
            $data['email']=I('userEmail');
            $data['in_time']=date('y-m-d H:i:s',time());
            $res=filter_var($data['email'],FILTER_VALIDATE_EMAIL);
            if($res==false){
                echo "邮箱格式错误！";
            }else{
                $DBuser=D('user_basic');
                $res=$DBuser->where("account='".$data['account']."'")->find();
                if($res){
                    echo "用户名已存在！";
                }else{
                    $res=$DBuser->add($data);
                    if($res){
                        $DBuser_active=D('user_active');
                        $id=$DBuser->where("account='".$data['account']."'")->getField('id');
                        $act_data['uid']=$id;
                        $act_data['time']=date('y-m-d H:i:s',time());
                        $DBuser_active->add($act_data);
                        echo "success";
                    }
                }
            }
        }else{
            $this->display();
        }
    }
    public function logout(){
        session(null);
        $this->success('退出成功，返回首页','__APP__');
    }  
}