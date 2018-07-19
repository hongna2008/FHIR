<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<!-- <%request.setAttribute("ctx", request.getContextPath()); %> -->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="${ctx }/resources/lib/zTree/zTreeStyle.css" />
<link rel="stylesheet" href="${ctx }/resources/styles/data-add.css" />
</head>
<body>
<div class="putTemplate" style="min-height:500px;">
	<div id="zTree" class="ztree tempalte left">
	</div>
	<div class="tempalte sp"></div>
	<div class="tempalte right">
		<font style="position:absolute;top:0px;left:20px;">Preview:</font>
		<textarea id="preview"></textarea>			
		<div align="center">
			<a id="upload" class="button">Upload</a>
		</div>
	</div>
</div>
<Script>
var templateType = '${param.templateType}';
var templateName = '${param.templateName}';
</Script>
<script type='text/javascript' src="${ctx }/resources/lib/zTree/jquery.ztree.core.js"></script>
<script type='text/javascript' src="${ctx }/resources/page_js/data-add.js"></script>
</body>
</html>