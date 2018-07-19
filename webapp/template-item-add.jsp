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
		<label>Item Name<font style="color:Red">*</font></label><br/><input id="itemName" type="text" />
	</div>
	<div>
		<label>Default Value</label><br/><input id="itemValue" type="text" />
	</div>
	<div>
		<a id="btn-save" class="btn">Save</a>
		<a id="btn-quit" class="btn clear">Cancel</a>
	</div>
</nav>
<Script>
	$(function(){
		$("#btn-save").click(function(){
			if(!$("#itemName").val()){
				alert("Please Input Item Name");
				return;
			}
			$(this).parents(".ifm-window:first").trigger("callback",{
				name: $("#itemName").val(),
				defaultValue: $("#itemValue").val(),
				newItem:true,
				isHidden:false
			});
		});
		$("#btn-quit").click(function(){
			$(this).parents(".ifm-window:first").remove();
		});
	});
</Script>
</body>
</html>