function get_ID(DIV){
	return document.getElementById(DIV)
}
var menu=[];
function main_menu(index,div,aktual,menu){
	var menu=[];
		menu[0]=['Strona głowna','main_page'];
		menu[1]=['o firmie','about_firm'];
		menu[2]=['Usługi','ofert'];
		menu[3]=['galeria','galery'];
		menu[4]=['kontakt','contact'];
		index=index;


		function menu_loop(){
			menuHTML='';	
			get_ID('menudiv').innerHTML='';
			for(var x = 0; x < menu.length; x++){
				click="chused_ITEM("+x+")";
				if(index==x){
					//get_ID(menu[x][1]).style['display']='block';
					$( "#"+menu[x][1]+"" ).slideDown( "slow" );
				}else{

					$( "#"+menu[x][1]+"" ).slideUp( "slow" );
				}
				menuHTML+="<div  id="+match_index(x,index)+" onclick="+click+">"+menu[x][0]+"</div>";	
			}
			return menuHTML;
		}
		function match_index(atual,equl){
			div='';
			if(atual==equl){
				if(atual>0){
					div='actual_first';
				}else{
					div='actual';
				}
			}else{
				div='menu_elment';
			}
			return div;
		}
		return menu_loop();

}
function nemufuter(index){
	var menu=[];
		menu[0]=['Strona głowna','main_page'];
		menu[1]=['o firmie','about_firm'];
		menu[2]=['Usługi','ofert'];
		menu[3]=['galeria','galery'];
		menu[4]=['kontakt','contact'];
		index=index;
		if(index==4){
			gmap3_START();
		}
		function menu_loop(){
			menuHTML='';	
			get_ID('futer_menu').innerHTML='';
			for(var x = 0; x < menu.length; x++){
				click="chused_ITEM("+x+")";
				if(index==x){
					//get_ID(menu[x][1]).style['display']='block';
					$( "#"+menu[x][1]+"" ).slideDown( "slow" );
				}else{

					$( "#"+menu[x][1]+"" ).slideUp( "slow" );
				}
				menuHTML+="<div  id="+match_index(x,index)+" onclick="+click+">"+menu[x][0]+"</div>";	
			}
			return menuHTML;
		}

		function match_index(atual,equl){
			div='';
			if(atual==equl){			
				div='actual_futer';
			}else{
				div='menu_elment_futer';
			}
			return div;
		}
		return menu_loop()
}
function nemufuter_admin(index,count){
	var menu=[];
		menu[0]=['Strona głowna','main_page'];
		menu[1]=['o firmie','about_firm'];
		menu[2]=['Usługi','ofert'];
		menu[3]=['galeria','galery'];
		menu[4]=['kontakt','contact'];
		menu[5]=['<spam id="stan_mes" class="glyphicon glyphicon-envelope" aria-hidden="true"></spam> <spam id="count_mes">'+maes+'</spam>','messagess'];
		menu[6]=['Edycjia','edit'];
		menu[7]=['<spam onclick="log_out_confirm()">wyloguj</spam>',''];
		index=index;
		if(count>0){
			maes=count;
		}else{
			maes='pusto';
		}
		if(index==4){
			gmap3_START();
		}
		function menu_loop(){
			menuHTML='';	
			get_ID('futer_menu').innerHTML='';
			for(var x = 0; x < menu.length; x++){
				click="chused_ITEM_admin("+x+","+count+")";
				if(index==x){
					//get_ID(menu[x][1]).style['display']='block';
					$( "#"+menu[x][1]+"" ).slideDown( "slow" );
				}else{

					$( "#"+menu[x][1]+"" ).slideUp( "slow" );
				}
				menuHTML+="<div  id="+match_index(x,index)+" onclick="+click+">"+menu[x][0]+"</div>";	
			}
			return menuHTML;
		}

		function match_index(atual,equl){
			div='';
			if(atual==equl){			
				div='actual_futer_admin';
			}else{
				div='menu_elment_futer_admin';
			}
			return div;
		}
		return menu_loop()
}
function gmap3_START(){
    			     $('#map').gmap3({

					                map: {
					                    options: {
					                        center: [52.078135,19.865674],
					                        zoom: 12,
					                        panControl: false,
					                        zoomControl: false
					                    }
					                },
					                marker: {
					                    values:[{
					                        latLng: [52.078135,19.865674],
					                        data: 'dabkowice dolne 49'
					                    }],
					                    events:{
					                        click: function(marker, event, context) {
					                            var map = $(this).gmap3('get'),
					                                infowindow = $(this).gmap3({get:{name:'infowindow'}});
					                            if (infowindow) {
					                                infowindow.open(map, marker);
					                                infowindow.setContent(context.data);
					                            } else {
					                                $(this).gmap3({
					                                    infowindow: {
					                                        anchor: marker,
					                                        options: {content: context.data}
					                                    }
					                                });
					                            }
					                        }
					                    }
					                }
            	});
}	
function massages_menu(index){
	var menu=[];
		menu[0]=['Imie i nazwisko','adreess'];
		menu[1]=['temat','subjest'];
		menu[2]=['tresc','content'];
		menu[3]=['data','time'];
		menu[4]=['akcjie','action'];
		function menu_loop(){
			menuHTML='';	
			get_ID('menudiv').innerHTML='';
			for(var x = 0; x < menu.length; x++){
				click="sort_on()";
				menuHTML+="<div  id="+menu[x][1]+" onclick="+click+">"+menu[x][0]+"</div>";	
			}
			return menuHTML;
		}
		function sort_on(){

		}
	  return menu_loop();
}
function anser_sent(ID,subject,content){

	$.post('class/ajax.php',{'type' : 'sent_anser',
			 
			 'name_sent'      :'1',
			 'subject_name'   :subject,
			 'contents_text'  :content,
			 'phone_form'  	  :'1',
			 'emial'  	  	  :'1'

	},function(ajax){
		$( "#list_place" ).fadeOut( "slow" );
		darkOFF();
		good_notice_ON();
		rest_form();
	});

}
function annser_mesage(ID,subject,$switch){
	
	if($switch=="on"){
		get_ID('subject').innerHTML='Odp : '+subject+'';
		$( "#content_messages_anser" ).slideDown( "slow" );
		get_ID('anser').innerHTML="<spam id='anser'><spam onclick=annser_mesage("+ID+",'"+subject+"','of') id=action_icon  class='glyphicon glyphicon-envelope' ></spam></spam>"
		get_ID('anserButon').innerHTML='<div id="anser_button">Wyslij</div>';
		
			form_field.splice(0,5);
			form_field[0]=['anser_form',get_ID('anser_form').value,'text_area','10','500','wpisz tresc Wiadmosc !','on'];
			get_ID('anser_form').addEventListener('click', function(event) {
					reset_form(0);
			});
			get_ID('anser_button').addEventListener('click', function(event) {
					if(start_validate()){
						anser_sent(ID,get_ID('subject').innerHTML,get_ID('anser_form').value);
					}
			});
	}else{
		get_ID('subject').innerHTML=subject;
		$( "#content_messages_anser" ).slideUp( "slow" );
		get_ID('anser').innerHTML="<spam id='anser'><spam onclick=annser_mesage("+ID+",'"+subject+"','on') id=action_icon  class='glyphicon glyphicon-envelope' ></spam></spam>"
	}
}
function delete_mesage_execute(ID){
	get_ID('no').click();
	$.post('class/ajax.php',{'type': 'delete_mesage','id_mesage' : ID},function(ajax){
		refresh_ajax('mesages','ajax_request');
	});
	notice_ON('Wiadmosc została unieteta');
}
function set_menus(){
	get_ID('menudiv').innerHTML=main_menu_admin(5,0);
}
function anser_ON(ID){
	load_message(ID);
	setTimeout(function(){ get_ID('action_icon_aser').click(); },400);
	
}
function text_lenght(text,limit){
	var res = text.substring(0,limit);
	if(limit<text.length){
		return res+'...';
	}else{
		return res;
	}
}
function delete_mesage(ID,text){
	text='<div style="margin:10px;">Czy napewno chcesz usunąc wiadmosc '+text_lenght(text,15)+'</div>';
	confirm_ON(text);
	get_ID('ok_JS_place').innerHTML='<spam onclick="delete_mesage_execute('+ID+'),set_menus()"  id="ok">Tak</spam>'
	
}
function slect_as_reed(ID){
	$.post('class/ajax.php',{'type': 'sign_mesage_as_reed','id_mesage' : ID},function(ajax){
		refresh_ajax('mesages','ajax_request');
	});
}
function main_menu_admin(index,count){
		if(count!='pusto'){
			if(count>0){
				maes=count;
			}else{
				maes='pusto';
			}
		}else{
			count=0;
		}
		if(index==4){
			gmap3_START();
		}
	var menu=[];
		menu[0]=['Strona głowna','main_page'];
		menu[1]=['o firmie','about_firm'];
		menu[2]=['Usługi','ofert'];
		menu[3]=['galeria','galery'];
		menu[4]=['kontakt','contact'];
		menu[5]=['<spam id="stan_mes"  class="glyphicon glyphicon-envelope" aria-hidden="true"></spam> <spam id="count_mes">'+maes+'</spam>','messagess'];
		menu[6]=['Edycjia','edit'];
		menu[7]=['<spam onclick="log_out_confirm()">wyloguj</spam>',''];
		index=index;


		function menu_loop(count){
			menuHTML='';	
			get_ID('menudiv').innerHTML='';
			for(var x = 0; x < menu.length; x++){
				
				if(index==x){
						click="chused_ITEM_admin("+x+","+count+")";
						$( "#"+menu[x][1]+"" ).slideDown( "slow" );
				}else{
						click="chused_ITEM_admin("+x+","+count+")";
						$( "#"+menu[x][1]+"" ).slideUp( "slow" );
				}
				menuHTML+="<div  id="+match_index_admin(x,index)+" onclick="+click+">"+menu[x][0]+"</div>";	
			}
			return menuHTML;
		}
		function div_manage(index){

		}
		function match_index_admin(atual,equl){
				div='';
				if(atual==equl){
					if(atual>0){
						div='actual_first';
					}else{
						div='actual';
					}
					if(atual==menu.length){
						div='last';
					}
				}else{
					div='menu_elment';
				}
				return div;
			

		}
		return menu_loop(count);

}
function sain_reed_VIEV(ID){
	load_message(ID);
	slect_as_reed(ID);

}
function delete_mesage_VIEV(ID){
	delete_mesage(ID,'')
	darkOFF();
	$( "#list_place" ).fadeOut( "slow" );
}
function chused_ITEM_admin(x,count){
	if(x<7){
		get_ID('menudiv').innerHTML=main_menu_admin(x,count);
	}
	get_ID('futer_menu').innerHTML=nemufuter_admin(x,count);
}


function chused_ITEM(x){
	get_ID('futer_menu').innerHTML=nemufuter(x);
	get_ID('menudiv').innerHTML=main_menu(x);
}
function show_submenu(){
	get_ID('sub_menu').style['display']='block';
		$("#sub_menu").animate({
				height:"200px"
		},1000,function(){
			//get_ID('slides_03').style['display']='none';
		});
}
function show_text(div){
	get_ID(div).style['display']='block';

}
function show_text_OFF(div){
	get_ID(div).style['display']='none';
}

function show_eror_login(){
	$( "#eroer_login" ).slideDown( "slow" );
}
function login_form_on(){
	$( "#login_form" ).slideDown( "slow" );
	form_field.splice(0, 5);
	form_field[0]=['login_form_place','login','text','20','','To pole jest Wymagane !'];
 	form_field[1]=['pass_word','hasło','password','10','','To pole jest Wymagane !'];
	document.addEventListener('keydown', function(event) {	
				switch(event.keyCode){
					case 27:
						darkOFF();
						$( "#login_form" ).slideUp( "slow" );
					break;

					case 13:
						get_ID('login_button').click();
					break;
				}
				
	});
	$( "#login_form_place" ).click(function( event ) {
		reset_form(0);
		change_style('login_form_place');
	});
	$( "#pass_word" ).click(function( event ) {
		reset_form(1);
		passhord_fild(1);
		change_style('pass_word');	

	});
	$( "#login_button" ).click(function( event ) {
			$.post('class/ajax.php',{'type': 'trylogin','login' : get_ID(form_field[0][0]).value,'password':get_ID(form_field[1][0]).value},function(ajax){
				 if(ajax==1){
				 	$( "#eroer_login" ).slideUp( "slow" );
				 	window.location.href='index.php';
				 }else{
				 	show_eror_login();
				 }
			});
	})
}
function confirm_off(){
	darkOFF();
	$( "#confirm_panel" ).fadeOut( "slow" );
}
function confirm_ON(text){
	darkON();
	get_ID('confirm_text').innerHTML=text;
	$( "#confirm_panel" ).slideDown( "slow" );
	document.addEventListener('keydown', function(event) {	
				switch(event.keyCode){
					case 27:
						$( "#no" ).click();
					break;
					case 13:
					   $( "#ok" ).click();
					break;
				}
				
	});
	get_ID('no').addEventListener('click', function(event) {	
		confirm_off();
	})
}
function not_login(){
	darkOFF();
	$( "#confirm_panel" ).slideUp( "slow" );
	main_menu_admin(0,0);
	get_ID('menudiv').innerHTML=main_menu_admin(0,0);
}
function logOut(){
	window.location.href='class/action.php?action=logout';
}
function log_out_confirm(){
	confirm_ON('<div style="margin:10px;">Czy napewno chcesz sie wylogowac ?</div>');
	document.addEventListener('keydown', function(event) {	
				switch(event.keyCode){
					case 27:
						not_login();
					break;
					case 13:
						 login();
					break;
				}
				
	});
	get_ID('ok').addEventListener('click', function(event) {	
			logOut();
	});
}
function contact_on(){
	form_field.splice(0, 1);
	get_ID('map').style['display']='none';
	form_field[0]=['name','','text','20','','To pole jest Wymagane !'];
 	form_field[1]=['select_subject','wybiersz Temat','text','10','','To pole jest Wymagane !'];
 	form_field[2]=['contents_text','','text_area','10','500','To pole jest Wymagane !','on'];
 	form_field[3]=['phone_form','','number','10','','To pole jest Wymagane !'];
 	form_field[4]=['emial','','mial','20','','To pole jest Wymagane !'];
	$( "#contact_info" ).slideDown(800);
	document.addEventListener('keydown', function(event) {	
				switch(event.keyCode){
					case 27:
						get_ID('map').style['display']='block';
						darkOFF();
						contact_Off();
					break;
					case 13:
						get_ID('sent_confirm').click();
					break;
				}
				
	});
}
function ajax_sent(){
	$.post('class/ajax.php',
			{'type'           : 'sent',
			 
			 'name_sent'      :get_ID(form_field[0][0]).value,
			 'subject_name'   :get_ID(form_field[1][0]).value,
			 'contents_text'  :get_ID(form_field[2][0]).value,
			 'phone_form'  	  :get_ID(form_field[3][0]).value,
			 'emial'  	  	  :get_ID(form_field[4][0]).value

			});
}
function contact_Off(){
	$( "#contact_info" ).slideUp(800);
}
function sent_mess(){
	darkON();
	contact_on();
	$( "#sent_confirm" ).click(function( event ) {
		if(start_validate()){
			ajax_sent();
			darkOFF();
			contact_Off();
			good_notice_ON();
			get_ID('map').style['display']='block';
			rest_form();
		}
	});
	$( "#name" ).click(function( event ) {
		reset_form(0);
	});
	$( "#name" ).keydown(function( event ) {
		reset_form(0);
	});
	$( "#select_subject" ).click(function( event ) {
		reset_form(1);
	});
	$( "#select_subject" ).keydown(function( event ) {
		reset_form(1);
	});
	$( "#contents_text" ).click(function( event ) {
		reset_form(2);
	});
	$( "#contents_text" ).keydown(function( event ) {
		reset_form(2);
	});
	$( "#phone_form" ).click(function( event ) {
		reset_form(3);
	});
	$( "#phone_form" ).keydown(function( event ) {
		reset_form(3);
	});
	$( "#emial" ).click(function( event ) {
		reset_form(4);
	});

}