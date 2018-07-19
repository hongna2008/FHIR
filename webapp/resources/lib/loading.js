/**
 * loading.js
 * 
 */
$.loading = function(ops){
	ops = ops ||{};
	var el = ops.context || document.body;
	var elWin = ops.context || window;
	
	$(".shade-mask-msg").remove();
	$("<div id='shade-mask' style='display:block;'></div>").appendTo(el);
	$("<div class=\"shade-mask-msg\" style=\"display:block;\"></div>").html(ops.message||"In the process, please later...").appendTo(el);

	$(".shade-mask-msg").css({
		left : ($(elWin).width() - $(".shade-mask-msg").width())*0.5 ,
		top : $(elWin).scrollTop() + ($(elWin).height()-45)*0.5,
		display:'block'
	});
};
$.loaded = function(ops){
	$(".shade-mask-msg").remove();
	$("#shade-mask").remove();
};