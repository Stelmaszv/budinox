<?php
	include 'class/class.mechanizm.php';
	class file{
		public $file;
		public $sorce;
		function __construct($file,$sorce){
			$this->sorce=$sorce;
			$this->file=$file;
		}
		public function load_file(){
			$url=$this->sorce.'/'.$this->file['file']['name'];
			return $url;
		}
	} 
		$file = new file($_FILES,'galery');
echo 	$file->load_file();
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
