var zTree;
$(function(){

	var setting = {
		view: {
			showIcon: false,
			dblClickExpand:false,
			addDiyDom:function(treeId, treeNode){
				var rowDom = $("#"+treeNode.tId);
				if(treeNode.dataType === "increase"){
					var addBtn = $("<A tId='"+treeNode.tId+"' class='put-add'>+</A><A tId='"+treeNode.tId+"' class='put-del'>-</A>");
					$(rowDom).append(addBtn);
					$(addBtn).filter(".put-add").click(function(){
						addObject(this);
					});
					
					$(addBtn).filter(".put-del").click(function(){
						delObject(this);
					});
				}
				var desc = treeNode.desc;
				if(desc){
					var font = $("<font class='week'></font>");
					font.text("//"+desc+"");
					$(rowDom).find("[treenode_a]").append(font);
				}
			}
		},
		data: {
			simpleData: {
				enable: true
			}
		},
		callback:{
			onDblClick:function(e,treeId,node){
				if(!node) return;
				if(node.isParent){
					if(node.level != 0) return;
				}
				var name = node.name + "";
				var json = node.json || "";
				openWin({
					url:ctx+"/data-add-input.jsp?nodeName="+name,
					width:500,
					title:name.replace(/>|</g,"")
				},function(result){
					node.json = result;
					if(result){
						if(node.level == 0){
							$("#"+node.tId).find("> [treenode_a] .node_name").text("<"+result+">");
						}else{
							$("#"+node.tId).find("> [treenode_a] .node_name").text(node.name+":"+overflow(result));
						}
					}else{
						$("#"+node.tId).find("> [treenode_a] .node_name").text(node.name);
					}
					preview();
				},function(ifmWindow){
					var result = [];
					result.push("<div class='put-json'>");
					result.push("<span><textarea>"+json+"</textarea></span>");
					result.push("</div>");
					$(ifmWindow).find("#json").html(result.join(""));
				});
			}
		}
	};

	var url = "";
//	if(templateType == "extension"){
//		url = ctx+'/resources/page_js/config/extension.config.js';
//	}else if(templateType == "profile"){
//		url = ctx+'/resources/page_js/config/profile.config.js';	
//	}
	url = ctx+'/template/'+templateType+'/'+templateName;
	$.getScript(url,function(){
		json.name = "<"+templateType+" name>";
		zTree = $.fn.zTree.init($("#zTree"), setting, json);
	});
	
	
	$("#upload").click(function(){
		var el = this;
		var root = zTree.getNodes()[0];
		if(!root.json){
			alert("Please replace the "+(root.name)+" at the root node");
			return;
		}
		$.loading();
		initRequestJson(ctx+'/upload',function(data){
			$.loaded();
			if(data.success){
				$(el).parents(".ifm-window:first").trigger("callback",1);
			}else{
				alert(data.error);
			}
		},{
			templateName:root.json,
			templateType:templateType,
			json:$("#preview").val().replace(/\t|\n/g,"")
		});
	});
});
function addObject(o){
	var node = zTree.getNodeByTId($(o).attr("tId"));
	var lastChild = $.extend({},node.childrenClone[0]);
	if(node.dataType == "increase"){
		lastChild["name"] = node.children ? node.children.length : 0;
	}
	zTree.addNodes(node, lastChild);
	preview();
}
function delObject(o){
	var node = zTree.getNodeByTId($(o).attr("tId"));
	if(node.children && node.children.length > 0){
		zTree.removeNode(node.children.pop());
		preview();
	}
}
function preview(){
	var root = zTree.getNodes()[0];
	var keys = [];
	var grnerJson = {};
	cycle(root,grnerJson);
	function cycle(root,obj){
		if(root && root.children){
			for(var i in root.children){
				var o = root.children[i];
				var key = o.name;
				var value;
				if(o.dataType == "increase"){
					value = o.json || [];
				}else{
					value = o.json || "";
				}
				if(obj == grnerJson){
					keys.push(key);
				}
				if(o.children){
					if(o.dataType == "increase"){
						obj[key] = [];
					}else{
						obj[key] = {};
					}
					cycle(o,obj[key]);
				}else{
					obj[key] = value;
				}
			}
		}
	}
	$("#preview").val(JSON.stringify(grnerJson, null, '\t'));
}
function overflow(text){
	if(text && text.length > 40){
		text = text.substr(0,40) + "...";
	}
	return text;
}