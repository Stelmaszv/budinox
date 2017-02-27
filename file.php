<?php
	include 'class/class.mechanizm.php';

	class file{
		public $file;
		public $sorce;
		public $url;
		function __construct($file,$sorce,$name){
			$this->sorce=$sorce;
			$this->file=$file;
			$this->name=$name;
			$this->set_name();
			$this->load_file();

		}
		function set_name(){
			$this->file[$this->name]['name']=md5(uniqid(rand(), true)).'.'.$this->extratction();
		}
		function size($height,$wight){
			$size = getimagesize($this->sorce.'/' . $_FILES[$this->name]['name']);
			if($size[1]==$height || $size[0]==$wight){
				return true;
			}else{
				return false;
			}
		}
		function extratction(){
			$file_info=pathinfo($this->file[$this->name]['name']);
			return $file_info['extension'];

		}
		public function load_file(){
			$this->url=$this->sorce.'/'.$this->file[$this->name]['name'];	
		}
		function Upload(){
			move_uploaded_file($this->file[$this->name]['tmp_name'],$this->url);
		}
		function delete_file(){
			unlink($this->url);
		}
	} 
	class chuse_file{
		private $object_array=array();
		function __construct($file){
			$this->sql=new sql();
			$this->file=$file;
			$this->set_object();

		}
		function set_object(){
			if(!empty($this->file['photo']['name'])){
				$this->object_array[]=array('object' => new file($this->file,'galery','photo'));
			}else{
				$this->object_array[]=array('object'=>new file($this->file,'baner','baner'));
			}
		}
		function file_arry(){
			$notice='';
			foreach($this->object_array as $file_object){
				$object=$file_object['object'];
				switch ($object->sorce) {
					case 'baner':
						$object->Upload();
						if($object->size(250,1050)){
							$this->sql->MsQuery('INSERT INTO `b.galery` (`id`, `sorce`, `type`) VALUES (NULL,"'.mysql_real_escape_string($object->url).'","'.mysql_real_escape_string($object->sorce).'");');
							$notice.= '<div id="sucess_notice">baner został wzucony</div>';
							$notice.='<img width="820px" src="'.$object->url.'">';
						}else{
							$notice.='<div id="error_notice">baner '.$object->url.' ma nie poprawnych rozmiarów<li>Wymagane: 1024x250</li></div>';
							$object->delete_file();
						}
					break;
					case 'galery':
						$object->Upload();
						$this->sql->MsQuery('INSERT INTO `b.galery` (`id`, `sorce`, `type`) VALUES (NULL,"'.mysql_real_escape_string($object->url).'","0");');
						$notice.= '<div id="sucess_notice">zdjęcie zostało  zostało dodane</div>';
						$notice.='<div id="photo_ajax_request"><img width="420" height="420" src="'.$object->url.'"></div>';
					break;

				}
			}
			return $notice;
		}
		
	}

	$chusse=new chuse_file($_FILES);
	echo $chusse->file_arry();
	
