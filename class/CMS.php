<?php
	class load_content{
		public $template;
		protected $sql;
		public $ditels=array();
		function __construct($id,$sorce){
			$this->sql= new sql();
			$this->template = new CTemplate('templates/'.$sorce.'.htm');
			$this->set_values($id);

		}
	 	function set_values($id){
			foreach($this->sql->sql('SELECT * FROM `b.content` where id= '.intval($id).' ') as $sql_loop){
				$this->ditels['id'] = $sql_loop['id'];
				$this->ditels['content'] = $sql_loop['content'];
				$this->ditels['photo'] = $sql_loop['photo'];
			}

		}
		function view_content(){
			$this->template->CAdd('[#PHOTO#]',$this->ditels['photo']);
			$this->template->CAdd('[#CONTENT#]',$this->ditels['content']);
			$this->template->CAdd('[#ID#]',$this->ditels['id']);
			return $this->template->CGet();
		}
	}
	class edition extends slite_preview{
		function view_content(){
			return $this->template->CGet();
		}
	}
	class slite_preview extends load_content{
		function __construct($id,$sorce){
			parent::__construct($id,$sorce);
		 	$this->slide = new slide();
		}
		function view_content(){
			$this->template->CLoop('loop_slite',$this->slide->slide_array);
			return $this->template->CGet();
		}
	}
	class save_changes extends load_content{
			public function save($valuecontent,$name){
					$this->sql->MsQuery('UPDATE `b.content` SET `content` = "'.mysql_real_escape_string($valuecontent).'" , `name` = "'.mysql_real_escape_string($name).'"  WHERE `b.content`.`id` = '.intval($this->ditels['id']).'');
			}
	}
	class servment extends load_content{
		protected $servemt_array=array();
		function __construct($sorce){
			$this->sql= new sql();
			$this->template = new CTemplate('templates/'.$sorce.'.htm');
			$this->servment_loop = new CTemplate('templates/servment_loop.htm');
			$this->servment_mian_admin = new CTemplate('templates/servment_mian_admin.htm');
			$this->count_sermnet=$this->sql->countsql('SELECT COUNT(id) FROM `b.content` where  type like "servment"  ');
		}
		protected function servment_array($limit=flase){
			$number=0;
			foreach($this->sql->sql('SELECT * FROM `b.content` where  type like "servment" limit '.intval($limit).' ') as $sql_loop){
					$this->servemt_array[]= array(
						'ID'		=> $sql_loop['id'],
						'NAME'		=> $sql_loop['name'],
						'CONTENT'   => $sql_loop['content'],
						'NUMBER' 	=> $number
					);
				$number++;
			}
		}
		function IF_more(){
			if($this->count_sermnet>0){
				$this->template->CAdd('[#SERVEMNT_LOOP#]',$this->load_servment());
				$this->servment_mian_admin->CIf('zero',1);
				$this->servment_mian_admin->CIf('zero_negation',0);
			}else{
				$this->servment_mian_admin->CIf('zero',0);
				$this->servment_mian_admin->CIf('zero_negation',1);
				$this->template->CAdd('[#SERVEMNT_LOOP#]','<div>Brak Usług</div>');
			}
		}
		function load_servment(){
			$this->servment_array($this->count_sermnet);
			$this->servment_mian_admin->CLoop('loop_array_admin',$this->servemt_array);
			$this->servment_loop->CLoop('loop_array',$this->servemt_array);
			return $this->servment_loop->CGet();
		}
		function view_content(){	
			$this->IF_more();
			$this->template->CAdd('[#ADMIN#]',$this->servment_mian_admin->CGet());
			return $this->template->CGet();
		}
	}
	class servment_not_login extends servment{
		function view_content(){	
			$this->IF_more();
			$this->template->CAdd('[#ADMIN#]',$this->servment_mian_admin->CGet());
			return $this->template->CGet();
		}
	}
	class owner{
		static function owner_set(){
			$sql= new sql();
			foreach($sql->sql('SELECT * FROM `b.oner`') as $sql_loop){
				$owner['name']=$sql_loop['name'];
				$owner['emial']=$sql_loop['email'];
				$owner['phon']= $sql_loop['phon'];
			}	
			return $owner;
		}
	}
	class slide{
		public $slide_array=array();
		public $sql;
		function __construct(){
			$this->sql= new sql();
			$this->set_slide();	
			
		}
		public  function set_slide(){
			$position=0;
			foreach($this->sql->sql('SELECT * FROM `b.slide`') as $sql_loop){
					$this->slide_array[]= array(
						'ID'		=> $sql_loop['id'],
						'text'		=> $sql_loop['text'],
						'photo'   	=> $sql_loop['photo'],
						'div'       => $sql_loop['div'],	
						'div_text'	=> $sql_loop['div_text'],
						'div_edit'  => $sql_loop['div_edit'],
						'position'  => $position
					);
				$position++;

			}
		}
	}
	class slite_chuse extends slite_preview{
		public $slide_array= array();
		function __construct($sorce){
			$this->sql= new sql();
			$this->template = new CTemplate('templates/'.$sorce.'.htm');
			$this->slide_array=array();
			$this->set_valueS();
		}
		function set_valueS(){
			$position=0;
			foreach($this->sql->sql('SELECT * FROM `b.galery` where type like "baner"') as $sql_loop){
					$this->slide_array[]= array(
						'ID'		=> $sql_loop['id'],
						'photo'   	=> $sql_loop['sorce'],
						'position'  => $position
					);
				$position++;

			}
		}
		function view_content(){
			$this->template->CLoop('loop_slite',$this->slide_array);
			return $this->template->CGet();
		}
	}
	class update_slide{
		function __construct(){
			$this->sql= new sql();
		}

		function update($text,$photo,$ID){
			$this->sql->MsQuery('UPDATE `b.slide` SET `text` = "'.mysql_real_escape_string($text).'" ,`photo` = "'.$photo.'" WHERE `id` = '.intval($ID).'');
		}
	}
	class view_mian_page extends servment{
		protected $servemt_array=array();
		private  $contack;
		function __construct($id,$sorce){
			 parent::__construct($id,$sorce);
			 $this->obout= new load_content(1);
			 $this->sesion= new sesion('login');		
			 $this->servment_array(2);
			 $this->set_contact();
			 $this->slide = new slide();
		}
		private function set_contact(){
			$owner=owner:: owner_set();
			$this->contack= '<div id="name_div">'.$owner['name'].'</div>';
			$this->contack.= '<div id="name_div">'.$owner['emial'].'</div>';
			$this->contack.= '<div id="name_div">'.$owner['phon'].'</div>';
		}
		private function  add_elemnts(){
			$this->template->CAdd('[#ADMIN#]',$this->sesion->isset_sesion());
			$this->template->CLoop('slide',$this->slide->slide_array);
			$this->template->CLoop('serment',$this->servemt_array);
			$this->template->CAdd('[#FIRMTEXT#]',set_characters::characters(95,$this->obout->ditels['content']));
			$this->template->CAdd('[#CONTACKT#]',$this->contack);
		}
		public function view_content(){

			$this->add_elemnts();
			return $this->template->CGet();
		}
	}
	class add_sermnet extends save_changes{
		public function add($name,$content){
			$this->sql->MsQuery('INSERT INTO `b.content`(`id`, `name`, `content`, `photo`, `type`) VALUES(null,"'.mysql_real_escape_string($name).'","'.mysql_real_escape_string($content).'","","servment") ');
		}
	}
	class delete_serment extends add_sermnet{
		public function delete($id){
			$this->sql->MsQuery('DELETE FROM `b.content` WHERE `id` = '.intval($id).'');
		}
	}