$(function(){
	initResize();
	initTab();
	initEvent();
	initFileList();
});
function initRequestJson(path,fn,obj,dataType){
	var result;
	$.ajax({
		dataType:dataType || "json",
		async:fn?true:false,
		type:obj?"post":"get",
		data:obj||{},
		url: path,
		success:function(data){
			if(fn){
				fn(data);
			}else{
				result = data;
			}
		}
	});
	return result;
}

function initEvent(){
	$("#menu .push").click(function(){
		$("#menu").each(function(){
			if(!$(this).attr("c")){
				$(this).css("transform","rotate(0deg)");
				$(this).attr("c","1");
			}else{
				$(this).css("transform","rotate(90deg)");
				$(this).removeAttr("c");
			}
		});
	});

	$("#treeview-search .push").click(function(){
		$("#treeview-search").each(function(){
			if(!$(this).attr("c")){
				$(this).css("bottom",-65);
				$(this).attr("c","1");
			}else{
				$(this).css("bottom",0);
				$(this).removeAttr("c");
			}
		});
	});
	
	$("#menu .header").click(function(){
		var menu = $("#menu");
		$(".header.active",menu).next().height(0);
		$(this).next().each(function(){
			$(this).height("auto");
		});
		$(".active",menu).removeClass("active");
		$(this).addClass("active");
	});
	$(".template-add").click(function(e){
		e.stopPropagation();
		var rowParent = $(this).parents(".header:first");
		var dir = $(rowParent).attr("dir");
		openWin({
			url:ctx+"/template-add.jsp?templateType="+dir,
			title:dir == "profile" ? "FHIR Resource Profiling" : "FHIR Extension Defining",
			width:$(window).width() * 0.7
		},function(result){
			if(result == 1){
				initFileList();
			}
		});
	});
	
	$(".template-dec").click(function(e){
		e.stopPropagation();
		var rowParent = $(this).parents(".header:first");
		if($("#menu .body .active").size() == 0){
			alert("Please select the node to delete");
			return;
		}
		var r = confirm("Whether or not to confirm the deletion?");
		if(r){
			var fileName = rowParent.next().find(".active").attr("fileName");
			initRequestJson(ctx+'/removeFile',function(data){
				if(data.success){
					$("#menu .body .active").parent().remove();
				}
			},{
				dir: $(rowParent).attr("dir"),
				fileName:fileName
			});
		}
	});
	
	$("#treeview-search").each(function(){
		var el = this;
		$(".search",this).click($.proxy(selectText,window,el));
		$(":text",this).blur($.proxy(selectText,window,el));
		$(":text",this).keydown($.proxy(selectText,window,el));
	});
}
function initFileList(){
	initRequestJson(ctx+"/getFilesByDir",function(data){
		if(data){
			for(var key in data){
				var arr = $("<ul></ul>");
				var panel = $("#menu .header[dir='"+key+"']");
				for (var j in data[key]) {
					var o = data[key][j];
					$(arr).append("<li><a title='"+o.split(".").shift()+"' fileName='"+o+"'>" +o.split(".").shift()+"</a></li>");
				}
				$(panel).find("font").html(data[key].length);
				$(panel).next().html(arr);
			}
			
			$("#menu .body a").click(function(){
				$("#menu .body").find(".active").removeClass("active");
				$(this).addClass("active");
				$("#businessType .active").trigger("click");
			});
		}
	});
}
function selectText(el,e){
	if(e.type == "click" || e.type == "blur"  || 
		(e.type == "keydown" && e.keyCode == 13)){
		if($("#TreeView svg").size() > 0){
			parse.treeSearch($(":text",el).val().trim());
		}
	}
}
function initTab(){
	$(".tabs .tab").click(function(){
		var tabs = $(this).parents(".tabs:first");
		$(".tab.active",tabs).removeClass("active");
		$(this).addClass("active");
		$(".tabs-panel>div",tabs).hide();
		$(".tabs-panel>div:eq("+$(this).index()+")",tabs).show();
		
		if($(tabs).attr("id") == "businessType"){
			var dir = $("#menu .header.active").attr("dir");
			var parseHandle = $("#menu .header.active").attr("parse-handle");
			var tabName = $(this).attr("path");
			var fileName = $("#menu .body .active").attr("fileName");
			if(dir){
				if(tabName == "TreeView" && $("#TreeView").attr("fileName") != fileName){
					$("#TreeView").attr("fileName",dir+"#"+fileName);
					$("#TreeView").TreeDiagram({
						click:parse[parseHandle].tree.click
					});
					$("#TreeView").TreeDiagram("createTree", {
						dir: dir,
						fileName: fileName,
						parseHandle:parseHandle
					});
				}else if(tabName == "Diagram" && $("#Diagram").attr("fileName") != fileName){
					$("#Diagram").attr("fileName",dir+"#"+fileName);
					$("#Diagram").TreeDiagram();
					if(dir == "schema"){
						
					}else{
						$("#Diagram").TreeDiagram("createDiagram",{
							dir:dir ,
							fileName: fileName,
							parseHandle:parseHandle
						});
					}
				}
			}
		}
	});
}
function initResize(){
	$(".content-wrapper").height($(window).height() -10);

	$(".tabs-panel").each(function(){
		$(this).height($(window).height() - $(this).prev().height() - 40);
	});
}