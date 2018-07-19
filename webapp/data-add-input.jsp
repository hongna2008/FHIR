<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<!-- <%request.setAttribute("ctx", request.getContextPath()); %> -->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body>
<div id="json">
</div>
<div class="put-json-button">
	<a id="btn-save" class="btn">Save</a>
	<a id="btn-quit" class="btn clear">Cancel</a>
</div>
<script>
var type = '${param.type}';
</script>
<script type='text/javascript' src="${ctx }/resources/page_js/data-add-input.js"></script>
</body>
</html>