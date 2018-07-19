<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<!-- <%request.setAttribute("ctx", request.getContextPath()); %> -->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="${ctx }/resources/styles/index.css" />
<link rel="stylesheet" href="${ctx }/resources/styles/shade.css" />
</head>
<body>
<!-- menu -->
<div id="menu" class="menu">
	<div class="push" id="push" title="show"><a></a></div>
		<A class="header" dir="schema" parse-handle="schema">FHIR Resources<font>0</font>
		</A>
	<div class="body">
	</div>
		<A class="header" dir="profile" parse-handle="profile">FHIR Profiles<font>0</font>
		</A>
	<div class="body">
	</div>
		<A class="header" dir="extension" parse-handle="profile">Extension Definitions<font>0</font>
		</A>
	<div class="body">
	</div>
</div>
<!-- context -->
<div id="businessType" class="tabs content-wrapper left">
	<div class="tabs-header">
		<div class="tab active" path="TreeView">TreeView</div>
		<div class="tab" path="Diagram">Diagram</div>
	</div>
	<div class="tabs-panel">
		<div id="TreeView">
			
		</div>
		<div id="Diagram" class="Diagram" style="display:none">
			
		</div>
	</div>
</div>
<!-- right -->
<div id="tree-right" class="content-wrapper right">
	<div class="tabs">
		<div class="tabs-header">
			<div class="tab active">Summary</div>
			<div class="tab ">Json</div>
		</div>
		<div class="tabs-panel">
			<div class="Summary">
				<div class="list" type="profile">
					<div><label>Name</label><label data-value="Name"></label></div>
					<div><label>Path</label><label data-value="Path"></label></div>
					<div><label>Multiplicity</label><label data-value="Multiplicity"></label></div>
					<div><label>Short</label><label data-value="Short"></label></div>
					<div><label>Definition</label><label data-value="Definition"></label></div>
					<div><label>Requirements</label><label data-value="Requirements"></label></div>
					<div><label>Datatype/s</label><label data-value="Datatype"></label></div>
					<div><label>Binding</label><label data-value="Binding"></label></div>
				</div>
				<div class="list" type="schema" style="display:none">
					<div><label>Name</label><label data-value="Name"></label></div>
					<div><label>Type</label><label data-value="Type"></label></div>
					<div><label>Definition</label><label data-value="Definition"></label></div>
					<div><label>Enums</label><label data-value="Enums"></label></div>
				</div>
			</div>
			<div class="Json" style="display:none">
				<textarea></textarea>
			</div>
		</div>
	</div>
</div>
<!-- bottom search -->
<div id="treeview-search" class="treeview-search">
	<div class="push" title="show"><a></a></div>
	<input type="text" /><A class="search">Search</A>
</div>
<script type='text/javascript'>
var ctx = '${ctx}';
</script>
<script type='text/javascript' src="${ctx }/resources/lib/jquery.min.js"></script>
<script type='text/javascript' src="${ctx }/resources/lib/d3.v3.js"></script>
<script type='text/javascript' src="${ctx }/resources/lib/shade.js"></script>
<script type='text/javascript' src="${ctx }/resources/lib/loading.js"></script>
<script type='text/javascript' src="${ctx }/resources/lib/jquery.treediagram.js"></script>
<script type='text/javascript' src="${ctx }/resources/page_js/parse.js"></script>
<script type='text/javascript' src="${ctx }/resources/page_js/index.js"></script>
</body>
</html>