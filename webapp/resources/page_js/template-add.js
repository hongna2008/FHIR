var zTree,zTreeExt,filters;
$(function(){
	var setting = {
		view: {
			showIcon: false,
			dblClickExpand:false,
			addDiyDom:function(treeId, treeNode){
				if(treeNode.tId != "zTree_1"){
					var rowDom = $("#"+treeNode.tId);
					var addBtn = $("<input type='checkbox' class='chk' tId='"+treeNode.tId+"'></input>");
					$(rowDom).find("> [treenode_a]").append(addBtn);
					
					$(addBtn).click(function(){
						var li = $(this).parents("li:first");
						var oned = this.checked;
						$(":checkbox",li).each(function(){
							this.checked = oned;
						});
						if(this.checked){
							addObject(this);
						}else{
							delObject(this);
						}
					});
				}
			}
		}
	};

	var settingExt = {
			view: {
				showIcon: false,
				dblClickExpand:false,
				addDiyDom:function(treeId, treeNode){
					var rowDom = $("#"+treeNode.tId);
					var addBtn = $("<a class='add-item' tId='"+treeNode.tId+"'>+</a>");
					$(rowDom).find("> [treenode_a]").append(addBtn);
					$(addBtn).click(function(){
						var tId = $(this).attr("tId");
						var curNode = zTreeExt.getNodeByTId(tId);
						openWin({
							title:"New Item",
							url:ctx+'/template-item-add.jsp',
							width:400
						},function(result){
							zTreeExt.addNodes(curNode,result);
						});
					});
					if(treeNode.level != 0){
						var delBtn = $("<a class='del-item' tId='"+treeNode.tId+"'>-</a>");
						$(rowDom).find("> [treenode_a]").append(delBtn);
						$(delBtn).click(function(){
							var tId = $(this).attr("tId");
							var curNode = zTreeExt.getNodeByTId(tId);
							if(curNode.newItem){
								zTreeExt.removeNode(curNode);
							}else{
								zTreeExt.hideNode(curNode);
							}
						});
					}
				}
			},

			callback:{
				onDblClick:function(e,treeId,node){
					var rowDom = $("#"+node.tId);
					if(node.level == 0){
						openWin({
							title:"Defined Template Name",
							url:ctx+'/template-item-name-add.jsp',
							width:400
						},function(result){
							node.name = result.name;
							rowDom.find(".node_name:first").html(node.name);
						});
					}					
				}
			}
		};
	
	var url = "";
	if(templateType == "extension"){
		url = ctx+'/resources/page_js/config/extension.config.template.js';
	}else if(templateType == "profile"){
		url = ctx+'/resources/page_js/config/profile.config.template.js';	
	}
	
	$.getScript(url,function(){
		zTree = $.fn.zTree.init($("#zTree"), setting, json);
		zTree.expandAll(true);
		zTreeExt = $.fn.zTree.init($("#zTreeExt"), settingExt, json);
		var root = zTreeExt.getNodeByTId("zTreeExt_1");
		zTreeExt.hideNodes(root.children);
	});
	
	$("#btn-save-template").click(function(){
		filters = null;
		var el = this;
		var nodes = zTreeExt.getNodes();
		var	root = {};
		cycleFilterData(root,nodes);
		cycleUpload(filters);
//		console.log(filters);
		if(!filters.name || filters.name == "<FHIR Extension Template>"){
			alert("Please replace the name at the root node");
			return;
		}
		filters.open = true;
		$.loading();
		initRequestJson(ctx+'/template/upload',function(data){
			$.loaded();
			if(data.success){
				$(el).parents(".ifm-window:first").trigger("callback",1);
			}else{
				alert(data.error);
			}
		},{
			templateName:filters.name,
			templateType:templateType,
			json:"var json = " + JSON.stringify(filters)
		});
	});
});
function addObject(o){
	var tId = $(o).attr("tId");
	var zTreeExtTid = tId.replace("zTree","zTreeExt");
	var nodeExt = zTreeExt.getNodeByTId(zTreeExtTid);
//	cycleShowParentNode(nodeExt);
	zTreeExt.showNode(nodeExt);
	zTreeExt.expandNode(nodeExt,true,true);
	cycleShowChildrenNode(nodeExt);
}
function cycleShowChildrenNode(node){
	if(node.children){
		for(var i in node.children){
			zTreeExt.showNode(node.children[i]);
			cycleShowChildrenNode(node.children[i]);
		}
	}
}
function delObject(o){
	var tId = $(o).attr("tId");
	var zTreeExtTid = tId.replace("zTree","zTreeExt");
	var nodeExt = zTreeExt.getNodeByTId(zTreeExtTid);
	zTreeExt.hideNode(nodeExt);
}

function cycleFilterData(parentNode,nodes){
	for(var i in nodes){
		var node = nodes[i];
		var nodeObj = {
			name:node.name,
		};
		if(node.defaultValue){
			nodeObj.defaultValue = node.defaultValue;
		}
		if(node.dataType){
			nodeObj.dataType = node.dataType;
		}
		if(node.childrenClone){
			nodeObj.childrenClone = node.childrenClone;
		}
		if(node.isHidden === false){
			parentNode.children = parentNode.children || [];
			parentNode.children.push(nodeObj);
			if(!filters){
				filters = parentNode;
			}
		}
		if(node.children || node.level == 0){
			cycleFilterData(nodeObj,node.children);
		}
	}
}

function cycleUpload(filters){
	if(filters.children){
		for(var i in filters.children){
			var node = filters.children[i];
			if(node.children && node.childrenClone){
				delete node.children;
			}
			cycleUpload(node);
		}
	}
}