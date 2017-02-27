function on_edtor(ON,DIV,SHOW_DIV,ID,padding,Confirm,cancel){
	speed=200;
	start=get_ID(SHOW_DIV).innerHTML;
	get_ID(DIV).value=start;
	$( "#"+ON+"" ).slideDown(speed);
	$("#"+padding+"").animate({
				paddingTop:"5px"
		},speed);
	get_ID(DIV).addEventListener('keyup', function(event) {
		get_ID(SHOW_DIV).innerHTML=get_ID(DIV).value
	})
	get_ID(cancel).addEventListener('click', function(event) {
		get_ID(SHOW_DIV).innerHTML=start;
			$( "#"+ON+"" ).slideUp(speed);
			$("#"+padding+"").animate({
						paddingTop:'100px'
			},speed);
	});
	get_ID(Confirm).addEventListener('click', function(event) {

			$( "#"+ON+"" ).slideUp(speed);
			$("#"+padding+"").animate({
						paddingTop:'100px'
			},speed,function(){
				if(ON=='content_editor_contact'){
					save_contact(ID,get_ID(DIV).value,get_ID(DIV).value);
				}else{
					save(ID,get_ID(DIV).value,get_ID(DIV).value);
				}
			});
	});
}
function save_contact(ID,value1,value2){
	save(ID,value1,value2);
	save_owner(get_ID('oner_value').innerHTML,get_ID('emialV').innerHTML,get_ID('phon_value').innerHTML);
}
function save_owner(oner,email,phon){
	$.post('class/ajax.php',{'type' : 'update_owner',
			 'id_mesage'      :'',
			 'name_sent'      :oner,
			 'subject_name'   :'',
			 'contents_text'  :'',
			 'phone_form'  	  :phon,
			 'emial'  	  	  :email

	});
}
function delete_PHOTO(vale_ID,js_index){
	$( "#mian_galery" ).fadeIn( "slow" );
	$( "#corent_photo" ).fadeOut( "slow" );
	get_ID('corent_photo').style['display']='block';
	get_ID('mian_galery').style['display']='none';
	confirm_ON('Czy napewno chcesz to Zdjęcie ?<div>'+get_ID('corent_photo_DIV').innerHTML+'</div><br>');
	get_ID('photo_js').style['width']='600px';
	$("#confirm_panel").animate({
			top:60
	})
	get_ID('ok_JS_place').innerHTML='<spam onclick="IMG_EXECUTE('+vale_ID+','+js_index+')"  id="ok">Tak</spam>'
	get_ID('no_JS_place').innerHTML='<spam onclick="IMG_abort('+js_index+')"  id="no">nie</spam>'
}
function IMG_abort(id){
	get_ID('ok_JS_place').innerHTML='<spam  id="ok">Tak</spam>'
	get_ID('no_JS_place').innerHTML='<spam id="no">nie</spam>'
	confirm_off();
	big_IMG(id,'admin')
}
function IMG_EXECUTE(id,js_index){

		defultTop=200;
		get_ID('ok_JS_place').innerHTML='<spam  id="ok">Tak</spam>'
		get_ID('no_JS_place').innerHTML='<spam id="no">nie</spam>'
		confirm_off();
		$( "#mian_galery" ).fadeOut( "slow" );
		$( "#corent_photo" ).fadeIn( "slow" );
		get_ID('photo_js').style['width']='1024px';
		get_ID('confirm_panel').style['top']=defultTop
		get_ID('corent_photo').style['display']='none';
		get_ID('mian_galery').style['display']='block';
		delete_IMG_EXECUTE(id,js_index);
}
function delete_IMG_EXECUTE(id,js_index){
	$.post('class/ajax.php',{'type' : 'delete_IMG',
			 'id_mesage'      :id,
			 'name_sent'      :'1',
			 'subject_name'   :'',
			 'contents_text'  :'',
			 'phone_form'  	  :'1',
			 'emial'  	  	  :'1'

	},function(ajax){
		notice_ON('Zdjęcie zostało uniete');
		refresh_ajax('galery','down_mini_galery');
	});
	NEWgalery=galeryJS.length-1;
	for(var x = 1; x <= NEWgalery; x++){
		galeryJS[x]=[x,galeryJS[x][1],galeryJS[x][2]];
	}
}
function refresh_ajax(value,div){
	$.post('class/ajax.php',{'type' : 'refresh_html',
			 'id_mesage'      :'',
			 'name_sent'      :'1',
			 'subject_name'   :value,
			 'contents_text'  :'',
			 'phone_form'  	  :'1',
			 'emial'  	  	  :'1'

	},function(ajax){
		get_ID(div).innerHTML=ajax;
	});
}
function add_photos_from_galery(form){
	main_menu_admin(6,0);
	get_ID('menudiv').innerHTML=main_menu_admin(6,0);
	load_edition('galleadd');
}
function save(ID,value2,value){
	$.post('class/ajax.php',{'type' : 'Update',
			 'id_mesage'      :ID,
			 'name_sent'      :'1',
			 'subject_name'   :value,
			 'contents_text'  :value2,
			 'phone_form'  	  :'1',
			 'emial'  	  	  :'1'

	},function(ajax){
		notice_ON('Dane zostały zmniene')
	});
}
function notice_ON(value){
	defult=get_ID('set_notice').innerHTML;
	get_ID('set_notice').innerHTML=value;
	good_notice_ON();
	setTimeout(function(){ 
		get_ID('set_notice').innerHTML=defult;
	}, 3000);
}
function ofert_edition($switch){
	if($switch=='on'){
		$( "#oferts" ).slideUp( "slow" );
		$( "#servvment_admin" ).slideDown( "slow" );
		get_ID('clickon').innerHTML="<div id=main_info_ofert onclick=ofert_edition('of')>Usługi</div>";
	}else{
		$( "#oferts" ).slideDown( "slow" );
		$( "#servvment_admin" ).slideUp( "slow" );
		get_ID('clickon').innerHTML="<div id=main_info_ofert onclick=ofert_edition('on')>Usługi</div>";
	}
}
function save_this(){
	for(var x = 0; x < oferts_array_admin.length; x++){
		save(oferts_array_admin[x][2],get_ID(oferts_array_admin[x][1]).value,get_ID(oferts_array_admin[x][0]).value);
	}
	html='<div id="list_confirm">';
	if(checkbox.length>0){
		for(var s = 0; s < oferts_array_admin.length; s++){
			for(var x = 0; x < checkbox.length; x++){
				if(checkbox[x][0]==oferts_array_admin[s][2]){
					html+='<li>'+get_ID(oferts_array_admin[s][0]).value+'</li>';
					html+='<br>';
				}
			}
		}
		html+='</div>';
		confirm_ON('Czy napewno chcesz usnąć następujące usługi ?'+html+'');
			get_ID('ok').addEventListener('click', function(event) {
					confirm_off();
					delete_serment();
			});
	}
}
function delete_this(ID){
	$.post('class/ajax.php',{'type' : 'delete',
			 'id_mesage'      :ID,
			 'name_sent'      :'1',
			 'subject_name'   :'',
			 'contents_text'  :'',
			 'phone_form'  	  :'1',
			 'emial'  	  	  :'1'

	});
}
function delete_serment(){
	for(var x = 0; x < checkbox.length; x++){
		delete_this(checkbox[x][0]);
	}
	notice_ON('Usługi zostały usniete');
}
function set_number(){
	number=get_ID('set_number').value
	if(number>0){
		div='';
		for(var x = 0; x < number; x++){
			oferts_add[x]=['add'+x+'','addcontent'+x+''];
			div+='<div id="form_div_space">'
			div+='<input id="add'+x+'" type="text" value="Nazwa" class="form_add"><br>';
			div+='<textarea id="addcontent'+x+'" class="form_add_textarea">Usługi</textarea>';
			div+='</div>'
		}
		get_ID('add_section_DIV').innerHTML=div;
	}else{
		get_ID('set_number').value=1;
	}
}
function add_servment(value,value2){
	$.post('class/ajax.php',{'type' : 'add_servment',
			 'id_mesage'      :'1',
			 'name_sent'      :'1',
			 'subject_name'   :value,
			 'contents_text'  :value2,
			 'phone_form'  	  :'1',
			 'emial'  	  	  :'1'
	});
}
function add_serment(){
	for(var x = 0; x < oferts_add.length; x++){
		add_servment(get_ID(oferts_add[x][0]).value,get_ID(oferts_add[x][1]).value)
	}
	notice_ON('nowe usługi zostały dodane');
}
function add_serment_on($switch){
	if($switch=='on'){
		$( "#add_system_div" ).slideDown( "slow" );
		$( "#loop_edition" ).slideUp( "slow" );
		get_ID('add_icon').innerHTML="<div id=save_ICON_ADMINofert onclick=add_serment_on('of')>Pokaż</div>";
		get_ID('save_icon').innerHTML="<div id=save_ICON_ADMINofert onclick=add_serment()>Dodaj</div>";
	}else{
		$( "#add_system_div" ).slideUp( "slow" );
		$( "#loop_edition" ).slideDown( "slow" );
		get_ID('add_icon').innerHTML="<div id=save_ICON_ADMINofert onclick=add_serment_on('on')>Dodaj nową</div>";
		get_ID('save_icon').innerHTML="<div id=save_ICON_ADMINofert onclick=save_edition()>zapisz</div>";
	}
}
function add_to_list(div,id,number){
	if(get_ID(div).checked){
		checkbox[checkbox.length]=[id];
	}else{
		for(var x = 0; x < checkbox.length; x++){
			if(checkbox[x][0]==id){
				checkbox[x]=[];
			}
		}
	}
}
function save_slite(ID,value,nr2){
	$.post('class/ajax.php',{'type' : 'update_slite',
			 'id_mesage'      :ID,
			 'name_sent'      :'1',
			 'subject_name'   :value,
			 'contents_text'  :nr2,
			 'phone_form'  	  :'1',
			 'emial'  	  	  :'1'
	});	
}
function show_elment(show){
	switch(show){
		case 'about_firm':
			get_ID('view_place').innerHTML=get_ID(show).innerHTML
		break;
		case 'contact':
			get_ID('view_place').innerHTML=get_ID(show).innerHTML
		break;
		case 'ofert':
			get_ID('view_place').innerHTML=get_ID(show).innerHTML
		break;
		case 'slide_main_PLace':
			$.post('class/ajax.php',{
				'type' : 'show_slite'	
			},function(ajax){
				get_ID('view_place').innerHTML=ajax;
			});
		break;
		default: 
			
		break;
	}
}
function check_size(file){
	if(file<5000000){
		return true;
	}else{
		return false;
	}
}
function check_EXT(ext){ 
	ext = ext.substring(ext.length-3,ext.length); 
	if(ext != 'jpg' && ext != 'png' && ext != 'jpeg' ){ 
		return false;
	}else{
		return true;
	} 
} 
function upload(){
	 var file_data = $('#sortpicture').prop('files')[0]; 
	 size=file_data.size;
	 filevar=file_data;
	 name=file_data.name;  
    var form_data = new FormData();                  
    form_data.append('baner', file_data); 
		if(check_EXT(name)){
				if(check_size(size)){
					$.ajax({
			                url: 'file.php', 
			                dataType: 'text', 
			                cache: false,
			                contentType: false,
			                processData: false,
			                data: form_data,                         
			     	        type: 'post',
			     	         success: function(php_script_response){
			     	         	get_ID('notice_slide').innerHTML=php_script_response;
			     	         }
			    	 });
				}else{
					get_ID('notice_slide').innerHTML='<div id="error_notice">maksymalnie 5 mb</div>';
				}
		}else{
			get_ID('notice_slide').innerHTML='<div id="error_notice">nie poprawne rozesznie dopuszczalne:<li>jpg</li><li>png</li><li>jpeg</li></div>';
		}

}
function edit_slite(){
	var slite_edition=[];
		slite_edition[0]=[1,'form0',validate_url(get_ID('slide0').style['backgroundImage'])];
		slite_edition[1]=[2,'form1',validate_url(get_ID('slide1').style['backgroundImage'])];
		slite_edition[2]=[3,'form2',validate_url(get_ID('slide2').style['backgroundImage'])];
		slite_edition[3]=[4,'form3',validate_url(get_ID('slide3').style['backgroundImage'])];
		for(var x = 0; x < slite_edition.length; x++){	
				save_slite(slite_edition[x][0],get_ID(slite_edition[x][1]).value,slite_edition[x][2]);
		}
		notice_ON('Dane sostały zmienione');

}
function onchuselide(){
	get_ID('hed_to_chuse').style['opacity']='1.0';
	get_ID('hed_to_chuse').style['borderBottom']='2px solid red';
	get_ID('hed_add').style['opacity']='0.5';
	get_ID('hed_add').style['borderBottom']='0px solid red';
	$( "#slide_loop_DIV" ).slideDown( "slow" );
	$( "#add_slides" ).slideUp( "add_slides" );
}
function onbaner_system(){
	get_ID('hed_to_chuse').style['opacity']='0.5';
	get_ID('hed_to_chuse').style['borderBottom']='0px solid red';
	get_ID('hed_add').style['opacity']='1.0';
	get_ID('hed_add').style['borderBottom']='2px solid red';
	$( "#slide_loop_DIV" ).slideUp( "slow" );
	$( "#add_slides" ).slideDown( "add_slides" );
}
function validate_url(url){
	var str = url;
	var value='';
	for(var x = 4; x < str.length-1; x++){
		if(str.charAt(x) !='"' ){
			value+=str.charAt(x)
		}
	}
	return value;

}
function load_edition(show){
	switch(show){
		case 'slide_main_PLace':
			$.post('class/ajax.php',{
				'type' : 'edition_slite'	
			},function(ajax){
				get_ID('edition_section').innerHTML=ajax;
			});
			$( "#main_edition" ).slideUp( "slow" );
			$( "#edition_section" ).slideDown( "slow" );
		break;
		case 'about_firm':
			main_menu_admin(1,0);
			get_ID('menudiv').innerHTML=main_menu_admin(1,0);
			get_ID('about_insite_text').click();
		break;
		case 'contact':
			main_menu_admin(4,0);
			get_ID('menudiv').innerHTML=main_menu_admin(4,0);
			get_ID('kontakt_ditels').click();
		break;
		case 'ofert':
			main_menu_admin(2,0);
			get_ID('menudiv').innerHTML=main_menu_admin(2,0);
			get_ID('main_info_ofert').click();
		break;
		case 'galleadd':
			$( "#main_edition" ).slideUp( "slow" );
			$( "#edition_section" ).slideDown( "slow" );
			get_ID('edition_section').innerHTML=addfilles_forms(2);
		break;
	}

}
function addfilles_forms(number){
	div='<div id="add_info"><spam onclick=edit_menu()> < </spam> Dodawnie Zdjęci do galeri :<input type="number" value="'+number+'" id="set_number" onchange="change_count(this.value)"></div>'
	div+='<div id="loop_galery_js_generate">';
		for(x=0;x<number;x++){
			div+='<div>'
			div+='<input class="add_photo" id="files'+x+'" type="file">'
			div+='<div id="eror'+x+'"></div>'

			div+='</div>';
		}
	div+='</div><div id="upload_icon_photos" onclick="add_photos('+x+')">Dodaj Zdjęcia</div>'
	return div;
}
function change_count(count){
	get_ID('edition_section').innerHTML=addfilles_forms(count);
}
function add_photos(number){
	for(x=0;x<number;x++){
		add_photo(x);
	}
	 var file_data = $('#sortpicture').prop('files')[0]; 
	 size=file_data.size;
	 filevar=file_data;
	 name=file_data.name;  
    var form_data = new FormData();                  
    form_data.append('0', file_data); 
   
		if(check_EXT(name)){
				if(check_size(size)){
					$.ajax({
			                url: 'file.php', 
			                dataType: 'text', 
			                cache: false,
			                contentType: false,
			                processData: false,
			                data: form_data,                         
			     	        type: 'post',
			     	         success: function(php_script_response){
			     	         	get_ID('notice_slide').innerHTML=php_script_response;
			     	         }
			    	 });
				}else{
					get_ID('notice_slide').innerHTML='<div id="error_notice">maksymalnie 5 mb</div>';
				}
		}else{
			get_ID('notice_slide').innerHTML='<div id="error_notice">nie poprawne rozesznie dopuszczalne:<li>jpg</li><li>png</li><li>jpeg</li></div>';
		}
}
function add_photo(x){

	var file_data = $('#files'+x+'').prop('files')[0]; 
	var form_data = new FormData();  
	name=file_data.name;                
    form_data.append('photo', file_data); 
		if(check_EXT(name)){
			$.ajax({
				url: 'file.php', 
				dataType: 'text', 
				cache: false,
				contentType: false,
				processData: false,
				data: form_data,                      	   
				type: 'post',

					 success: function(php_script_response){
					  		get_ID('eror'+x+'').innerHTML=php_script_response;
					   }
			});
		}else{
			get_ID('eror'+x+'').innerHTML='<div id="error_notice">nie poprawne rozesznie pilku '+name+' dopuszczalne:<li>jpg</li><li>png</li><li>jpeg</li></div>';
		}
		
}
function edit_menu(){
	$( "#main_edition" ).slideDown( "slow" );
	$( "#edition_section" ).slideUp( "slow" );
}
function load_slites(id){
	darkON();
	$( "#list_place" ).fadeIn( "slow" );
	$.post('class/ajax.php',{
				'type' : 'chuse_slide2'	
	},function(ajax){
		var text='';
		var div ='slide'+id
		switch(div){
			case 'slide0':
				text='pierwszego'
			break;
			case 'slide1':
				text='drugiego'
			break;
			case 'slide2':
				text='trzeciego'
			break;
			case 'slide3':
				text='czwartego'
			break;
		}
			get_ID('list_place').innerHTML=ajax;
			get_ID('div_set').innerHTML=text;
			onchuselide();
	});
	document.addEventListener('keydown', function(event) {	
				switch(event.keyCode){
					case 27:
						darkOFF();
						$( "#list_place" ).fadeOut( "slow" );
					break;
				}
				
	});
}
function set_slite(id,sorce){
	var slide='';
	switch(get_ID('div_set').innerHTML){
			case 'pierwszego':
				slide='slide0'
			break;
			case 'drugiego':
				slide='slide1'
			break;
			case 'trzeciego':
				slide='slide2'
			break;
			case 'czwartego':
				slide='slide3'
			break;

		}	

	get_ID(slide).style['backgroundImage']='url('+sorce+')';
	darkOFF();
	$( "#list_place" ).fadeOut( "slow" );
}