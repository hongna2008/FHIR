<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<!-- <%request.setAttribute("ctx", request.getContextPath()); %> -->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="${ctx }/resources/lib/zTree/zTreeStyle.css" />
<link rel="stylesheet" href="${ctx }/resources/styles/template-add.css" />
</head>
<body>
<div class="putTemplate">
	<div id="zTree" class="ztree tempalte">
	</div>
	<div id="zTreeExt" class="ztree tempalte">
	</div>
</div>
<div align="center" style="padding:20px 0;">
	<a id="btn-save-template" class="btn">Save Template</a>
</div>
<Script>
var templateType = '${param.templateType}';
</Script>
<script type='text/javascript' src="${ctx }/resources/lib/zTree/jquery.ztree.all.min.js"></script>
<script type='text/javascript' src="${ctx }/resources/lib/zTree/jquery.ztree.exhide.js"></script>
<script type='text/javascript' src="${ctx }/resources/page_js/template-add.js"></script>
</body>
</html>