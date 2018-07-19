<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<!-- <%request.setAttribute("ctx", request.getContextPath());%> -->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="${ctx }/resources/styles/index.css" />
<link rel="stylesheet" href="${ctx }/resources/styles/shade.css" />
<link rel="stylesheet" href="${ctx }/resources/lib/datatables/material.min.css" />
<link rel="stylesheet" href="${ctx }/resources/lib/datatables/dataTables.material.min.css" />
<style>
.Operation{
	text-transform: inherit;
}
.template-list{
	position:absolute;
	z-index:99999;
	background:rgb(242, 242, 242);
	display:none;
	margin:0;
}
.template-list li {
	padding:7px 0;
	width:150px;
	cursor:pointer;
	text-decoration: underline;
}
.template-list:active{
	background:rgb(222, 222, 222);
}
</style>
</head>
<body>
<button id="addTemp" class="mdl-button mdl-button--raised">Add Tempalte</button>
<ul class="template-list mdl-button--raised">
<!-- 	<li>schema</li> -->
	<li>profile</li>
	<li>extension</li>
</ul>
<table id="example" class="mdl-data-table" style="width: 100%">
	<thead>
		<tr>
			<th>Type</th>
			<th>Template Name</th>
			<th>Operation</th>
		</tr>
	</thead>
</table>
<script type='text/javascript' src="${ctx }/resources/lib/jquery.min.js"></script>
<script type='text/javascript' src="${ctx }/resources/lib/shade.js"></script>
<script type='text/javascript' src="${ctx }/resources/lib/loading.js"></script>
<script type='text/javascript' src="${ctx }/resources/lib/datatables/jquery.dataTables.js"></script>
<script type='text/javascript' src="${ctx }/resources/lib/datatables/dataTables.material.min.js"></script>
<script type='text/javascript'>
var ctx = '${ctx}';

function initRequestJson(path,fn,obj,dataType){
	var result;
	$.ajax({
		dataType:dataType || "json",
		async:fn?true:false,
		type:obj?"post":"get",
		data:obj||{},
		url: path,
		success:function(data){
			if(fn){
				fn(data);
			}else{
				result = data;
			}
		}
	});
	return result;
}

$(function(){
	$("#addTemp").add($(".template-list")).mouseover(function(){
		$(".template-list").css({
			top:$("#addTemp").offset().top + $("#addTemp").height() + 1,
			left: $("#addTemp").offset().left,
			display:'block'
		});
	});
	
	$(".template-list").mouseout(function(){
		$(this).hide();
	});
	
	$(".template-list li").click(function(){
		$(".template-list").hide();
		var templateType = $(this).text();
		openWin({
			title: templateType == "profile" ? "FHIR Resource Profiling Template" : "FHIR Extension Template",
			url:ctx+'/template-add.jsp?templateType='+templateType
		},function(){
			$('#example').DataTable().ajax.reload();
		});
	});
	
    $('#example').DataTable({
        ajax: ctx+"/getTempalte",
        searching:false,
        lengthChange:false,
        orderData:["Type"],
        columns:[{
			"data":"Type"
		},{
			"data": "TemplateName"
		},{
			"data": "Operation",
			"mRender":function(arg1,displayType,rowData,settings){
				return "<button class=\"Operation addData mdl-button mdl-button--raised\"  templateName=\""+rowData.TemplateName+"\" templateType=\""+rowData.Type+"\">Add Data</button>";
			}
		}],
		fnCreatedRow: function(tr,rowData,rowIndex) {
			$(".addData",tr).click(function(){
				var templateType = $(this).attr("templateType");
				var templateName = $(this).attr("templateName");
				openWin({
					title: templateType == "profile" ? "FHIR Resource Profiling Data" : "FHIR Extension Data",
					url:ctx+'/data-add.jsp?templateType='+templateType+'&templateName='+templateName
				});
			});
		}
    });
});
</script>
</body>
</html>