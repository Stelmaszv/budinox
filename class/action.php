<?php
	include 'class.mechanizm.php';
	session_start();
	$actions= new actions();
	$actions->action($_GET['action']);