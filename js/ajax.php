<?php
	session_start();
	include 'class.CTemplate.php';
	include 'class.mechanizm.php';
	include 'class.galleryy.php';
	include 'CMS.php';
	
	$ajax_sent_data= array(
		'name_sent'     => $_POST['name_sent'],
		'subject_name'  => $_POST['subject_name'],
		'contents_text' => $_POST['contents_text'],
		'phone_form'  	=> $_POST['phone_form'],
		'id_mesage'  	=> $_POST['id_mesage'],
		'emial'  		=> $_POST['emial']
	);
	$ajax = new ajax($_POST['type'],$_POST['login'],$_POST['password'],$ajax_sent_data);

	echo $ajax->load_ajax(); 
     

        move_uploaded_file($_FILES['file']['tmp_name'], 'galery/' . $_FILES['file']['name']);
    
