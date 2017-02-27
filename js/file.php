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
			$sorce= opendir($this->sorce);
			$count;
			while($plik = readdir($sorce)){
				$count++;
			}
			$count=$count+1;
			$this->file[$this->name]['name']=$count.'.'.$this->extratction();
		}
		function size($height,$wight){
			$size = getimagesize('galery/' . $_FILES[$this->name]['name']);
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

			$this->file=$file;
			$this->set_object();

		}
		function set_object(){
			$count= count($this->file);
			for ($i = 0; $i <= $count; $i++) {
				if($this->file[$i]['name']!=''){
					switch ($i){
						case 0:
							$this->object_array[]=array(new file($this->file,'baner',$i));
						break;
					}
					if($i>0 && $i<= $count){
						$this->object_array[]=array(new file($this->file,'galery',$i));
					}
				}
			}
		}
	}
	$chusse=new chuse_file($_FILES);
	echo $chusse->$file_arry();
//echo 	$file->load_file();
	/*
	move_uploaded_file($_FILES['file']['tmp_name'], 'galery/' . $_FILES['file']['name']);
	$size = getimagesize('galery/' . $_FILES['file']['name']);
	if($size[1]==250 || $size[0]==1024){
		$sql = new sql();
		$sql->MsQuery('INSERT INTO `b.galery` (`id`, `sorce`, `type`) VALUES (NULL,"'.mysql_real_escape_string('galery/' . $_FILES['file']['name']).'","baner");');
		echo '<div id="sucess_notice">baner został wzucony</div>';

	}else{
		unlink('galery/' . $_FILES['file']['name']);
		echo '<div id="error_notice">baner ma nie poprawne rozmary<li>Wymagane: 1024x250</li></div>';
	}
	*/
