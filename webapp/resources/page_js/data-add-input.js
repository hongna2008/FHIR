$(function(){
	$("#btn-save").click(function(){
		$(this).parents(".ifm-window:first").trigger("callback",$(".put-json textarea").val().trim() || "");
	});
	$("#btn-quit").click(function(){
		$(this).parents(".ifm-window:first").remove();
	});
});