var ran=0;
var range=10;
var myNumber;
var flag = true;
var userId = null;

function randomNum(range) {
    ran=Math.random()*range; //[0,range)的随机数
    var result=parseInt(ran);//转换成整数
    return result;
}
//显示随机数
function showRandomNum() {
    var figure=randomNum(range);
    $("#first").html(figure);
    var figure2=randomNum(range);
    $("#second").html(figure2);
    var figure3=randomNum(range);
    $("#third").html(figure3);
}
$(function () {
	userId = mc.getURLElement("uid");
	getInfo();
    $("#start").click(function () {
    	if(flag == true){
    		flag = false;
    		//将标签禁用
	       	$(".btn").addClass("disabled");
	       	$(".btn").text("请等待...");
	        $(".btn-wrap").addClass("disabledActive");
	        myNumber=setInterval(showRandomNum,10);//多长时间运行一次
	        btnPost();
    	}
    });
    
    $(".paihangbang").click(function(){
    	var rand = parseInt(Math.random() * (12000 - 0 + 1) + 0);
    	window.location.href="list.html?uid="+userId+"&v="+rand+"";
    });
    
    $(".wangqi").click(function(){
    	var rand = parseInt(Math.random() * (12000 - 0 + 1) + 0);
    	window.location.href="wangqiList.html?v="+rand+"";
    });
});

function getInfo(){
	mc.sendPost({user_id:userId},"https://www.shctp.com/wap_api/luckdraw.php?act=index","post","show",function(data){
		if(data.error == 0){
			$(".db-content").show();
			$(".banner .bonus").text("积分奖池："+data.all_consume);
			$(".my-integral .integralNum").text(data.user_consume);
		}else{
			mc.showAlert(data.message,"body");
		}
	});
}

function btnPost(){
	mc.sendPost({user_id:userId},"https://www.shctp.com/wap_api/luckdraw.php?act=get_luck_num","post","show",function(data){
		flag = true;
		if(data.error == 0){
			$(".btn-ten").addClass("btn-animation");
			console.log(data.luck_num);
			$(".integralNum").text(data.user_consume);
			$(".bonus").text("积分奖池："+data.all_consume);
			setTimeout(function () {
				var luckArr = data.luck_num.split('');
				$("#first").text(luckArr[0]);
				$("#second").text(luckArr[1]);
				$("#third").text(luckArr[2]);
			   	clearInterval(myNumber); //停止
			   	$(".btn-wrap").removeClass("disabledActive");
			   	$(".btn").removeClass("disabled");
			   	$(".btn").text("获取幸运数");
			   	$(".btn-ten").removeClass("btn-animation");
			}, 1000);
		}else{
			mc.showAlert(data.message,"body");
			setTimeout(function () {
			   	clearInterval(myNumber); //停止
			   	$("#first").text("-");
				$("#second").text("-");
				$("#third").text("-");
			   	$(".btn-wrap").removeClass("disabledActive");
			   	$(".btn").removeClass("disabled");
			   	$(".btn").text("获取幸运数");
			   	//$(".btn-ten").removeClass("btn-animation");
			}, 1000);
		}
	});
}
