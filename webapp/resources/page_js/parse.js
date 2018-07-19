var parse = {
		i:0,
		schemas:{},
		cachedata:{},
		clear:function(){
			parse.i = 0;
			parse.schemas = {};
			parse.cachedata = {};
		},
		counter:function(){
			return ++parse.i;
		},
		treeSearch:function(searchName){
			var dir = $("#menu .header.active").attr("dir");
			$("#TreeView").TreeDiagram("treeSearch", {
				dir: dir,
				searchName: searchName
			});
		},
		profile:{
			tree:{
				transferData:function(treeData,params){
					parse.clear();
					parse.cachedata = treeData.snapshot.element;
					var elements = $.extend(true,[],treeData.snapshot.element);
					for(var i = 0; i < elements.length;i++){
						var e = elements[i];
						if(e){
							e.name = e.id.split(/\.|:/).pop();
							transfer(elements,e,i,params);
						}
					}
					
					function transfer(elements,e,i,params){
						for(var j = i+1; j < elements.length;j++){
							var o = elements[j];
							if(o && o.id.indexOf(e.id+".") == 0){
								e.children = e.children || [];
								if(params && params.dir == "extension"){
									o.name = o.id.split(/:/).pop();
								}else{
									o.name = o.path.split(/\.|:/).pop();
								}
								e.children.push(o);
								delete elements[j];
								j--;
								transfer(elements,o,j);
							}
						}
					}
					return elements[0];
			},
			click:function(jq,d){
				$(".Summary .list").hide();
				$(".Summary .list[type='profile']").show();
				
				$(".Summary [data-value]").html("");

				$(".Summary [data-value='Name']").html(d.name);
				$(".Summary [data-value='Path']").html(d.path);
				$(".Summary [data-value='Multiplicity']").html(d.min + '..' + d.max);
				$(".Summary [data-value='Short']").html(d["short"]);
				$(".Summary [data-value='Definition']").html(d.definition);
				$(".Summary [data-value='Requirements']").html("");
				if(d.type){
					var dataTypes = [];
					$(d.type).each(function(i,k){
						if(k.code == "Reference"){
							dataTypes.push(k.code + " " + k.targetProfile);
						}else{
							dataTypes.push(k.code);
						}
					});
					$(".Summary [data-value='Datatype']").html(dataTypes.join("<br/>"));
				}
				if(d.binding){
					$(".Summary [data-value='Binding']").html(d.binding.valueSetReference.reference);
				}
				var elements = parse.cachedata;
				for(var a,i = 0; i < elements.length,a = elements[i];i++){
					if(a.id == d.id){
						$(".Json textarea").html(JSON.stringify(a, null, '\t'));
						break;
					}
				}
			}
		},
		diagram:{
			transferData:function(treeData){
				parse.clear();
				
				var elements = $.extend(true,[],treeData.snapshot.element);
				var result = {};
				for(var i = 0; i < elements.length;i++){
					var a = elements[i];
					if(a.path == treeData.type){
						result["name"] = a.path;
					}else{
						if(a.type){
		    				result["children"] = result["children"] || [];
				    		for(var n,j = 0; j < a.type.length,n = a.type[j];j++){
				    			if(n.code == "Reference"){
				    				var name = n.targetProfile.split("/").pop();
				    				var exists = false;
				    				for(var k = 0; k < result["children"].length;k++){
				    					if(result["children"][k]["name"] == name){
				    						exists = true;
				    						break;
				    					}
				    				}
				    				if(!exists){
				    					result["children"].push({
					    					name: name
					    				});
				    				}
								}
							}
						}
					}
				}
				return result;
			}
		}
	},
	schema:{
			tree:{
				transferData:function(treeData){
					parse.clear();
					var root = $.extend(true,{},treeData);
					transferParent(root,root.id,root);
					
					function transferParent(curNode,resourceURL,datas){
						var arr = resourceURL.split(/\//);
						var rootKey = arr.pop();
						var rootPath = arr.join("/");
						
						var treeData = $.extend(true,{},datas);
						var elements = datas.definitions[rootKey].allOf[1].properties,
							elements1 = treeData.definitions[rootKey].allOf[1].properties;
						//extends field
						curNode.name = curNode.name || rootKey;
						curNode.id = curNode.id || parse.counter();
						curNode.children = curNode.children || [];
						//clone
						parse.cachedata[curNode.id] = treeData.definitions[rootKey];

						for(var key in elements){
							var e = elements[key],
								e_copy = elements1[key];
							if(key.indexOf("_") == -1){
								//extends field
								e.id = parse.counter();
								e.name = e.type == "array" ? key + "[]" : key;
								e.children = [];
								//clone
								parse.cachedata[e.id] = e_copy;
								//cycle data
								curNode.children.push(e);
								transfer(rootPath,treeData,e);
							}
						}
					}
					function transfer(rootPath,treeData,e){
						if(e.$ref || (e.items && e.items.$ref)){
							var $ref = e.$ref || e.items.$ref;
							if($ref.split(/\//).pop() != "Reference"){
								var o = e.$ref ? e : {};
								var prefix = $ref.split(/#/).shift();
								var ref = $ref.split(/\//).pop();
								var resourceURL = rootPath+'/' + ref;
								if(!e.$ref){
									o.name = ref;
									e.children.push(o);
								}
								if(prefix && !parse.schemas[prefix]){
									//from url
									var result = initRequestJson(rootPath+'/'+prefix);
									parse.schemas[prefix] = result;
									transferParent(o,resourceURL,$.extend(true,{},result));
								}else if(parse.schemas[prefix]){
									transferParent(o,resourceURL,$.extend(true,{},parse.schemas[prefix]));
								}else{
									transferParent(o,resourceURL,$.extend(true,{},treeData));
								}
							}
						}
					}
					return root;
			},
			click:function(jq,d){
				$(".Summary .list").hide();
				$(".Summary .list[type='schema']").show();
				$(".Summary [data-value]").html("");

				$(".Summary [data-value='Name']").html(d.name.replace(/\[\]/,""));
				var cacheObj = parse.cachedata[d.id];
				var ref = "";
				if(d.$ref){
					ref = d.$ref.split(/\//).pop();
				}else if(d.items && d.items.$ref){
					ref = d.items.$ref.split(/\//).pop();
				}
				if(ref){
					$(".Summary [data-value='Type']").html(ref);
				}else if(cacheObj.allOf){
					$(".Summary [data-value='Type']").html(cacheObj.allOf[0].$ref.split(/\//).pop());
					$(".Summary [data-value='Definition']").html(cacheObj.allOf[1].description);
				}else{
					$(".Summary [data-value='Type']").html(cacheObj.type);
				}
				if(d.description){
					$(".Summary [data-value='Definition']").html(d.description);
				}
				
				if(cacheObj["enum"]){
					$(".Summary [data-value='Enums']").html(cacheObj["enum"].join("<br/>"));
				}
				if(parse.cachedata && parse.cachedata[d.id]){
					$(".Json textarea").html(JSON.stringify(cacheObj, null, '\t'));
				}
			},search:function(){
				
			}
		}
	}
}