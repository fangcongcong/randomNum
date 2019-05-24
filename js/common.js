var mc = (function(){
	return {
		getURLElement:function(name){
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURI(r[2]);
            return null;
		},
		showAlert: function(info, addclassbox) {
			$(".resultBox").remove();
			$(addclassbox).append("<div class='resultBox' style='width: 15rem; height: 5rem; font-size: .7rem; z-index:99;box-shadow:0 0 10px rgba(255,255,255,.6); transition: all 1s; text-align: center; line-height: 5rem; position: fixed; top: 48%; left: 50%; margin-top: -2.5rem; margin-left: -7.5rem; background: #ffffff; border-radius: 5px;'>" + info + "</div></div>");
			window.setTimeout(function() {
				$(".resultBox").css("top", "30%");
				$(".resultBox").css("opacity", "0");
			}, 1000);
			window.setTimeout(function() {
				$(".resultBox").remove();
			}, 1500);
		},
		sendPost: function(body, Url, isGet, beforeSendType, success) {
//			console.log("-----------------");
//			console.log(JSON.stringify(body));
//			console.log(beforeSendType);
//			console.log("-----------------");
			$.ajax({
				type: isGet,
				data: body,
				dataType: "JSON",
				url: Url,
				beforeSend: function() {
					$("body").append("<div class='loading-wrap'><div class='item'><img class='icon-loading' src='images/load.png'/></div></div>");
				},
				success: function(data) {
					success(data);
				},
				complete: function() {
					$(".loading-wrap").remove();
				},
				error: function(data) {
					console.log(data);
				}
			});
		}
	}
})();