function openWin(obj, fn,fn2) {
var  DPGlobalComtemplate = '<div class="ifm-window" style="display:none">'+
'<div class="ifm-shade"></div>'+
'<div class="ifm-header f-drag">'+
'<div class="ifm-close">×</div>'+
'<div class="ifm-title"></div>'+
'</div>'+
'</div>';
	obj.url = $.trim(obj.url);
	if(!obj.url){
		return;
	}
	var ifmWindow = $(DPGlobalComtemplate);
	$(document.body).append(ifmWindow);
	$(".ifm-close",ifmWindow).click(function() {
		$(ifmWindow).trigger("cancle");
		if($(".ifm-window").size() == 1){
			$(".ifm-shade",ifmWindow).remove();
		}
		$(this).parents(".ifm-window:first").remove();
	});
	//class
	ifmWindow.attr("class",ifmWindow.attr("class"));
	//width
	if(obj.width){
		ifmWindow.width(obj.width);
	}else{
		ifmWindow.width($(window).width()*0.7);
	}
	//height
	if(obj.height){
		ifmWindow.height(obj.height);
	}
	//title
	$(".ifm-title",ifmWindow).html(obj.title||"&nbsp;");
	
	if(obj.iframe){
		ifmWindow.append('<iframe frameborder="0" class="ifm-body"></iframe>');
		$(".ifm-body",ifmWindow).height(obj.height||$(document,parent).height()*0.8);
	}else{
		ifmWindow.append('<div class="ifm-body"></div>');
	}
	if(obj.iframe){
		if($(".ifm-shade:visible",parent.window.document).size() > 0){
			$(".ifm-shade",ifmWindow).hide();
		}else{
			$(".ifm-shade",ifmWindow).show();
		}
		obj.url += obj.url.indexOf("?") > -1 ? "&iframe=true" : "?iframe=true";
		var $url = encodeURI(obj.url);
		if(typeof obj.data == "object"){
			$url +="&"+$.param(obj.data);
		}else if(typeof obj.data == "string"){
			$url +="&"+obj.data;
		}
		$(".ifm-body",ifmWindow).attr("src", $url);
		$(".ifm-body",ifmWindow).on("load",function() {
			if(fn2){
				fn2(ifmWindow);
			}
			this.callback = function(){
				$(".ifm-close",ifmWindow).trigger("click");
				if(fn){
					fn.apply(ifmWindow,arguments);
				}
			};
		});
	}else{
		$(".ifm-shade",ifmWindow).show();
		$(".ifm-body",ifmWindow).load(encodeURI(obj.url),obj.data,function(){
			if(fn2){
				fn2(ifmWindow);
			}
			$(ifmWindow).trigger("loadSuccess");
		});
		if(fn){
			$(ifmWindow).unbind("callback").bind("callback",function(e,data){
				$(".ifm-close",ifmWindow).trigger("click");
				fn.call(ifmWindow,data);
			});
		}else{
			$(ifmWindow).unbind("callback").bind("callback",function(e,data){
				$(".ifm-close",ifmWindow).trigger("click");
			});
		}
	}	
	$(ifmWindow).css({
		left : ($(document).width() - $(ifmWindow).width())*0.5 ,
		top : obj.top?obj.top:$(window).scrollTop(),
		display:'block'
	});
	return ifmWindow;
}