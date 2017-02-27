<?php
	class actions{
		function action($get){
			$actions['logout']=new log_out('login');
			$action=$actions[$get];
			$action->execute();
		}
		
	}
  class set_characters{
    static function characters($limit,$text){
      $znaki=strlen($text);
      if($znaki>$limit){
          $kropa="...";
          $znaki=substr($text, 0,$limit).$kropa;
      }else{
          $kropa="";
          $znaki=$text;
      }     
      return $znaki;
                  
    }
  }
	class date{
     private $data;
     private $data_detils;
      function __construct($data){
          $this->data=$data;
      }
      private function convert_data(){
          $day=date('d',$this->data);
          $mout=date('m',$this->data);
          $year=date('Y',$this->data);
          $huer=date('H',$this->data);
          $sec=date('i',$this->data);
          $mini=date('s',$this->data);
        return  $data2=''.$year.'-'.$mout.'-'.$day.' '.$huer.':'.$sec.':'.$mini.''; 

      }
      private function set_value($data){
          $data_aktualna = Date('Y-m-d H:i:s');
          $liczba_sekund_dla_wydarzenia = StrToTime($data);
          $liczba_sekund_dla_aktualnej_daty = StrToTime($data_aktualna);
          $liczba_sekund_miedzy_datami =
          $liczba_sekund_dla_aktualnej_daty-$liczba_sekund_dla_wydarzenia;
          $liczba_sekund_w_roku = 365*24*60*60;
          $liczba_sekund_w_miesiacu = 30*24*60*60;
          $tydzien=$liczba_sekund_w_miesiacu/4;
          $liczba_sekund_w_dniu = 24*60*60;
          $liczba_sekund_w_godzinie = 60*60;
          $liczba_sekund_w_minucie = 60;
          $this->data_detils['years']= Floor ($liczba_sekund_miedzy_datami/$liczba_sekund_w_roku);
          $this->data_detils['mount']= Floor ($liczba_sekund_miedzy_datami/$liczba_sekund_w_miesiacu);
          $this->data_detils['days']= Floor ($liczba_sekund_miedzy_datami/$liczba_sekund_w_dniu);
          $this->data_detils['hours']= Floor ($liczba_sekund_miedzy_datami/$liczba_sekund_w_godzinie);
          $this->data_detils['minut']= Floor ($liczba_sekund_miedzy_datami/$liczba_sekund_w_minucie);
          $this->data_detils['weeks']= Floor ($liczba_sekund_miedzy_datami/$tydzien);
      }
      public function count_later_mormal($day){
        $this->set_value($this->convert_data());
        if($day>$this->data_detils['days']){
            return $this->count_down();
        }else{
            return $this->normal_form();
        }
      }
      public function normal_form(){
              $dataw = date('d',$this->data);
              $datam = date('m',$this->data);
                  switch ($datam) {
                        case '12';
                        $mies='Grudnia';
                        break;
                        case '11';
                        $mies='Listopada';
                        break;
                        case '10';
                        $mies='Pażdziernika';
                        break;
                        case '09':
                        $mies='Wrzeseńa';
                        break;
                        case '08':
                        $mies='Sierpieńa';
                        break;
                        case '07':
                        $mies='lipca';
                        break;
                        case '06':
                        $mies='Czerwca';
                        break;
                        case '05';
                        $mies='Maj';
                        
                        break;
                        case '04':
                        $mies='Kwietnia';
                        
                        break;
                        case '03':
                        $mies='Marca';
                        
                        break;
                        case '02':
                        $mies='Lutego'; 
                        break;
                        case '01':
                        $mies='Stycznia'; 
                        break;
                    }
                $wuswieldate=''.$dataw.' '.$mies.' '.date('Y',$this->data).'';      
                return $wuswieldate;
      }
      public function count_down(){
               $this->set_value($this->convert_data());
        return $this->count_down_function();

      }
      public function both_dates(){
          return $this->normal_form().' ( '.$this->count_down().' )';
      }
      private function count_down_function(){
              $lat=$this->data_detils['years'];
              $mniut=$this->data_detils['minut'];
              $mesy=$this->data_detils['mount'];
              $godzin=$this->data_detils['hours'];
              $dni=$this->data_detils['days'];
              $tydzien=$this->data_detils['weeks'];
              if($lat==0 && $mesy==0 && $godzin==0 && $mniut==0 && $tydzien==0 && $dni==0){
                $dodano='W tej chwili';
              }else if($lat==0 && $mesy==0 && $godzin==0 && $mniut!=0 && $tydzien==0 && $dni==0){
                $dodano=$mniut.' minuty temu';
              }else if($lat==0 && $mesy==0 && $godzin!=0 && $mniut!=0 && $tydzien==0 && $dni==0){
                if($godzin==1){
                  $dodano='godzine temu';
                }else{
                  $dodano= $godzin.' Godzin temu'; 
                }
              }else if($lat==0 && $mesy==0 && $godzin!=0 && $mniut!=0 && $tydzien==0 && $dni!=0){
                if($tydzien==1){
                  $dodano ='wczoraj';
                }else{
                  $dodano= $dni.' dni temu';
                }
              }else if($lat==0 && $mesy==0 && $godzin!=0 && $mniut!=0 && $tydzien!=0 && $dni!=0){
                if($tydzien==1){
                   $dodano= 'tydzień temu';
                }else{
                   $dodano= $tydzien.' tygodnie  temu';  
                }
              }else if($lat==0 && $mesy!=0 && $godzin!=0 && $mniut!=0 && $tydzien!=0 && $dni!=0){
                if($mesy==1){
                  $dodano='Miesiąc temu';
                }else{
                  $dodano=$mesy.' Miesięcy temu';
                }

              }else if($lat!=0 && $mesy!=0 && $godzin!=0 && $mniut!=0 && $tydzien!=0 && $dni!=0){
                if($lat==1){
                  $dodano='rok temu';
                }else{
                  $dodano=$lat.' lat temu';
                }

              }
              return $dodano;
      }
  }
	class log_out extends sesion{
		function execute(){
			$this->log_out();
		}
	}
 	class sesion{
 		var  $sesion;
 		var  $sql;
 		function __construct($sseion){
 			$this->sesion=$sseion;
 			$this->sql= new sql();
 		}
 		function isset_sesion(){
 			if(isset($_SESSION[$this->sesion])){
 				return 1;
 			}else{
 				return 0;
 			}
 		}
 		function try_login($login,$password){
 			if(!$this->sql->checksql('SELECT * FROM `b.admin` where login like "'.mysql_real_escape_string($login).'" and password like "'.mysql_real_escape_string(md5($password)).'" ')){
 				$_SESSION[$this->sesion]=true;
        return 1;
 			}else{
 				return 0;
 			}
 		}
 		function log_out(){
 			session_destroy();
			header("location: ../index.php");
 		}
 	}
 	class get{
 		private $get;
 		function __construct($get){
 			$this->get=$get;
 		}
 		function isset_get(){
 			if(isset($_GET[$this->get])){
 				return true;
 			}
 		}
 	}
 	class db_conect{
 		function __construct($dbuser,$dbpass,$dbname,$dbhost){
		     $this->handle = mysql_connect($dbuser,$dbpass,$dbhost)or die("zle dane do bazy");
		      $q = mysql_select_db($dbname,$this->handle) or die ("zla baza danych");
		} 
 	}
 	class sql{ 
 			var  $data=array();
 			function __construct($data=false){
 				$this->data=$data;
 				new db_conect("mysql.cba.pl","stelmaszv","stelmaszv","Samlogan007");
 			}
		    public function sql($sql){
		      $ret=array();
		      $qwery=mysql_query($sql);
		         while($text = mysql_fetch_assoc($qwery)){
		          $ret[]=$text;
		         }
		      return $ret;   
		    } 
		    function  checksql($sql){
			   if(mysql_num_rows(mysql_query($sql))==0){
			        return true;
			   }else{
			        return false;
			   }
    		}
    		public function countsql($sql){
           		$zap=mysql_query($sql);
           		$wynik = mysql_result($zap, 0);
            return $wynik;
   			}
    		public function MsQuery($sql){
    			mysql_query($sql);
    		}

 	}
 	class ajax_login{
 		var $sesion;
 		var $login;
 		var $password;
 		function __construct($login,$password){
 			$this->sesion= new sesion("login");
 			$this->login=$login;
 			$this->password=$password;
 		}
 		function step(){
 			return $this->sesion->try_login($this->login,$this->password);
 		}
 	}
  class mesage_action{
     public $menu;
     public function actions(){
        if($this->messInfo->mesages_info['type']=="received"){
            $this->reeded();
            $this->mesage_anser();
            $this->delete_mesage();
        }else{
          $this->menu="Ta wiadmość została wysłana przez ciebie";
        }
        return $this->menu;
     }
     public function  reeded(){
         $icon=$this->messages->return_reed($this->messInfo->mesages_info['id'],'glyphicon glyphicon-ok','glyphicon glyphicon-remove');
          $this->menu.='<spam onclick="sain_reed_VIEV('.$this->messInfo->mesages_info['id'].')" id="action_icon"  class="'.$icon.'" ></spam>';
     }
     public function delete_mesage(){
         $this->menu.= '<spam onclick="delete_mesage_VIEV('.$this->messInfo->mesages_info['id'].')" id="action_icon"  class="glyphicon glyphicon-trash" ></spam>';
     }
     public function mesage_anser(){   
      $subject=$this->messInfo->mesages_info['subject'];
      $val=$this->messInfo->mesages_info['subject'];
      $this->menu.= "<spam id=anser>
            <spam onclick=annser_mesage(".$this->messInfo->mesages_info['id'].",'".$val."','on') id=action_icon_aser  class='glyphicon glyphicon-envelope' ></spam>
          </spam>";
     }
  }
  class mesage_load extends mesage_action{
    private $template;
    function __construct($id){
       $this->messInfo=new messages_info($id);
       $this->template = new CTemplate("templates/mesages_view.htm");
       $this->date= new date($this->messInfo->mesages_info['time']);  
       $this->sql= new sql();
       $this->messages= new messages();
    }
    function add_elements(){
      $this->template->CAdd("[#ACTION#]",$this->actions());
      $this->template->CAdd("[#NAME#]",$this->messInfo->mesages_info['name']);
      $this->template->CAdd("[#EMIAl#]",$this->messInfo->mesages_info['emial']);
      $this->template->CAdd("[#Phone#]",$this->messInfo->mesages_info['phone_form']);
      $this->template->CAdd("[#TIME#]",$this->date->both_dates());
      $this->template->CAdd("[#SUBJECT#]",$this->messInfo->mesages_info['subject']);
      $this->template->CAdd("[#CONTENT#]",$this->messInfo->mesages_info['contents']);
    }
    function select_as_reed(){
        $this->sql->MsQuery('UPDATE `b.mesages` SET `reed` = 1 WHERE `b.mesages`.`id` = '.intval($this->messInfo->mesages_info['id']).'');
    }
    function step(){
      $this->add_elements();
      $this->select_as_reed();
      return  $this->template->CGet();
    }
  }
  class message_sign_as_reed{
      function __construct($id){
          $this->sql= new sql();
          $this->messInfo = new mesage_load($id);
      }
      function step(){
          $this->messInfo->select_as_reed();
      }
  }
  class delate_message{
      function __construct($id){
          $this->id=$id;
          $this->sql= new sql();
      }
      function step(){
         $this->sql->MsQuery('DELETE FROM `b.mesages` WHERE `b.mesages`.`id` = '.intval($this->id).'');
      }
  }

  class ansser_message{
      private $array=array();
      function __construct($array,$id){
        $this->array=$array;
        $this->sql= new sql($array);
        $this->messInfo = new messages_info($id);
        $this->array['name_sent']="Łukasz Murawski";
        $this->array['emial']="L.murawski@budinox.com";
        $this->array['phone_form']="777 XXX XXX";
      }
      function step(){
        $to      = 'stelmaszv@gmail.com';
        $subject = $this->array['subject_name'];
        $message = '
        <html>
        <head>
          <title>'.$this->array['subject_name'].'</title>
        </head>
        <body>
          <p>Wiadmosc od Firmy Budinox</p>
          <div>
            '.$this->array['contents_text'].'
          </div>
            <p>Łukasz Murawski - Budinox</p>
            <div>
              emial - '.$this->array['emial'].'
            </div>
            <div>
              Telfon - '.$this->array['phone_form'].'
            </div>
        </body>
        </html>
        ';
        $headers  = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
        $headers .= 'To: Budinox <L.murawski@budinox.com>'. "\r\n";
        $headers .= 'From: '.$this->array['name_sent'].' <'.$this->array['emial'].'>' . "\r\n";
        //$headers .= 'Cc: birthdayarchive@example.com' . "\r\n";
        $headers .= 'Bcc: birthdaycheck@example.com' . "\r\n";
        mail($to, $subject, $message, $headers);
        $this->array['subject_name'].=' - <spam id=sennt>wysłno</spam>';
        $this->sql->MsQuery('INSERT INTO `b.mesages` (`id`,`name`, `subject`, `contents`, `phone_form`, `emial`, `time`,`reed`,`type`) 
        VALUES (
        NULL,"Łukasz Murawski",
        "'.mysql_real_escape_string($this->array['subject_name']).'",
        "'.mysql_real_escape_string($this->array['contents_text']).'",
         '.intval($this->array['phone_form']).',
         "'.mysql_real_escape_string($this->array['emial']).'",
         '.intval(time()).',
          "1","sennt")');
      }      
  }
  class update_content{
     private $array=array();
      function __construct($array){
          $this->array=$array;
          $this->save_changes= new save_changes($this->array['id_mesage'],false);      
      }
      function step(){
        $this->save_changes->ditels['id']=$this->array['id_mesage'];
        $this->save_changes->save($this->array['contents_text'],$this->array['subject_name']);

      }
  }
  class add_sermnet_ajax{
    private $array=array();
    private $object;
    function __construct($object,$array){
        $this->object=$object;
        $this->array=$array;
        $this->save_changes= new save_changes($this->array['id_mesage'],false);
    }
    public function step(){
        $this->object->add($this->array['subject_name'],$this->array['contents_text']);
    }
  }
  class delete_ajax extends add_sermnet_ajax{
    private $array=array();
    private $object;
    function __construct($object,$array){
        $this->object=$object;
        $this->array=$array;
        $this->save_changes= new save_changes($this->array['id_mesage'],false);
    }
    public function step(){
      $this->object->delete($this->array['id_mesage']);
    }
  }
  class show_slite_ajax{
      protected  $slite;
      function __construct($sorce){
          $this->slite=new slite_preview(0,$sorce);
      }
      public function step(){
        return $this->slite->view_content();
      }
  }
  class show_slite_ajax_chuse{
      function __construct($sorce){
          $this->slite=new slite_chuse($sorce);
      }
      public function step(){
        return $this->slite->view_content();
      }
  }
  class update_slite_ajax{
    private $array=array();
    private $updata;
      function __construct($array){
          $this->updata= new update_slide();
          $this->array=$array;
      }
      public function step(){
        $this->updata->update($this->array['subject_name'],$this->array['contents_text'],$this->array['id_mesage']);
      }
  }
  class upload_photo{
       function __construct($array){
            $this->array=$array;
      }
      public function step(){
          return 'plik nazywa sie : '.$_FILES[$this->array['subject_name']]["tmp_name"].'';

      }
  }
  class normal{
    public function step(){
      return '';
    }
  }
  class refresh_html{
    function __construct($refresh){
      $this->refresh=$refresh;
    }
    function step(){
      $objects["galery"] = new galery_ajax();
      $objects["mesages"] = new mesages_load_ajax();
      $object=$objects[$this->refresh];

      return  $object->step();
    }
  }
  class update_owner extends ajax_sent_emial{
      function step(){
         $this->sql->MsQuery('UPDATE `b.oner` SET 
                                 `name` = "'.mysql_real_escape_string($this->array['name_sent']).'", 
                                 `email` = "'.mysql_real_escape_string($this->array['emial']).'", 
                                 `phon` = "'.mysql_real_escape_string($this->array['phone_form']).'" 
                                    WHERE `b.oner`.`id` = 1;');
      }
  }
 	class ajax{
 		var $ajax;
 		var $login;
 		var $password;
 		function __construct($ajax,$login,$password,$array_sent){
      if($ajax!=''){
 			  $this->ajax=$ajax;
      }else{
        $this->ajax='normal';
      }
 			$this->login=$login;
 			$this->array_sent=$array_sent;
 			$this->password=$password;
      $this->idmsage=$idmsage;
 		}
 		public function load_ajax(){
 			$objects["trylogin"] = new ajax_login($this->login,$this->password);	
      $objects["sign_mesage_as_reed"]= new message_sign_as_reed($this->array_sent['id_mesage']);
 			$objects["sent"] 	 = new ajax_sent_emial($this->array_sent);	
      $objects["load_messag"]= new mesage_load($this->array_sent['id_mesage']);
      $objects["delete_mesage"]= new delate_message($this->array_sent['id_mesage']);
      $objects["sent_anser"]= new ansser_message($this->array_sent,$this->idmsage);
      $objects["Update"]= new update_content($this->array_sent);
      $objects["Update"]= new update_content($this->array_sent);
      $objects["add_servment"]= new add_sermnet_ajax(new add_sermnet(),$this->array_sent);
      $objects["delete"]= new delete_ajax(new delete_serment(),$this->array_sent);   
      $objects["show_slite"]= new show_slite_ajax('slite_preview');   
      $objects["edition_slite"]= new show_slite_ajax('edition_slite');  
      $objects["update_slite"]= new update_slite_ajax($this->array_sent); 
      $objects["chuse_slide"]= new show_slite_ajax('chuse_slide'); 
      $objects["chuse_slide2"]= new show_slite_ajax_chuse('chuse_slide');
      $objects["upload_photo"]= new  upload_photo($this->array_sent);
      $objects["normal"]= new  normal();
      $objects["delete_IMG"]= new  photo_delete($this->array_sent['id_mesage']);
      $objects["refresh_html"]= new  refresh_html($this->array_sent['subject_name']);
      $objects["update_owner"]= new  update_owner($this->array_sent);
      $object=$objects[$this->ajax];
 			return  $object->step();
 		}
 	}
 	class ajax_sent_emial{
 			protected $array=array();
 			function __construct($array){
 				$this->array=$array;
 				$this->sql= new sql($array);
 			}
 			function step(){
				$to      = 'stelmaszv@gmail.com';
				$subject = $this->array['subject_name'];
				$message = '
				<html>
				<head>
				  <title>'.$this->array['subject_name'].'</title>
				</head>
				<body>
				  <p>Wiadmosc od '.$this->array['name_sent'].'</p>
				  <div>
				  	'.$this->array['contents_text'].'
				  </div>
				  	<p>Dane Kontaktowe do '.$this->array['name_sent'].'</p>
				  	<div>
				  		emial - '.$this->array['emial'].'
				  	</div>
				  	<div>
				  		Telfon - '.$this->array['phone_form'].'
				  	</div>
				</body>
				</html>
				';
				$headers  = 'MIME-Version: 1.0' . "\r\n";
				$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
				$headers .= 'To: Lukasz Murawski <L.murawski@budinox.com>'. "\r\n";
				$headers .= 'From: '.$this->array['name_sent'].' <'.$this->array['emial'].'>' . "\r\n";
				//$headers .= 'Cc: birthdayarchive@example.com' . "\r\n";
				$headers .= 'Bcc: birthdaycheck@example.com' . "\r\n";
				mail($to, $subject, $message, $headers);
			   $this->sql->MsQuery('INSERT INTO `b.mesages` (`id`,`name`, `subject`, `contents`, `phone_form`, `emial`, `time`,`reed`,`type`) 
        VALUES (
        NULL,"'.mysql_real_escape_string($this->array['name_sent']).'",
        "'.mysql_real_escape_string($this->array['subject_name']).'",
        "'.mysql_real_escape_string($this->array['contents_text']).'",
         '.intval($this->array['phone_form']).',
         "'.mysql_real_escape_string($this->array['emial']).'",
         '.intval(time()).',
          "0","received")');
 			}

 	}


?>
