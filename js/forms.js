var form_field=[];
function get_ID(DIV){
	return document.getElementById(DIV)
}
function start_validate(){
	wrong=0;
	for(var x = 0; x < form_field.length; x++){
		if(if_empty(x)){
			switch(form_field[x][2]){
				case 'text_area':
					chcek_lang_text_between(x);
				break;
				case 'mial':
					emial_validation(x)
				break;
				case 'number':
					if_number(x);
					
				break;
			}
			if(get_ID(form_field[x][0]).style['background-color']=='red'){
				wrong++;
			}
		}else{
			wrong++;
		}

	}
	if(wrong>0){
		return false;
	}else{
		return true;
	}
}
function if_number(index){
	aktual=get_ID(form_field[index][0]).value;
	if(isNaN(get_ID(form_field[index][0]).value) && get_ID(form_field[index][0]).value!=form_field[index][5]){ 
		get_ID(form_field[index][0]).value='"'+get_ID(form_field[index][0]).value+'" to nie jest liczba !';
		get_ID(form_field[index][0]).style['background-color']='red';
		get_ID(form_field[index][0]).style['color']='white';
		$( "#"+form_field[index][0]+"" ).click(function( event ) {
			get_ID(form_field[index][0]).value=aktual;
			get_ID(form_field[index][0]).style['background-color']='white';
			get_ID(form_field[index][0]).style['color']='black';
			get_ID(form_field[index][0]).style['text-transform']='none';
		});
	}
}
function wrong_field(index){
	get_ID(form_field[index][0]).value=form_field[index][5];
	get_ID(form_field[index][0]).style['background-color']='red';
	get_ID(form_field[index][0]).style['color']='white';
}
function emial_validation(index){
  var vlid = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z0-9.-]{2,4}$/;
  var emial_stan=get_ID(form_field[index][0]).value;
  var emial = vlid.test(get_ID(form_field[index][0]).value);
  if (!emial && emial_stan!=form_field[index][5]) {
  		get_ID(form_field[index][0]).value='np pszykład@.dudi.com podany to "'+emial_stan+'"'   ;
		get_ID(form_field[index][0]).style['background-color']='red';
		get_ID(form_field[index][0]).style['color']='white';
		$( "#"+form_field[index][0]+"" ).click(function( event ) {
			get_ID(form_field[index][0]).value=emial_stan;
			get_ID(form_field[index][0]).style['background-color']='white';
			get_ID(form_field[index][0]).style['color']='black';
			get_ID(form_field[index][0]).style['text-transform']='none';
		});
  }

}
function if_empty(index){
	value=get_ID(form_field[index][0]).value

	if(value!='' && value!= form_field[index][1] ){
		return true;
	}else{
		wrong_field(index);
	}
}
function chcek_lang_text_between(index){
	actual=get_ID(form_field[index][0]).value
	value=get_ID(form_field[index][0]).value;
	min=form_field[index][3];
	max=form_field[index][4];
	if(value.length<min){
		get_ID(form_field[index][0]).value+=' minimalna liczba znaków to '+min+' ('+value.length+')';
		get_ID(form_field[index][0]).style['background-color']='red';
		get_ID(form_field[index][0]).style['color']='white';
		$( "#"+form_field[index][0]+"" ).click(function( event ) {
			get_ID(form_field[index][0]).value=actual;
			get_ID(form_field[index][0]).style['background-color']='white';
			get_ID(form_field[index][0]).style['color']='black';
			get_ID(form_field[index][0]).style['text-transform']='none';
		});
	}
	if(value.length>max){
		get_ID(form_field[index][0]).value+=' max liczba znaków to '+max+'('+value.length+')';
		get_ID(form_field[index][0]).style['background-color']='red';
		get_ID(form_field[index][0]).style['color']='white';
		$( "#"+form_field[index][0]+"" ).keydown(function( event ) {
			get_ID(form_field[index][0]).value=actual;
			get_ID(form_field[index][0]).style['background-color']='white';
			get_ID(form_field[index][0]).style['color']='black';
			get_ID(form_field[index][0]).style['text-transform']='none';
		});
	}
}
function passhord_fild(index){
	get_ID(form_field[index][0]).type='password';
}
function reset_form(index){
	value=get_ID(form_field[index][0]).value
	if(value==form_field[index][1] || value== form_field[index][5] || value==""){
		get_ID(form_field[index][0]).value='';
		get_ID(form_field[index][0]).style['background-color']='white';
		get_ID(form_field[index][0]).style['color']='black';
		get_ID(form_field[index][0]).style['text-transform']='none';
	}
}
function check_forms(){
	for(var x = 0; x < form_field.length; x++){
		if(get_ID(form_field[x][0]).value==''){
			get_ID(form_field[x][0]).value=form_field[x][1];
			get_ID(form_field[x][0]).style['text-transform']='uppercase'
		}
		if(form_field[x][2]=='password'){
			get_ID(form_field[x][0]).type='text';
		}
	}
}
function change_style(id){
	for(var x = 0; x < form_field.length; x++){
		if(form_field[x][0]==id){
			get_ID(form_field[x][0]).style['opacity']='1';
			get_ID(form_field[x][0]).style['letter-spacing']='0px';
		}else{
			get_ID(form_field[x][0]).style['opacity']='0.7';			
		}
	}

}
function rest_form(){
	for(var x = 0; x < form_field.length; x++){
			get_ID(form_field[x][0]).value='';
	}
		check_forms();
}
