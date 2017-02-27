<?php
 class mian_page_not_login{
 	private $template;
 	private $galery;
 	private $get;
 	protected $sql;
 	  public function __construct(){
 		  $this->template = new CTemplate("templates/index.htm");
 		  $this->galery  = new galery_not_login();
 		  $this->sql= new sql();
 		  $this->get = new get('admin');
      $this->view_mian_page = new view_mian_page('min_page');
      $this->about      = new load_content(1,'about');
      $this->servment   = new servment_not_login('servmnet_admin');
      $this->contact    = new load_content(2,'kontakt');
  	}
  	function add_Elemts(){
      $this->template->CAdd('[#contact#]',$this->contact->view_content());
      $this->template->CAdd('[#OFERT#]',$this->servment->view_content());
      $this->template->CAdd('[#ABOUTFIRM#]',$this->about->view_content());
  		$this->template->CAdd('[#GALERY#]',$this->galery->show_galery());
      $this->template->CAdd('[#MAIN_PAGE#]',$this->view_mian_page->view_content());
  	}
 	public function show_all(){
 		$this->add_Elemts();
 		$this->template->CIf('admin_LOGIN',$this->get->isset_get());
 		return $this->template->CGet();
 	}
 }
 class mian_page extends mian_page_not_login{
 	private $messages;
 	public function __construct(){
 		$this->sql        = new sql();
 		$this->template   = new CTemplate("templates/index_admin.htm");
 		$this->messages   = new messages();
 		$this->galery     = new galery();
 		$this->get        = new get('admin');
    $this->about      = new load_content(1,'about_admin');
    $this->contact    = new load_content(2,'kontakt_admin');
    $this->servment   = new servment('servmnet_admin');
    $this->view_mian_page = new view_mian_page('min_page');

   	}
  	public function show_all(){
        $this->template->CAdd('[#MAIN_PAGE#]',$this->view_mian_page->view_content());
        $this->template->CAdd('[#GALERY#]',$this->galery->show_galery());
  			$this->template->CAdd('[#ADMIN#]',$this->messages->load_mesages());
        $this->template->CAdd('[#ABOUTFIRM#]',$this->about->view_content());
        $this->template->CAdd('[#contact#]',$this->contact->view_content());
        $this->template->CAdd('[#OFERT#]',$this->servment->view_content());
  			$this->template->CAdd('[#COUNT#]',$this->sql->countsql('SELECT COUNT(id) FROM `b.mesages` where reed=0'));
  		return $this->template->CGet();
  	}
 }
 class view{
 		var $sesion;
 	function __construct(){
 		$this->sesion= new sesion('login');	
 		
 	}
 	function view(){
 		$views[0]=new mian_page_not_login();
 		$views[1]=new mian_page();
 		$view=$views[$this->sesion->isset_sesion()];
 		return $view->show_all();
 	}
 }