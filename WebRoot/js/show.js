var url = location.href;
var materialName = request('materialName');
var billType = request('billType');
var oprater = request('oprater');
var materialid = request('id');
var dataid = request('dataid');
var taskid = request('taskid');
var billType = request('billType');
var row = request('row');
var column = request('column');
var billID = request('billID');
var preview = request('preview');// 单据预览
var currentTaskId=request('currentTaskId')
var fexecutionId = request('fexecutionId');

function show(flag) {// 0：基础资料 1：单据
	if (dataid == '' && billID != '') {
		dataid = billID;
	}
	if (oprater == null || oprater == "") {
		oprater = 0;
	}
	if (oprater == 2 && document.getElementById("edit") != null) {
		document.getElementById("edit").disabled = false;
	}
	if (oprater == 0 || oprater == 1) {
		if (document.getElementById("save") != null) {
			document.getElementById("save").disabled = false;
		}
		if (document.getElementById("save_close") != null) {
			document.getElementById("save_close").disabled = false;
		}
		if (document.getElementById("save_add") != null) {
			document.getElementById("save_add").disabled = false;
		}
	}
	if ((oprater == 1 || oprater == 2) && document.getElementById("delete")) {
		document.getElementById("delete").disabled = false;
	}
	//工作流则审批按钮显示。
//	if(typeof(taskid)!='undefined'&&taskid!=''&&taskid!=null){
//		$('#toolbar').append("<button  id='process_audit' class='butDef'  style='width: 85px;height: 25px' onclick='action_process_audit()'>审批</button>");
//		$('#toolbar').append("<button  id='process_view' class='butDef' style='width: 100px;height: 25px' onclick='viewProcess()'>查看流程图</button>")
//		}
	// 单据预览 add by qingfeng_li 2013-7-30
	if (preview != '' && preview == 1) {
		var buttons = document.getElementsByTagName("button");
		for (var i = 0; i < buttons.length; i++) {
			var button = buttons[i];
			button.disabled = true;
		}
	}
	if (flag == 0) {
		showmaterialForm(oprater);
	} else {
		showBillForm(oprater);
	}
	// 添加按钮导航样式
	$('#toolbar').omButtonbar({});
}

function loadEntry(flag) {
	if (flag == 0) {
		dynamicLoadJs(materialName);
	} else
		dynamicLoadJs(billType);
}

function showmaterialForm(oprater) {
	var type = request('materialName');
	sendAjaxReq("post", "../action_show", "opra=" + oprater + "&id=" + dataid
					+ "&type=" + type + "&flag=0&taskid=" + taskid+"&currentTaskId="+currentTaskId, function(request) {
				// if("has-no-authority"==request.responseText){
				if ("connection-is-closed" == request.responseText) {
					alert("连接已关闭，请检查网络！");
					parent.$('#center-tab').omTabs('close');
				} else if ("has-no-authority" == request.responseText) {
					alert("你没有该操作权限！");
					parent.$('#center-tab').omTabs('close');
				} else if ("error" == request.responseText) {
					alert("加载数据出错！");
				} else {
					var json = eval('(' + request.responseText + ')');
					dataid = json.dataid;
					$("#_id").val(dataid);
					$("#_type").val(type);
					// 添加js脚本
					var oHead = document.getElementsByTagName('HEAD').item(0);
					var oScript = document.createElement("script");
					oScript.type = "text/javascript";
					oScript.text = json.actionJS;
					oHead.appendChild(oScript);
					document.getElementById('toolbar').innerHTML =json.buttonInfo;
					document.getElementById('billForm').innerHTML = json.tableHTML;
					loadF7();
					loadUploadFile();
					loadUIDraw();// 加载界面渲染样式 add by qingfeng_li
					loadEntry(0);
				}
			}, null, null, null);
}

function showBillForm(oprater) {
	sendAjaxReq("post", "../action_show", "type=" + billType + "&id=" + dataid
					+ "&opra=" + oprater + "&flag=1&taskid=" + taskid+"&currentTaskId="+currentTaskId,
			function(request) {
				if ("connection-is-closed" == request.responseText) {
					alert("连接已关闭，请检查网络！");
					parent.$('#center-tab').omTabs('close');
				} else if ("has-no-authority" == request.responseText) {
					alert("你没有该操作权限！");
					parent.$('#center-tab').omTabs('close');
				} else if ("error" == request.responseText) {
					alert("加载数据出错！");
				} else {
					var json = eval('(' + request.responseText + ')');
					dataid = json.dataid;
					billID = json.dataid;
					$("#_id").val(dataid);
					$("#_type").val(billType);
					// 添加js脚本
					var oHead = document.getElementsByTagName('HEAD').item(0);
					var oScript = document.createElement("script");
					oScript.type = "text/javascript";
					oScript.text = json.actionJS;
					oHead.appendChild(oScript);
					document.getElementById('toolbar').innerHTML =json.buttonInfo;
					document.getElementById('billForm').innerHTML = json.tableHTML;
					loadF7();
					loadUIDraw();// 加载界面渲染样式 add by qingfeng_li
					loadEntry(1);
				}
			}, null, null, null);
}