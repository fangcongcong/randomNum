$(function(){
	var infoLength = true;
	var thisPage = 1;
	var flag = true;

	function getListInfo(){
		mc.sendPost({user_id:mc.getURLElement("uid"),page:thisPage},"https://www.shctp.com/wap_api/luckdraw.php?act=luck_detail","post","show",function(data){
			if(data.error == 0){
				if(data.page_count <= 0){
					$(".list-alert").show();
					$(".btn-more").hide();
				}else{
					$(".btn-more").show();
				}
				flag = true;
				infoLength = data.info == null || data.info == undefined || data.info == '' || data.info == [];
				var html = "";
				if(infoLength == false){
					thisPage++;
					for(var i = 0; i < data.info.length; i++){
						html += '<li class="item">'+
							'<span class="ranking"><em>'+data.info[i].id+'</em></span>'+
							'<span class="pic-box"><img class="head-img" src="images/user_pic.png"/></span>'+
							'<span class="phone-time" style="display:block;">';
								if(data.info[i].mine == 1){
									html += '<div class="phone">我</div>';
								}else{
									html += '<div class="phone">'+data.info[i].user_name+'</div>';
								}
								html += '<div class="time">'+data.info[i].time+'</div>'+
							'</span>'+
							'<span class="num"><em>'+data.info[i].lucknum+'</em></span>'+
						'</li>';
					}
					$(".ul-wrap").append(html);
				}else{
					$(".btn-more").hide();
					$(".btn-no").show();
				}
			}else{
				mc.showAlert(data.message,"body");
			}
		});
	}
	
	getListInfo();
	
	$(document).on('click','.btn-more',function(){
		alert("............");
		if(flag == true){
			flag = false;
			getListInfo();
		}
	});
});
