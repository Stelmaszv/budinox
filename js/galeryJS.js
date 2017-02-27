
function galery(id,drection){
	defult_values(drection);
	next=id+1;
	back=id-1;
	get_ID('right_photo').src=	galeryJS[back][1];
	get_ID('left_photo').src=	galeryJS[next][1];
	get_ID('click_center').innerHTML='<img id="center_photo" src="" onclick=big_IMG('+id+') width="350" height="350">';
	get_ID('center_photo').src=	galeryJS[id][1];
	get_ID('next').innerHTML='<img  onclick=galery_back('+back+') src="style/web/mext.png">';
	get_ID('prewius').innerHTML='<img  onclick=galery_next('+next+') src="style/web/prewius.png">';
}
function darkOFF(){
	get_ID('dark').style['width']='0px';
	get_ID('dark').style['height']='0px';
}
function defult_values(drection){
	speed=800;
	switch(drection){
		case 'next':
			get_ID('left_photo').style['opacity']='0.6';
			get_ID('left_photo').style['width']='220px';
			get_ID('left_photo').style['height']='220px';
			get_ID('right_photo').style['opacity']='1.0';
			get_ID('right_photo').style['width']='280px';
			get_ID('right_photo').style['height']='280px';
			get_ID('right_photo').style['padding']='30px';
			$("#right_photo").animate({
				opacity: '0.6',
				width:   '220px',
				height:  '220px',
				padding: '30px'		
			},speed,function(){
					$("#center_photo").animate({
							opacity: '1.0',
							width:   '320px',
							height:  '320px'
					});
			});
		break;
		case 'back':
			get_ID('right_photo').style['opacity']='0.6';
			get_ID('right_photo').style['width']='220px';
			get_ID('right_photo').style['height']='220px';
			get_ID('left_photo').style['opacity']='1.0';
			get_ID('left_photo').style['width']='280px';
			get_ID('left_photo').style['height']='280px';
			get_ID('left_photo').style['padding']='30px';
			$("#left_photo").animate({
				opacity: '0.6',
				width:   '220px',
				height:  '220px',
				padding: '30px'	
			},speed,function(){
					$("#center_photo").animate({
							opacity: '1.0',
							width:   '320px',
							height:  '320px'
					});
			});
		break;
	}
}
function show_min_galery(){
	$( "#down_mini_galery" ).slideDown(800);
}
function close_galery(){
	darkOFF();
	$( "#mian_galery" ).fadeIn( "slow" );
	$( "#corent_photo" ).fadeOut( "slow" );
}
function next_photo(id){
	next=id+1;
	if(next==galeryJS.length){
		next=1;
	}
	return next;

}
function back_photo(id){
	back=id-1;
	if(back==0){
		back=galeryJS.length-1;
	}
	return back;
}
function intval_photo(id,varswitch){
	start_intval=id;	
	switch(varswitch){
		case 'start':
			vars='start';
			animate = setInterval(big_IMG_slide,2000);	
			get_ID('stop_SLIDE').innerHTML="<img src=style/web/stop.png  onclick=intval_photo("+id+",'stop') width='100 px' height='100 px' >";
			get_ID('play_SLIDE').style['display']='none';
			get_ID('stop_SLIDE').style['display']='block';	
		break;
		case 'stop':
			vars='stop';
			get_ID('play_SLIDE').innerHTML="<img src=style/web/play.png  onclick=intval_photo("+id+",'start') width='100 px' height='100 px' >";
			get_ID('play_SLIDE').style['display']='block';
			get_ID('stop_SLIDE').style['display']='none';
		break;	
	}

	function big_IMG_slide(){
		if(vars!='stop'){
			big_IMG(start_intval);
			start_intval++;
			if(start_intval==galeryJS.length){
				start_intval=1;
			}
		}else{
			clearInterval(animate);
		}
	}	
}
function big_IMG(id,acess){
	darkON()
	speed=400;
	get_ID('corent_photo_DIV').innerHTML='';
	get_ID('corent_photo').style['display']='block';
	get_ID('mian_galery').style['display']='none';
	document.addEventListener('keydown', function(event) {	
				switch(event.keyCode){
					case 27:
						close_galery();
						intval_photo(id,'stop');
					break;
					case 37:
						get_ID('bphoto').click();
					break;
					case 39:
						get_ID('nphoto').click();
					break;
				}
				
	});	
	if(acess=='admin'){
		get_ID('close_galery').innerHTML='<spam id=menu_elment_galery onclick="delete_PHOTO('+galeryJS[id][2]+','+id+')" >usun</spam><spam id="menu_elment_galery"onclick="close_galery()" >X</spam>';			
	}
		get_ID('corent_photo_DIV').innerHTML='<img id=photo_js src="'+galeryJS[back_photo(id)][1]+'">';
		get_ID('back').innerHTML="<img id=bphoto src=style/web/next.png onclick=big_IMG("+next_photo(id)+",'"+acess+"') >"
		get_ID('next').innerHTML="<img id=nphoto src=style/web/prewius.png onclick=big_IMG("+back_photo(id)+",'"+acess+"') >"
		$( "#corent_photo_DIV" ).slideUp( 400 );
	
	setTimeout(function(){ 
		get_ID('corent_photo_DIV').innerHTML='<img id=photo_js  src="'+galeryJS[id][1]+'" >';
		get_ID('back').innerHTML="<img id=bphoto src=style/web/next.png onclick=big_IMG("+next_photo(id)+",'"+acess+"') >"
		get_ID('next').innerHTML="<img id=nphoto src=style/web/prewius.png onclick=big_IMG("+back_photo(id)+",'"+acess+"') >"
		get_ID('play_SLIDE').innerHTML="<img src=style/web/play.png  onclick=intval_photo("+id+",'start') width='100 px' height='100 px' >";
		$( "#corent_photo_DIV" ).slideDown(400 );
	}, 400);
}
function darkON(){
	scrennW=parseInt($(this).width());
	if(scrennW<1361){
	scrennH=parseInt($(this).height()+250);
	}else{
		scrennH=parseInt($(this).height());	
	}
	get_ID('dark').style['width']=''+scrennW+'px';
	get_ID('dark').style['height']=''+scrennH+'px';
}
function good_notice_ON(){
	$( "#set_notice" ).fadeIn(800);
}
x=0;
function rondomgalery(){
	if(x==galeryJS.length-1){
		x=0;
	}else{
		x++;
	}
	if(x!=0){
		if(get_ID('main_page').style['display']=='block'){
			get_ID('JS_rondom_PHOTO').src=galeryJS[x][1];
		}
	}else{
		x++;
	}
}
function ramdom_galery_loop(){
	 rondomgalery();
	setInterval(function(){ rondomgalery() },5000);
}
function load_message(id){
	document.addEventListener('keydown', function(event) {	
		switch(event.keyCode){
			case 27:
				refresh_ajax('mesages','ajax_request');
				darkOFF();
				$( "#list_place" ).fadeOut( "slow" );
			break;
		}
	});
	darkON();
	$( "#list_place" ).fadeIn(100);
	$.post('class/ajax.php',{'type': 'load_messag','id_mesage':id},function(ajax){
		get_ID('list_place').innerHTML=ajax;
	});
}