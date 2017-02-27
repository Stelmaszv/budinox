<?php
	session_start();
	include 'class/class.mechanizm.php';
	include 'class/class.CTemplate.php';
	include 'class/class.galleryy.php';
	include 'class/CMS.php';
	include 'class/class.viev.php';
	$index=new view();
	echo $index->view();
?>

