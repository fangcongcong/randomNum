$(function(){
	mc.sendPost({},"https://www.shctp.com/wap_api/luckdraw.php?act=luck_detail_history","post","show",function(data){
		if(data.error == 0){
			if(data.info.length <= 0){
				$(".list-alert").show();
			}else{
				var html = "";
				for(var i = 0; i < data.info.length; i++){
					html +='<div class="date-wrap">'+
								'<span class="date-item">'+
									'<p>瓜分日期</p>'+
									'<p class="t-date">'+data.info[i].periods+'</p>'+
								'</span>'+
								'<span class="date-item">'+
									'<p>积分奖池</p>'+
									'<p class="t-integral">'+data.info[i].consume+'</p>'+
								'</span>'+
							'</div>';
					for(var j = 0; j < data.info[i].users.length; j++){
						html += '<ul class="ul-wrap">'+
						'<li class="item">'+
						'<span class="ranking"><em>'+data.info[i].users[j].id+'</em></span>'+
						'<span class="pic-box"><img class="head-img" src="images/gua.png"/></span>'+
						'<span class="phone-time" style="display:block;">';
							if(data.info[i].mine == 1){
								html += '<div class="phone">我</div>';
							}else{
								html += '<div class="phone">'+data.info[i].users[j].user_name+'</div>';
							}
							html += '<div class="time">'+data.info[i].users[j].time+'</div>'+
						'</span>'+
						'<span class="num"><em>'+data.info[i].users[j].lucknum+'</em></span>'+
					'</li>'+
					'</ul>';
					}
				}
				$(".list-add-box").append(html);
			}
		}else{
			mc.showAlert(data.message,"body");
		}
	});
});
