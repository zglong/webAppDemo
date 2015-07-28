
//微信页
$(".weixin").click(function(){
	$(".content").each(function(){
		$(".content").removeClass("show");
	})
	$(".show").each(function(){
		$(this).removeClass("show");
	})
	$(".content1").addClass("show");
	// $('iframe').attr('src','content1.html');
	$(".incon-weixin").addClass("show");
})

//打开通讯录页
$(".address").click(function(){
	$(".content").each(function(){
		$(".content").removeClass("show");
	})
	$(".show").each(function(){
		$(this).removeClass("show");
	})
	$(".content2").addClass("show");
	// $('iframe').attr('src','content2.html');
	$(".incon-address").addClass("show");
})

//打开“发现”
$(".found").click(function(){
	$(".content").each(function(){
		$(".content").removeClass("show");
	})
	$(".show").each(function(){
		$(this).removeClass("show");
	})
	$(".content3").addClass("show");
	// $('iframe').attr('src','content3.html');
	$(".incon-found").addClass("show");
})

//打开“我”
$(".me").click(function(){
	$(".content").each(function(){
		$(".content").removeClass("show");
	})
	$(".show").each(function(){
		$(this).removeClass("show");
	})
	$(".content4").addClass("show");
	// $('iframe').attr('src','content4.html');
	$(".incon-me").addClass("show");
})

//设置侧栏高度
$(".content").height($("section").height() + $("footer").outerHeight());

//显示、隐藏侧栏
$("header").on("click",".headIcon",function(){
	showSidebar();
	}
)
$("header").on("click",".backIcon",function(){
	hideSidebar();
})
function showSidebar(){

		$(".content").removeClass("quit");
		$(".content").css('display','block');
		$(".sidebar").css('display','block');
		$(".headIcon").addClass('backIcon');
		$(".backIcon").removeClass('headIcon');
		// $('.title').css('display','none');
		// $('.name').css('display','block');
		$('.name').removeClass('none');
		$('.title').addClass('none');

}
function hideSidebar(){

	// $(".content").css('display','none');
		$(".content").addClass("quit");
		$(".backIcon").addClass('headIcon');
		$(".headIcon").removeClass('backIcon');
		$('.title').removeClass('none');
		$('.name').addClass('none');
		//监控CSS3 animation结束时
		// $(".quit").one('webkitAnimationEnd animationend', function(){
               // $(".sidebar").css('display','none')
         // });
		var t = setTimeout(function(){
			$(".sidebar").css('display','none');
		},200)

}
//侧栏点击
$('.sidebar').click(function(){
	hideSidebar();
})
$('.content').click(function(){
	event.stopPropagation(); 	 //阻止事件冒泡
})
//读取json数据
// $.getJSON("js/mail.json",function(data){
// 	$(".content1 ul").empty();
// 	var ulStr = '';
// 	$.each(data,function(i,val){
// 		// alert(val.title);
// 		var str = '<li><h3>'+
// 				  val.title+'</h3><p>'+
// 				  val.content+'</p></li>'
// 		ulStr += str;
// 	})
// 	$(".content1 ul").html(ulStr);
// })


//产生加载添增40个li
function addli(){
	var ulStr = '';
	for(var i = 0; i < 40;i++){
		var str = '<li>Pretty '+ Math.floor(Math.random()*99+1) + '</li>';
		ulStr += str;
	}
	$(".content1 ul").append(ulStr);
}

//刷新li
function refresh(){
	$(".content1 ul").empty();
	var ulStr = '';
	for(var i = 0; i < 40;i++){
		var str = '<li>Pretty '+ Math.floor(Math.random()*99+1) + '</li>';
		ulStr += str;
	}
	$(".content1 ul").append(ulStr);
}

//下拉刷新
function loaded(){
	var scroller = document.getElementById('scroller-content');
	var touchStart = 0;
	var touchLength = 0;
	// scroller.style.top = "-50px";
	scroller.addEventListener("touchstart",function(event){
		var touch = event.targetTouches[0];
		touchStart = touch.pageY;
		console.log(touchStart);
		// $("#scroller-pullDown").css('display','block');

	},false);
	scroller.addEventListener("touchmove",function(event){
		console.log($("#scroller")[0].scrollTop)
		if ($("#scroller")[0].scrollTop == 0) {
			var touch = event.targetTouches[0];
			touchLength = touch.pageY - touchStart;
			console.log("touchLength:"+touchLength);
			console.log("touchStart: " + touchStart + "height: " + $("#scroller").height());
			scroller.style.top = touchLength - 50 + "px";
			// console.log( scroller.offsetTop + touch.pageY - touchStart + "px");
			// console.log(scroller.offsetTop);
			// console.log($("#scroller")[0].scrollHeight);
			if (scroller.offsetTop > 0) {
				document.getElementById("pullDown-msg").innerHTML = "释放更新";
				$("#down-icon").addClass("reverse_icon");
			};
		};
	},false);
	scroller.addEventListener("touchend",function(event){
		// console.log(touchStart >= + ";touchLength: " + touchLength );
		touchStart = 0; //重置touchStart
		var top = scroller.offsetTop;
		// console.log(top);
		// console.log(document.scroller.scrollTop);
		if (top > 0) {
			$("#scroller-content").animate({top:'0px'},500,function(){
				$("#down-icon").addClass("loading");
				document.getElementById("pullDown-msg").innerHTML = "正在加载";
		  		var t=setTimeout(function(){
					refresh();
					console.log("已刷新");
		  			$("#scroller-content").animate({top:'-50px'},200);
		  			$("#down-icon").removeClass("reverse_icon");
		  			$("#down-icon").removeClass("loading");
		  			// $("#scroller-pullDown").css('display','none');
		  			document.getElementById("pullDown-msg").innerHTML = "下拉刷新";
				},500);
			});
		}
		else if (top >= -50) {
			$("#scroller-content").animate({top:'-50px'},100);
			// $("#scroller-pullDown").css('display','none');
			document.getElementById("pullDown-msg").innerHTML = "下拉刷新";
		}
		// else if(top <= 0 ){
		// 	// console.log("bottom"+scroller.style.bottom);
		// 	// scroller.style.bottom = "0px";
		// 	$("#scroller").animate({top:'0px'},200);
		// 	};

	},false);
}

//下拉加载

$(document).ready(function(){
	var nDivHight = $("#scroller").height();
	 $("#scroller").scroll(function(){
		  nScrollHight = $(this)[0].scrollHeight;
          nScrollTop = $(this)[0].scrollTop;
          if(nScrollTop + nDivHight >= nScrollHight)
        	var t = setTimeout(function(){
          		console.log("nScrollHight:" + nScrollHight + "nScrollTop:" + nScrollTop + "nScrollHight" + nScrollHight );
        		addli();
        		console.log("已添加");
        	},500)
          });

});
//isroll
// function loaded () {
// 	$(".content1 ul").empty();
// 	addli();
// 	var myScroll,
// 		upIcon = $("#up-icon"),
// 		downIcon = $("#down-icon");

// 	myScroll = new IScroll('#wrapper', {
// 		probeType: 3,     //probeType属性，表明此插件，可以监听scroll事件
// 		mouseWheel: true  //支持鼠标滚动
// 	});

// 	myScroll.on("scroll",function(){
// 		//scroll事件，可以用来控制上拉和下拉之后显示的模块中，
// 		//样式和内容展示的部分的改变。
// 		var y = this.y,
// 			maxY = this.maxScrollY - y,
// 			downHasClass = downIcon.hasClass("reverse_icon"),
// 			upHasClass = upIcon.hasClass("reverse_icon");
		
// 		if(y >= 40){
// 			!downHasClass && downIcon.addClass("reverse_icon");
// 			return "";
// 		}else if(y < 40 && y > 0){
// 			downHasClass && downIcon.removeClass("reverse_icon");
// 			return "";
// 		}
// 		if(maxY >= 40){
// 			!upHasClass && upIcon.addClass("reverse_icon");
// 			return "";
// 		}else if(maxY < 40 && maxY >=0){
// 			upHasClass && upIcon.removeClass("reverse_icon");
// 			return "";
// 		}
// 	});
	
// 	myScroll.on("slideDown",function(){
// 		// if(this.y > 40){
// 		// 	// alert("slideDown");
// 		// 	addli();
// 		// 	upIcon.removeClass("reverse_icon")
// 		// }
// 		if (this.y >20 && this.y < 40) {
// 			$("#pullDown-msg").html("释放立即刷新")
// 		}
// 		else if (this.y > 40) {
// 			$(".content1 ul").empty();
// 			addli();
// 		  	upIcon.removeClass("reverse_icon")
// 		};
// 	});
	
// 	myScroll.on("slideUp",function(){
// 		if(this.maxScrollY - this.y > 40){
// 			addli();
// 			// alert(this.maxScrollY + '&&' + $(".content1 ul").height() + "DD" + this.y)
// 			upIcon.removeClass("reverse_icon")
// 		}
// 		myScroll.refresh();
// 	});
// }
