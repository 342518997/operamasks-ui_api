<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>My JSP 'MyJsp_omTree.jsp' starting page</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/operamasks-ui.min.js"></script>
<link rel="stylesheet" href="themes/default/om-all.css">
<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<script type="text/javascript">
	var data =  [{id:'n1',text:'品牌',expanded:true},
	             {id:'n11',pid:'n1',text:'三星'},
	             {id:'n12',pid:'n1',text:'苹果'}];
	$(function() {
		$("#myul").omTree({
			dataSource: data,
			simpleDataModel : true,
			showCheckbox:true,
			onClick:function(node,event){
				alert(node.text+" 点击事件");
			},
			onCheck:function(node,event){
				alert(node.text+" 选中事件");
			}
		});

	});
</script>

</head>

<body>
	This is my JSP page.
	<br>
	<div id="mydiv">
		<ul id="myul"></ul>
	</div>
	<br>


</body>
</html>
