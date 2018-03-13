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

<title>My JSP 'MyJsp.jsp' starting page</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/operamasks-ui.min.js"></script>
<link rel="stylesheet" href="themes/default/om-all.css">
<!-- <link rel="stylesheet" type="text/css" href="common/css/base.css" />
<link rel="stylesheet" href="common/css/docs.css">
<script src="ui/om-core.js"></script>
<script src="ui/om-panel.js"></script>
<script src="ui/om-tabs.js"></script>
<script src="ui/om-messagetip.js"></script>
<script src="ui/om-combo.js"></script>
<script src="demos/common/js/data.js"></script>
<script src="demos/common/js/themesswitcher.js"></script>
<script src="demos/common/js/demo.js"></script> -->
<style>
div#theme-switcher {
	padding: 30px 0 0 18px;
	font-weight: bold;
	width: 180px;
}

div#theme-switcher span.om-combo {
	vertical-align: middle;
}
</style>
<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<script type="text/javascript">
	$(document)
			.ready(
					function() {
						$("#grid")
								.omGrid(
										{
											title : '表格',
											dataSource : 'griddata.do?method=fast',
											limit : 11,
											rowDetailsProvider : function(
													rowData, rowIndex) {
												return '第' + rowIndex + '行,id='
														+ rowData.id + ''
											},
											/* 	onRowClick : function(index,
														rowData, event) {
													$('#grid').omGrid('editRow',
															index);
												}, */
											colModel : [[{header:'第一行',colspan:3}],
													[{
														header : 'id',
														name : 'id',
														width : 100,
														align : 'center'

													},
													{
														header : '地区',
														name : 'city',
														width : 100,
														align : 'center',
														sort : 'clientSide',
														editor : {
															rules : [
																	'required',
																	true, '必填' ],
															name : 'city',
															editable : true
														},
													},
													{
														header : '地址',
														name : 'address',
														align : 'left',
														width : 'autoExpand',
														sort : 'serverSide',
														editor : {
															editable : true
														},
														renderer : function(
																colValue,
																rowData,
																rowIndex) {
															if (colValue == '电信') {
																return '<span style="color:red;"><b>'
																		+ colValue
																		+ '</b></span>'
															}
															return colValue;
														}
													}] ]

										});
					/* 	$("#city").live('focus', function() {
							$("#dialog").omDialog('open');
						}); */
						/* $("#grid").append("<tr><td>wuwuwu</td></tr>"); */

						$("#add").click(function() {
							$("#grid").omGrid('insertRow', 0, {
								id : 100
							});
						});
						$("#del").click(function() {
							var dels = $("#grid").omGrid('getSelections');
							if (dels.length <= 0) {
								alert("请选择记录");
								return;
							}
							$("#grid").omGrid('deleteRow', dels[0]);
						});
						$("#save").click(function() {
							var data = $("#grid").omGrid('getChanges');
							$("#grid").omGrid('saveChanges');
						});
						$("#cancle").click(function(){
							$("#grid").omGrid('cancelChanges');
						});

					});
	function clearSort() {
		$("#grid").omGrid('clearSort');
		$("#grid").omGrid('reload');

	}
</script>

</head>

<body>
	<p>This is jsp</p>
	<button id="add">新增</button>
	&nbsp;
	<button id="update">修改</button>
	&nbsp;
	<button id="del">删除</button>
	&nbsp;
	<button id="save">保存修改</button>
	&nbsp;
	<button id="cancle">取消修改</button>
	<table id="grid"></table>
	<br>
	<button onclick="clearSort();">清除排序</button>
	<div id="dialog" title="人员选择">
		<ul id="mytree"></ul>
	</div>
</body>
</html>
