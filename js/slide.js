function slide(id){
	speed=2000;
	outspeed=800;
	get_ID('chused_elemnt').innerHTML='';
	function menu_slide(){
		div='<div id="chused_elemnt">';
			for(var x = 0; x < slide_array.length; x++){
				if(id==x){
					div+='<img src="style/web/not_checked.png" onclick=slide('+x+')>'
				}else{
					div+='<img src="style/web/checked.png" onclick=slide('+x+') >'
				}
			}
		return div+='</div>';
	}
	function slideshow(){
			get_ID('slides_01').style['opacity']='1.0';
			get_ID('slides_02').style['opacity']='1.0';
			get_ID('slides_03').style['opacity']='1.0';
			get_ID('slides_04').style['opacity']='1.0';
			get_ID('slides_01').style['display']='block';
			get_ID('slides_02').style['display']='block';
			get_ID('slides_03').style['display']='block';
			get_ID('slides_04').style['display']='block';
			get_ID('slide_text').style['display']='none';
			get_ID('slide_text2').style['display']='none';
			get_ID('slide_text3').style['display']='none';
			get_ID('slide_text4').style['display']='none';
			get_ID('slides_02').style['margin-top']='-250px';
			get_ID('slides_03').style['margin-top']='-250px';
			get_ID('slides_04').style['margin-top']='-250px';
			switch(id){
				case 0:
					get_ID('slides_02').style['opacity']='1.0';
					get_ID('slides_02').style['opacity']='0.5';		
					get_ID('slides_03').style['opacity']='0.5';
					get_ID('slides_04').style['opacity']='0.5';
					
					$("#slides_01").animate({
						marginLeft:"0px"
					},speed,function(){
						$("#slides_01").animate({
							opacity:"1"
						},1000,function(){
							get_ID('slides_01').style['display']='block';
							$( "#slide_text" ).fadeIn( "slow" );
						});
					});
					
					$("#slides_02").animate({
						marginLeft:"1024px"
					},speed,function(){
						$("#slides_02").animate({
							opacity:"0"
						},1000,function(){
							get_ID('slides_02').style['display']='none';
						});
					});
					
					$("#slides_03").animate({
						marginLeft:"2048px"
					},speed,function(){
						$("#slides_03").animate({
							opacity:"0"
						},1000,function(){
							get_ID('slides_03').style['display']='none';
						});
					});
					
					$("#slides_04").animate({
						marginLeft:"3072px"	
					},speed,function(){
						$("#slides_04").animate({
							opacity:"0"
						},1000,function(){
							get_ID('slides_04').style['display']='none';
						});
					});
				break;
				case 1:
					get_ID('slides_01').style['opacity']='0.5';	
					get_ID('slides_02').style['opacity']='1.0';		
					get_ID('slides_03').style['opacity']='0.5';
					get_ID('slides_04').style['opacity']='0.5';
					
					$("#slides_01").animate({
						marginLeft:"-1024px"
					},speed,function(){
						$("#slides_01").animate({
							opacity:"0"
						},1000,function(){
							get_ID('slides_01').style['display']='none';
						});
					});
					
					$("#slides_02").animate({
						marginLeft:"0px"
					},speed,function(){
						$("#slides_02").animate({
							opacity:"1.0"
						},1000,function(){
							get_ID('slides_02').style['display']='block';
							get_ID('slides_02').style['margin-top']='0px';
							$( "#slide_text2" ).fadeIn( "slow" );
						});
					});
					
					$("#slides_03").animate({
						marginLeft:"1024px"
					},speed,function(){
						$("#slides_03").animate({
							opacity:"0"
						},1000,function(){
							get_ID('slides_03').style['display']='none';
						});
					});
					
					$("#slides_04").animate({
						marginLeft:"2048px"	
					},speed,function(){
						$("#slides_04").animate({
							opacity:"0"
						},1000,function(){
							get_ID('slides_04').style['display']='none';
						});
					});
				break;
				case 2:
					get_ID('slides_01').style['opacity']='0.5';
					get_ID('slides_02').style['opacity']='0.5';
					get_ID('slides_03').style['opacity']='1.0';
					get_ID('slides_04').style['opacity']='0.5';
					$("#slides_01").animate({
						marginLeft:"-2048px"
					},speed,function(){

						$("#slides_01").animate({
							opacity:"0"
						},1000,function(){
							get_ID('slides_01').style['display']='none';
						});
					});
					
					$("#slides_02").animate({
						marginLeft:"-1024px"
					},speed,function(){
						$("#slides_02").animate({
							opacity:"0"
						},1000,function(){
							get_ID('slides_02').style['display']='none';
						});
					});
					
					$("#slides_03").animate({
						marginLeft:"0px"
					},speed,function(){
						$("#slides_03").animate({
							opacity:"1.0"
						},1000,function(){
							get_ID('slides_02').style['display']='block'
							get_ID('slides_02').style['margin-top']='0px'
							$( "#slide_text3" ).fadeIn( "slow" );
						});
					});
					
					$("#slides_04").animate({
						marginLeft:"1024px"	
					},speed,function(){
						$("#slides_04").animate({
							opacity:"0"
						},1000,function(){
							get_ID('slides_04').style['display']='none';
						});
					});
				break;
				case 3:
				
					get_ID('slides_01').style['opacity']='0.5';
					get_ID('slides_02').style['opacity']='0.5';
					get_ID('slides_03').style['opacity']='0.5';
					get_ID('slides_04').style['opacity']='1.0';
					$("#slides_01").animate({
						marginLeft:"-3072px"
					},speed,function(){
						$("#slides_01").animate({
							opacity:"0"
						},1000,function(){
							get_ID('slides_01').style['display']='none';
						});
					});
					
					$("#slides_02").animate({
						marginLeft:"-2048px"
					},speed,function(){
						$("#slides_02").animate({
							opacity:"0"
						},1000,function(){
							get_ID('slides_02').style['display']='none';
						});
					});
					
					$("#slides_03").animate({
						marginLeft:"-1024px"
					},speed,function(){
						$("#slides_03").animate({
							opacity:"0"
						},1000,function(){
							get_ID('slides_03').style['display']='none';
						});
					});
					
					$("#slides_04").animate({
						marginLeft:"0px"	
					},speed,function(){
						$("#slides_04").animate({
							opacity:"1.0"
						},1000,function(){
							get_ID('slides_04').style['display']='block';
							get_ID('slides_04').style['margin-top']='0px';
							$( "#slide_text4" ).fadeIn( "slow" );
						});
					});


				break;
			}
	}
	slideshow()
	get_ID('chused_elemnt').innerHTML=menu_slide();

}
function coctakt_hover_left(){
	get_ID('contakt_info').style['display']='none';
	get_ID('hover_div').style['width']='0px';
	get_ID('left_site').style['display']='block';
}
function coctakt_hover(admin){
	get_ID('left_site').style['display']='none';
	get_ID('hover_div').style['width']='250px';
	get_ID('contakt_info').style['display']='block';
	get_ID('kontakt_infotekst').addEventListener('click', function(event) {
		if(admin==0){
			chused_ITEM(4);
		}else{
			chused_ITEM_admin(4,get_ID('count_mes').innerHTML);
		}
		gmap3_START();
	});
	setTimeout(function(){
		coctakt_hover_left();
	},1000);
}
function galery_hover(admin){
	get_ID('about_firm_Galery').style['display']='none';
	get_ID('hover_galery').style['width']='250px';
	get_ID('galery_info').style['display']='block';
	get_ID('galery_info').addEventListener('click', function(event) {
		if(admin==0){
			chused_ITEM(3);
		}else{
			chused_ITEM_admin(3,get_ID('count_mes').innerHTML);
		}
	});
	setTimeout(function(){
		galery_hover_left();
	},1000);
}
function galery_hover_left(){

	get_ID('galery_info').style['display']='none';
	get_ID('hover_galery').style['width']='0px';
	get_ID('about_firm_Galery').style['display']='block';
}
function Firm_hover(admin){
	get_ID('text_Firmm').style['display']='none';
	get_ID('hover_firm').style['width']='250px';
	get_ID('firm_info').style['display']='block';
	get_ID('kontakt_infotekst_FIRM').addEventListener('click', function(event) {
		if(admin==0){
				chused_ITEM(1);
		}else{
			chused_ITEM_admin(1,get_ID('count_mes').innerHTML);
		}
	});
	setTimeout(function(){
		firm_hover_left();
	},1000);

}

function firm_hover_left(){
	get_ID('firm_info').style['display']='none';
	get_ID('hover_firm').style['width']='0px';
	get_ID('text_Firmm').style['display']='block';
}
function about_hover_left(){
	get_ID('Ofert_info').style['display']='none';
	get_ID('hover_Ofert').style['width']='0px';
	get_ID('text_ofert').style['display']='block';
}

function about_hover(admin){
	get_ID('text_ofert').style['display']='none';
	get_ID('hover_Ofert').style['width']='250px';
	get_ID('Ofert_info').style['display']='block';
	get_ID('Ofert_info').addEventListener('click', function(event) {
		if(admin==0){
			chused_ITEM(2);
		}else{
			chused_ITEM_admin(2,get_ID('count_mes').innerHTML);
		}
	});
	setTimeout(function(){
		about_hover_left()
	},1000);
}

function Oferts(id){
	for(var x = 0; x < oferts_array.length; x++){
		
		if(id!=x){
			$( "#"+oferts_array[x][0]+"" ).slideUp( "slow" );
		}else{
			if(get_ID(oferts_array[x][0]).innerHTML!="" && get_ID(oferts_array[x][0]).innerHTML!="Usługi"){
				$( "#"+oferts_array[x][0]+"" ).slideDown( "slow" );
			}
			
		}
	}

}