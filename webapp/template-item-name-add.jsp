<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<!-- <%request.setAttribute("ctx", request.getContextPath()); %> -->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
<nav class="template-item-add" >
	<div>
		<label>Template Name<font style="color:Red">*</font></label><br/><input id="templateName" type="text" />
	</div>
	<div>
		<a id="btn-save-template-name" class="btn">Save</a>
	</div>
</nav>
<Script>
	$(function(){
		$("#btn-save-template-name").click(function(){
			if(!$("#templateName").val()){
				alert("Please Input Template Name");
				return;
			}
			$(this).parents(".ifm-window:first").trigger("callback",{
				name: $("#templateName").val()
			});
		});
	});
</Script>
</body>
</html>