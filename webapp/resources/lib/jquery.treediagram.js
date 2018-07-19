(function(){
	var icon = ["resources/images/icon_resource.png",
			"resources/images/icon_element.gif",
			"resources/images/icon_reference.png",
			"resources/images/icon_datatype.gif",
			"resources/images/icon_primitive.png"];
	
	$.fn.TreeDiagram=function(_1,_2){
		if(typeof _1=="string"){
			return $.fn.TreeDiagram.methods[_1](this,_2);
		}
		$(this).html("");
		var opts=$.extend({},$.fn.TreeDiagram.defaults,_1);
		$(this).data("options",opts);
	};

	$.fn.TreeDiagram.defaults = {
		duration:750,
		width:0,
		height:0,
		click:function(){
			
		}
	};
	
	$.fn.TreeDiagram.methods = {
		createTree:function(jq,params){
//			d3.json(params.path, function(error, treeData) {
			initRequestJson(ctx+"/getFile",function(treeData){
				if(params.parseHandle == "profile"){
					treeData = parse.profile.tree.transferData(treeData,params);
				}else if(params.parseHandle == "schema"){
					treeData = parse.schema.tree.transferData(treeData,params);
				}
			    d.createTree.call(d,jq,treeData);
			},params);
//			});
		},
		treeSearch:function(jq,params){
			var sg = d.svgGroup;
			var node = sg.selectAll(".focusNode").attr("class","");
			if(params.searchName){
				node = sg.selectAll("g.node").filter(function(d) {
			    	return d.name == params.searchName;
			    });
				node.selectAll("text").attr("class", "focusNode");
			}
		},
		createDiagram:function(jq,params){
//			d3.json(params.path, function(error, treeData) {
			initRequestJson(ctx+"/getFile",function(treeData){
				if(params.parseHandle == "profile"){
					treeData = parse.profile.diagram.transferData(treeData,params);
				}else if(params.parseHandle == "schema"){
					
				}
			    g.createDiagram.call(g,jq,treeData);
			},params);
//			});
		}
	};
	
	var d = {
		root:null,
		tree:null,
		svgGroup:null,
		diagonal:null,
		zoomListener:null,
		maxLabelLength:0,
		createTree:function(jq,treeData){
			var util = this;
			this.root = treeData;
			var ops = $(jq).data("options");
			ops.width = $(jq).width() || 0;
			ops.height = $(jq).height() || 0;
			this.tree = d3.layout.tree().size([ops.height*1.3, ops.width*1.3]).separation(function(a, b){
					return 5;
			});
			// define a d3 diagonal projection for use by the node paths later on.
		    this.diagonal = d3.svg.diagonal().projection(function(d) {
		        return [d.y, d.x];
		    });
		 	// Call visit function to establish maxLabelLength
		    this.visit(this.root, function(d) {
		        util.maxLabelLength = Math.max(d.name.length, util.maxLabelLength);
		    }, function(d) {
		        return d.children && d.children.length > 0 ? d.children : null;
		    });
		    // define the zoomListener which calls the zoom function on the "zoom" event constrained within the scaleExtents
		    this.zoomListener = d3.behavior.zoom().scaleExtent([0.1, 3]).on("zoom", function(){
		    	util.zoom.call(util);
		    });
		    // define the baseSvg, attaching a class for styling and the zoomListener
		    var baseSvg = d3.select(jq[0]).append("svg")
		        .attr("width", ops.width)
		        .attr("height", ops.width)
		        .attr("class", "overlay")
		        .call(this.zoomListener);
		  
		    this.svgGroup = baseSvg.append("g");
		    // Define the root
		    this.root.x0 = ops.height / 2;
		    this.root.y0 = 0;
		    // Layout the tree initially and center on the root node.
		    this.update(jq,this.root);
		    this.centerNode(jq,this.root);
		},
		zoom:function() {
	       this.svgGroup.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
	    },
		// A recursive helper function for performing some setup by walking through all nodes
		visit:function(parent, visitFn, childrenFn) {
		    if (!parent) return;
		    visitFn(parent);
		    var children = childrenFn(parent);
		    if (children) {
		        var count = children.length;
		        for (var i = 0; i < count; i++) {
		            this.visit(children[i], visitFn, childrenFn);
		        }
		    }
		},
		update:function(jq,source) {
			var util = this;
			var ops = $(jq).data("options");
		    // Compute the new height, function counts total children of root node and sets tree height accordingly.
		    // This prevents the layout looking squashed when new nodes are made visible or looking sparse when nodes are removed
		    // This makes the layout more consistent.
		    var levelWidth = [1];
		    var childCount = function(level, n) {
		        if (n.children && n.children.length > 0) {
		            if (levelWidth.length <= level + 1) levelWidth.push(0);
		            levelWidth[level + 1] += n.children.length;
		            n.children.forEach(function(d) {
		                childCount(level + 1, d);
		            });
		        }
		    };
		    childCount(0, this.root);
		    var newHeight = d3.max(levelWidth) * 25; // 25 pixels per line  
//		    this.tree = this.tree.size([ops.height, ops.width]);
		    // Compute the new tree layout.
		    var nodes = this.tree.nodes(this.root).reverse(),
		        links = this.tree.links(nodes);
		    // Set widths between levels based on maxLabelLength.
		    nodes.forEach(function(d) {
		        d.y = (d.depth * (util.maxLabelLength * 10)); 
		    });
		    // Update the nodes…
		    node = this.svgGroup.selectAll("g.node").data(nodes, function(d) {
		    	return d.id;
		    });
		    // Enter any new nodes at the parent's previous position.
		    var nodeEnter = node.enter().append("g").attr("class", "node").attr("transform", function(d) {
		    	return "translate(" + source.y0 + "," + source.x0 + ")";
		    }).on('dblclick', function(d){
		    	event.stopPropagation();
		    	event.preventDefault();
		    });
		    
		    nodeEnter.append("circle").attr('class', 'nodeCircle').attr("r", 0).style("fill", function(d) {
		        return d._children ? "lightsteelblue" : "#fff";
		    }).on('click', function(d){
		    	util.click(jq,d);
		    });
		    
		    nodeEnter.append("text").attr("x", function(d) {
		        return d.children || d._children ? -10 : 10;
		    })
		    .attr("dy", ".35em").attr("text-anchor", function(d) {
		        return d.children || d._children ? "end" : "start";
		    })
		    .text(function(d) {
		        return d.name;
		    }).style("fill-opacity", 0)
		    .on('click', function(d){
		    	ops.click(jq,d);
		    });
		    
		    nodeEnter
		    .append("image")
		    .attr("xlink:href", function(a){
		    	var dataTypes = [];
		    	if(a.depth == 0){
			    	return icon[0];
		    	}else{
		    		//Profile Reference
		    		if(a.type){
			    		for(var n,i = 0; i < a.type.length,n = a.type[i];i++){
			    			if(n.code == "Reference"){
			    				return icon[2];
							}
						}
		    		}
		    		//Schema Reference 
		    		if(a.$ref && a.$ref.split(/\//).pop() == "Reference"){
		    			return icon[2];
		    		}
		    		//Leaf
		    		if(!a.children){
		    			return icon[4];
		    		}
		    		return icon[3];
		    	}
		    })
		    .attr("transform", function(a){
		    	return "translate(0, -9)"
		    });
		    
		    // Update the text to reflect whether node has children or not.
		    node.select('text').attr("x", function(d) {
		        return d.children || d._children ? -10 : 30;
		    }).attr("text-anchor", function(d) {
		        return d.children || d._children ? "end" : "start";
		    }).text(function(d) {
		        return d.name;
		    });
		    
		    node.select('image')
		    .attr("transform", function(a){
	    		return "translate("+(this.previousSibling.getBBox().x - 20)+", -9)";
		    });
		    
		    // Change the circle fill depending on whether it has children and is collapsed
		    node.select("circle.nodeCircle").attr("r", 4.5).style("fill", function(d) {
		      	return d._children ? "lightsteelblue" : "#fff";
		  	});
		    // Transition nodes to their new position.
		    var nodeUpdate = node.transition().duration(ops.duration).attr("transform", function(d) {
		        return "translate(" + d.y + "," + d.x + ")";
		    });
		    // Fade the text in
		    nodeUpdate.select("text").style("fill-opacity", 1);
		    // Transition exiting nodes to the parent's new position.
		    var nodeExit = node.exit().transition().duration(ops.duration).attr("transform", function(d) {
		        return "translate(" + source.y + "," + source.x + ")";
		    }).remove();
		    nodeExit.select("circle").attr("r", 0);
		    nodeExit.select("text").style("fill-opacity", 0);
		    // Update the links…
		    var link = this.svgGroup.selectAll("path.link").data(links, function(d) {
		        return d.target.id;
		    });
		    // Enter any new links at the parent's previous position.
		    link.enter().insert("path", "g").attr("class", "link")
		    .attr("d", function(d) {
		        var o = {
		            x: source.x0,
		            y: source.y0
		        };
		        return util.diagonal({
		            source: o,
		            target: o
		        });
		    });
		    // Transition links to their new position.
		    link.transition() .duration(ops.duration).attr("d", this.diagonal);
		    // Transition exiting nodes to the parent's new position.
		    link.exit().transition().duration(ops.duration).attr("d", function(d) {
		       var o = {
		           x: source.x,
		           y: source.y
		       };
		       return util.diagonal({
		    	   source:o,
		    	   target:o
		       });
		       
		    }).remove();
		    // Stash the old positions for transition.
		    nodes.forEach(function(d) {
		        d.x0 = d.x;
		        d.y0 = d.y;
		    });
		},
		centerNode:function(jq,source) {
		    var scale = this.zoomListener.scale();
		    var ops = $(jq).data("options");
		    x = -source.y0;
		    y = -source.x0;
		    x = x * scale + ops.width / 2;
		    y = y * scale + ops.height / 2;
		    d3.select('g').transition()
		        .duration(ops.duration)
		        .attr("transform", "translate(" + x + "," + y + ")scale(" + scale + ")");
		    this.zoomListener.scale(scale);
		    this.zoomListener.translate([x, y]);
		},
		toggleChildren:function(d) {
		    if (d.children) {
		        d._children = d.children;
		        d.children = null;
		    } else if (d._children) {
		        d.children = d._children;
		        d._children = null;
		    }
		    return d;
		},
		// Toggle children on click.
		click:function(jq,d) {
			var opts = $(jq).data("options");
		    d = this.toggleChildren(d);
		    this.update(jq,d);
		    this.centerNode(jq,d);
//		    opts.click(jq,d);
		}
	};
	
	var g = {
		createDiagram:function(jq,treeData){
			var util = this;
			this.root = treeData;
			var ops = $(jq).data("options");
			ops.width = $(jq).width() || 0;
			ops.height = $(jq).height() || 0;
			
			this.force = d3.layout.force()
				.size([ops.width, ops.height])
				.charge(-2000)
				.linkDistance(200)
				.on("tick",function(){
					util.tick.call(util);
				});
			var svg = d3.select(jq[0]).append("svg").attr("width", ops.width).attr("height", ops.height);
			this.link = svg.selectAll(".link");
			this.node = svg.selectAll(".node");
			this.text = svg.selectAll(".text");
			this.update.call(this,jq);
		},
		update:function(jq) {
		  var util = this;
			
		  var nodes = this.flatten(this.root);
		  
		  var links = d3.layout.tree().links(nodes);
		  // Restart the force layout.
		  this.force.nodes(nodes).links(links).start();

		  // Update the links…
		  this.link = this.link.data(links, function(d) { return d.target.id; });

		  // Exit any old links.
		  this.link.exit().remove();

		  // Enter any new links.
		  this.link.enter().insert("line", ".node")
		      .attr("class", "link")
		      .attr("x1", function(d) { return d.source.x; })
		      .attr("y1", function(d) { return d.source.y; })
		      .attr("x2", function(d) { return d.target.x; })
		      .attr("y2", function(d) { return d.target.y; });

		  // Update the nodes…
		  this.node = this.node.data(nodes, function(d) { return d.id; }).style("fill", util.color);

		  // Exit any old nodes.
		  this.node.exit().remove();

		  // Enter any new nodes.
		  this.node.enter().append("rect")
		      .attr("class", "node")
		      .attr("x", function(d) { return d.x; })
		      .attr("y", function(d) { return d.y; })
		      .attr("rx", 10)
		      .attr("ry", 10)
		      .attr("width", function(d) { 
		    	  	return d.name.length * 10;
		      })
		      .attr("height",30)
		      .style("fill", this.color)
		      .on("click", function(d){
//		    	  util.click.call(util,jq,d);
		      })
		      .call(this.force.drag);

		  
		  this.text = this.text.data(nodes, function(d) { return d.id; }).style("fill", util.color);
		  this.text.enter().append("text")
		      .attr("class", "text")
		      .attr("x", function(d) { return d.x; })
		      .attr("y", function(d) { return d.y; })
		      .style("text-anchor","middle")
		      .text(function(d){
		    	  return d.name;
		      })
		      .call(this.force.drag);
		},
		tick:function() {
		  this.link.attr("x1", function(d) { return d.source.x; })
		      .attr("y1", function(d) { return d.source.y; })
		      .attr("x2", function(d) { return d.target.x; })
		      .attr("y2", function(d) { return d.target.y; });

		  this.node.attr("x", function(d) { return d.x - d.name.length * 10 /2; })
		      .attr("y", function(d) { return d.y - 15;});
		  
		  this.text.attr("x", function(d) { return d.x ; })
	      .attr("y", function(d) { return d.y + 4; });
		},
		color:function (d) {
			return d.children ? "#3D88D0" : "#fd8d3c";
		},
		click:function(jq,d) {
		  if (!d3.event.defaultPrevented) {
		    if (d.children) {
		      d._children = d.children;
		      d.children = null;
		    } else {
		      d.children = d._children;
		      d._children = null;
		    }
		    this.update.call(this,jq);
		  }
		},
		flatten:function(root) {
			var nodes = [], i = 0;
			function recurse(node) {
				if (node.children) node.children.forEach(recurse);
				if (!node.id) node.id = ++i;
				nodes.push(node);
			}
			recurse(root);
			return nodes;		
		}
	};
})();