<?php
class galery_not_login{
	private $template;
	protected $photos;
	protected $photos_count;
	protected $center;
	public function __construct(){
		$this->template = new CTemplate("templates/galery.htm");
    $this->sql= new sql();
		$this->photos = $this->galery_loop();
		$this->photos_count=count($this->galery_loop());
		$this->center=round($this->photos_count/2);
	}
	function galery_loop(){
    foreach($this->sql->sql('SELECT * FROM `b.galery` where type like "0" ') as $sql_loop){
		   $sql_array[] = array(
              'id'  => $sql_loop['id'],
              'sorce' => $sql_loop['sorce']
          );
    }
		return $sql_array;
	}
  function add_teplete_loop_galery($temolete,$lopp_name){
    $arrayJS = new CTemplate("templates/".$temolete.".htm");
    $number=1;
      foreach($this->photos as $loop){
        $HTML[]=array(
          'SORCE' => $loop['sorce'],
          'ID'=>     $loop['id'],
          'number'=> $number
        );
        $number++;
      }
    $arrayJS->CLoop($lopp_name,$HTML);
    return $arrayJS->CGet();
  }
	public function show_galery(){
		 $this->template->CAdd('[#JS#]',$this->add_teplete_loop_galery('galeryJS','loop'));
     $this->template->CAdd('[#MINGALRY#]',$this->add_teplete_loop_galery('galeryminLOOP_noadmin','galery_min'));
		return $this->template->CGet();
	}
}
class galery extends  galery_not_login{
  public function __construct(){
    $this->template = new CTemplate("templates/galeryLogin.htm");
    $this->sql= new sql();
    $this->photos = $this->galery_loop();
    $this->photos_count=count($this->galery_loop());
    $this->center=round($this->photos_count/2);
  }
  public function show_galery(){
      $this->template->CAdd('[#JS#]',$this->add_teplete_loop_galery('galeryJS','loop'));
      $this->template->CAdd('[#MINGALRY#]',$this->add_teplete_loop_galery('galeryminLOOP','galery_min'));
      return $this->template->CGet();
  }
}
class photo_info{
  public $sql;
  public  $date_info;
  public function __construct($id){
     $this->sql= new sql();
     $this->get_data($id);
     $this->date_info;

  }
  function get_data($id){
    foreach($this->sql->sql('SELECT * FROM `b.galery` where id ='.intval($id).'; ') as $sql_loop){
  
           $this->date_info['sorce']= $sql_loop['sorce'];
           $this->date_info['id']= $sql_loop['id'];
           
        
    }
  }
}
class photo_delete extends photo_info{
  function step(){
      $this->sql->MsQuery('DELETE FROM `b.galery` WHERE `b.galery`.`id` = '.intval($this->date_info['id']).'');
  }
}
class galery_ajax extends galery{
    function step(){
       return $this->add_teplete_loop_galery('galeryminLOOP','galery_min');
    }
}
class messages{
    protected $template;
    protected $mesages=array();
    protected $sql;
    protected $date;
    function __construct(){
      $this->template= new CTemplate("templates/mian_mesages.htm");
      $this->sql= new sql();
      $this->mesages_array(); 
    } 
    protected function mesages_array(){
      $count_mesages=$this->sql->countsql('SELECT COUNT(id) FROM `b.mesages` where reed=0');
      if($count_mesages>0){
         $sort='SELECT * FROM `b.mesages` ORDER BY `b.mesages`.`reed` ASC';
      }else{
        $sort='SELECT * FROM `b.mesages` ORDER BY `b.mesages`.`time` DESC';
      }
      foreach($this->sql->sql($sort) as $sql_loop){
          $data= new date($sql_loop['time']); 
            $this->mesages[] = array(
                'id'            => $sql_loop['id'],
                'NOt_reed'      => $this->return_reed($sql_loop['id'],'loop_elemnt_massages','NOt_reed'),
                'subject'       => $sql_loop['subject'],
                'contents'      => $sql_loop['contents'],
                'phone_form'    => $sql_loop['phone_form'],
                'emial'         => $sql_loop['emial'],
                'time'          => $data->count_later_mormal(3),
                'reed'          => $sql_loop['reed'],
                'reed_icon'     =>$this->return_reed($sql_loop['id'],'glyphicon glyphicon-ok','glyphicon glyphicon-remove')
            );
      }
    }
   public  function return_reed($id,$true,$false){
       $messages_info= new messages_info($id);
      if($messages_info->If_reed()){
         return $true;
      }else{
          return $false;
      }
   }
   public  function load_mesages(){
      if(count($this->mesages)==0){
           $this->template->CAdd('[#ZERO#]','<div id="loop_elemnt_massages" ><div id="mess_zero">Brak nowych wiadmosci</div></div>');
      }
      $this->template->Cloop('mesages',$this->mesages);
      return $this->template->CGet();
    }
}
class mesages_load_ajax extends messages{
    public function step(){
      return $this->load_mesages();
    }

}
class messages_info{
     private   $id;
     private   $sql;
     public   $mesages_info= array();
    function __construct($id){
        $this->sql= new sql();
        $this->id=$id;
        $this->messages_ditels();
        
    }
    private  function messages_ditels(){
         foreach($this->sql->sql('SELECT * FROM `b.mesages` WHERE `id` = '.intval($this->id).'') as $sql_loop){
              $this->mesages_info['id']=$sql_loop['id'];
              $this->mesages_info['name']=$sql_loop['name'];
              $this->mesages_info['reed']=$sql_loop['reed'];
              $this->mesages_info['emial']=$sql_loop['emial'];
              $this->mesages_info['subject']=$sql_loop['subject'];
              $this->mesages_info['contents']=$sql_loop['contents'];
              $this->mesages_info['time']=$sql_loop['time'];
              $this->mesages_info['phone_form']=$sql_loop['phone_form'];
              $this->mesages_info['type']=$sql_loop['type'];
         }
    }
   public function If_reed(){
       if($this->mesages_info['reed']==0){
         return false;
       }else{
          return true;
       }
    }
}
