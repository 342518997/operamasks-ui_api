var flag;
var firstLoad = true;
var close = false; // 关闭当前页签

// 保存
function _save() {
	_before_save();
	_do_save();
	// _after_save(); //放在_do_save方法里面 同步执行 解决保存数据后不能重载当页数据bug modified by
	// qingfeng_li 2013-7-15
}

// 給控件添加事件 obj:当前控件 event：事件名 method：事件触发方法；添加的事件的顺序即执行顺序
function _addEvent(obj, event, method) {
	// 去掉事件名前的'on'字符串
	if (event != null && event.indexOf('on') != -1) {
		event = event.substring(2, event.length);
	}
	if (window.addEventListener) {
		// Mozilla, Netscape, Firefox;用addEventListener 添加带on的事件，不用加on
		obj.addEventListener(event, method, false);
	} else {
		// IE 的事件代码 在原先事件上添加 add 方法
		obj.attachEvent('on' + event, method);
	}
}

// 获取控件对象
function _getControl(aliasname) {
	var tables = document.getElementsByTagName("table");
	for (var ids = 0; ids < tables.length; ids++) {
		var headTable = tables[ids];
		// var headTable = document.getElementById("headTable");
		var headTableRows = headTable.rows;
		var headRowsLength = headTableRows.length;
		for (var i = 0; i < headRowsLength; i++) {
			var headTableColumns = headTable.rows[i].cells;
			for (var j = 0; j < headTableColumns.length; j++) {
				var cell = headTableRows[i].cells[j];
				var id = cell.childNodes[0].id;
				if (id != '' && typeof(id) != "undefined") {
					var obj = document.getElementById(id);
					if (obj != null
							&& obj.getAttribute("aliasname") == aliasname) {
						return obj;
					}
				}
			}
		}
	}
}

// 根据界面控件别名设置控件值
function _setValue(aliasname, value) {
	var tables = document.getElementsByTagName("table");
	for (var ids = 0; ids < tables.length; ids++) {
		var headTable = tables[ids];
		// var headTable = document.getElementById("headTable");
		var headTableRows = headTable.rows;
		var headRowsLength = headTableRows.length;
		for (var i = 0; i < headRowsLength; i++) {
			var headTableColumns = headTable.rows[i].cells;
			for (var j = 0; j < headTableColumns.length; j++) {
				var cell = headTableRows[i].cells[j];
				var id = cell.childNodes[0].id;
				if (id != '' && typeof(id) != "undefined") {
					var obj = document.getElementById(id);
					if (obj != null
							&& obj.getAttribute("aliasname") == aliasname) {
						obj.value = value;
						return;
					}
				}
			}
		}
	}
}
// 根据界面控件别名获取值
function _getValue(aliasname) {
	var tables = document.getElementsByTagName("table");
	for (var ids = 0; ids < tables.length; ids++) {
		var headTable = tables[ids];
		// var headTable = document.getElementById("headTable");
		var headTableRows = headTable.rows;
		var headRowsLength = headTableRows.length;
		for (var i = 0; i < headRowsLength; i++) {
			var headTableColumns = headTable.rows[i].cells;
			for (var j = 0; j < headTableColumns.length; j++) {
				var cell = headTableRows[i].cells[j];
				var id = cell.childNodes[0].id;
				if (typeof(id) != "undefined" && id != '') {
					var obj = document.getElementById(id);
					if (obj != null
							&& obj.getAttribute("aliasname") == aliasname) {
						return obj.value;
					}
				}
			}
		}
	}
}

// 返回界面控件id与值的json字符串
function _loadData() {
	var buffer = new StringBuffer();
	buffer.append("{");
	var tables = document.getElementsByTagName("table");
	for (var ids = 0; ids < tables.length; ids++) {
		var headTable = tables[ids];
		// var headTable = document.getElementById("headTable");
		var headTableRows = headTable.rows;
		var headRowsLength = headTableRows.length;
		for (var i = 0; i < headRowsLength; i++) {
			var headTableColumns = headTable.rows[i].cells;
			for (var j = 0; j < headTableColumns.length; j++) {
				var cell = headTableRows[i].cells[j];
				var id = cell.childNodes[0].id;
				if (typeof(id) != "undefined" && id != '') {// 去掉id为空的控件取值
					var value = '';
					buffer.append("'");
					buffer.append(id);
					buffer.append("'");
					buffer.append(":");
					buffer.append("'");
					// 如果是单选或者多选，判断里面有没有checktype和choiceradio属性
					if ($('#' + id).attr('checktype')
							|| $('#' + id).attr('choiceradio')) {
						var div = document.getElementById(id);
						var oLis = div.getElementsByTagName('input');
						for (var p = 0; p < oLis.length; p++) {
							if (oLis[p].checked) {
								value += oLis[p].value + ",";
							}
						}
						if (value != '') {
							value = value.substring(0, value.length - 1);
						}
						buffer.append(value);
					} else if (id != ''
							&& document.getElementById(id).value != ''
							&& document.getElementById(id).value != undefined) {
						value = document.getElementById(id).value;
						buffer.append(value);
					}
					buffer.append("'");
					if (!(i == headRowsLength - 1
							&& j == headTableColumns.length - 1 && ids == tables.length
							- 1)) {
						buffer.append(",");
					}
				}
			}
		}

	}
	buffer.append("}");
	return buffer;
}

// 获取分录数据
function _getEntryData() {
	var entryJson = [];// 分录json数组
	var entryDiv = $('#attach > div > div > div  ');
	var tables = document.getElementsByTagName("table");
	var entryIds = [];// 分录id数组
	for (var i = 0; i < entryDiv.length; i++) {
		var tbId = entryDiv[i].id.replace("div", "");
		entryIds[i] = tbId;
	}

	for (var i = 0; i < entryIds.length; i++) {
		var entryTableId = entryIds[i];
		var entryData = $('#' + entryTableId).omGrid('getChanges');
		var entryDataStr = JSON.stringify(entryData);
		var json = {
			"entryName" : entryTableId,
			"entryData" : entryDataStr
		}
		entryJson.push(json);
	}
	return JSON.stringify(entryJson);
}

// 处理分录保存后数据改变标志
function dealEntryButtonBySaveChange() {
	var entryDiv = $('#attach > div > div > div  ');
	var tables = document.getElementsByTagName("table");
	var entryIds = [];// 分录id数组
	for (var i = 0; i < entryDiv.length; i++) {
		var tbId = entryDiv[i].id.replace("div", "");
		entryIds[i] = tbId;
	}

	for (var i = 0; i < entryIds.length; i++) {
		var entryTableId = entryIds[i];
		var entryData = $('#' + entryTableId).omGrid('saveChanges');
	}
}

function _loadAuditData() {
	var buffer = new StringBuffer();
	buffer.append("{");
	var tables = document.getElementById("jbpm_table");
	var shyj = document.getElementById("jbpm_spyj").value;
	var radio_argee = document.getElementsByName("jbpm_agree");
	var taskid = document.getElementById("jbpm_taskid").value;
	var isAgree = null;
	for (var i = 0; i < radio_argee.length; i++) {
		if (radio_argee[i].checked) {
			isAgree = radio_argee[i].value;
		}
	}
	
	if (isAgree == '同意') {
		buffer.append("'");
		buffer.append("spjg");
		buffer.append("':'");
		buffer.append("ARGEE");
		buffer.append("',");
	} else {
		buffer.append("'");
		buffer.append("spjg");
		buffer.append("':'");
		buffer.append("DISAGREE");
		buffer.append("',");

	}
	buffer.append("'");
	buffer.append("spyj");
	buffer.append("':'");
	buffer.append(shyj);
	buffer.append("',");
	buffer.append("'");
	buffer.append("taskid");
	buffer.append("':'");
	buffer.append(taskid);
	buffer.append("'");
	buffer.append("}");
	return buffer;
}

// 工作流审批
function action_process_audit() {
	firstLoad = false;
	var param = '';
	var buffer = _loadAuditData();
	var id = $("#_id").val();
	var type = $("#_type").val();
	param = "id=" + id + "&dataJson=" + buffer.toString() + "&opra=" + oprater
			+ "&type=" + type;
    $.ajax({
        type:'POST',
        url:'jbpm_audit',
        data:param,
        dataType:'text',
        contentType:'application/x-www-form-urlencoded; charset=utf-8',
        success:function(data){
             alert("审核成功");
             parent.$('#center-tab').omTabs('close');
       },
        error:function(XMLResponse){
                alert("系统出错");
        }
   });
    

}

//查看流程图
function viewProcess(){
	checkOutProcess(currentTaskId,fexecutionId);
}
function _do_save() {
	firstLoad = false;
	var materialName = request('materialName');
	var billType = request('billType');
	var taskid = request('taskid');
	var param = '';
	var actionURL = '';
	var pictureparam = '';
	var buffer = _loadData();
	var entryJson = _getEntryData();
	var id = $("#_id").val();
	var type = $("#_type").val();
	// 如果图片信息里面有值，说明上传了图片
	if (picture.length > 0) {
		pictureparam = arraytojson(picture);
	}
	if (materialName == '' && billType != '') {
		flag = 1;
		// type = billType;
	} else if (materialName != '' && billType == '') {
		flag = 0;
		// type = materialName;
	}
	param = "id=" + id + "&dataJson=" + buffer.toString() + "&opra=" + oprater
			+ "&type=" + type + "&flag=" + flag + "&entryJson=" + entryJson+"&p_taskId="+taskid;
	actionURL = "../action_save";
	sendAjaxReq("post", actionURL, param, function(request) {
				if ("has-no-authority" == request.responseText) {
					alert("您没有列表查看权限，请与管理员联系！");
					return false;
				}
				var json = eval("(" + request.responseText + ")");
				var key = json.key;
				var value = json.value;
				if (key == "exsit") {
					alert(value);
					var fieldName = json.fieldName;
					var newValue = json.newValue;
					setValue(fieldName, newValue);// 设置新值
				} else if (key == "error") {
					alert("保存数据失败");
				} else if (key == "pictureerror") {
					alert('图片保存失败');
				} else if (key == "ok") {
					alert("保存成功");
					document.getElementById("save").disabled=true;
					dataid = value;
					billID = value;
					afterSave(type, value);// 保存后操作
					if (close) {
						parent.$('#center-tab').omTabs('close');// 关闭当前页签
						close = false;
					} else
						_after_save();
				}
			}, null, null, null);
}

function _before_save() {
	_verify();
}
function _after_save() {
	dealEntryButtonBySaveChange();// 处理分录保存后数据改变标志
	if (document.getElementById("save") != null) {
		document.getElementById("save").disabled = true;
	}
	if (document.getElementById("edit") != null) {
		document.getElementById("edit").disabled = false;
	}
	if (document.getElementById("delete") != null) {
		document.getElementById("delete").disabled = false;
	}
	oprater = 2;
	show(flag);
}

// 编辑
function _edit() {
	_before_edit();
	_do_edit();
	_after_edit();
}

function _do_edit() {

}

function _before_edit() {
	firstLoad = false;
	if (document.getElementById("save") != null) {
		document.getElementById("save").disabled = false;
	}
	if (document.getElementById("edit") != null) {
		document.getElementById("edit").disabled = true;
	}
	if (document.getElementById("delete") != null) {
		document.getElementById("delete").disabled = false;
	}
	oprater = 1;

	var materialName = request('materialName');
	var billType = request('billType');
	if (materialName == '' && billType != '') {
		flag = 1;
	} else if (materialName != '' && billType == '') {
		flag = 0;
	}

	show(flag);

}

function _after_edit() {

}

// 提交
function _submit() {
	_before_submit();
	_do_submit();
	_after_submit();

}
function _do_submit() {

}
function _before_submit() {

}
function _after_submit() {

}
// 新增
function _add() {
	_before_add();
	_do_add();
	_after_add();
}

function _do_add() {
	var mainJsp;
	var materialName = request('materialName');
	var billType = request('billType');
	var title = request('title');// 新增时标题
	if (materialName == '' && billType != '') {
		flag = 1;
		param = "billType=" + billType;
		actionURL = "../getBillURL";
		mainJsp = "/billedit.jsp";
	} else if (materialName != '' && billType == '') {
		flag = 0;
		param = "materialName=" + materialName;
		actionURL = "../getMaterialURL.action";
		mainJsp = "/material.jsp";
	}

	sendAjaxReq("post", actionURL, param, function(request) {
				var newUrl = url.substring(0, url.lastIndexOf("/"));
				var parematerURL = request.responseText;
				var parematers = parematerURL.substring(parematerURL
								.indexOf("?"), url.length);
				newUrl = newUrl + mainJsp + parematers + "&oprater=0"
						+ "&title=" + title;
				window.location = newUrl;
			}, null, null, null);
}

function _before_add() {

}
function _after_add() {

}

// 删除
function _delete() {
	if (checkBox(" 确定要删除吗？")) {
		if (_before_delete()) {
			_do_delete();
		}
		// _after_delete(); //不能删除bug
	}
}

function _do_delete() {
	firstLoad = false;
	var id = $("#_id").val();
	var type = $("#_type").val();

	if (materialName == '' && billType != '') {
		flag = 1;
	} else if (materialName != '' && billType == '') {
		flag = 0;
	}
	param = "type=" + type + "&id=" + id+"&flag="+flag;
	actionURL = "../action_delete";
	sendAjaxReq("post", actionURL, param, function(request) {
				if (request.responseText == "has-no-authority") {
					alert("您没有删除权限，请与管理员联系！");
				} else if (request.responseText == "ok") {
					alert("删除成功");
					_after_delete();
				} else if (request.responseText == "exsit_link_bill") {
					alert("当前单据已关联其他单据，不允许删除");
				} else {
					alert("删除失败");
				}
			}, null, null, null);
}

function _before_delete() {
	return true;
}
function _after_delete(){
	if(document.getElementById("save")!=null){
		document.getElementById("save").disabled = false;
	}
	if(document.getElementById("save_close")!=null){
		document.getElementById("save_close").disabled = false;
	}
	if(document.getElementById("edit")!=null){
	   	document.getElementById("edit").disabled = true;
	}
	if(document.getElementById("delete")!=null){
	   	document.getElementById("delete").disabled = true;
	}
   	oprater = 3;
   	dataid =  null;
	show(flag);
}
// 保存新增
function _save_add() {
	_before_save_add();
	_do_save_add();
	_after_save_add();
}

function _do_save_add() {
	_save();
	_add();
}

function _before_save_add() {

}
function _after_save_add() {

}

// 保存关闭
function _save_close() {
	_before_save_close();
	_do_save_close();
	_after_save_close();
}

function _do_save_close() {
	close = true;
	_save();
}

function _before_save_close() {

}
function _after_save_close() {

}

// 查看
function _view() {
	_before_view();
	_do_view();
	_after_view();
}

function _do_view() {
}

function _before_view() {

}
function _after_view() {

}

// 根据单据类型获取单据类型名称
function _getType(flag) {
	var type;
	if (flag != 0 && flag != 1) {
		flag = _getFlag();
	}
	if (flag == 1) {
		type = request('billType');
	} else if (flag == 0) {
		type = request('materialName');
	}
	return type;
}

// 获取表单类型标示：1为单据，0为基础资料
function _getFlag() {
	var materialName = request('materialName');
	var billType = request('billType');
	var flag;
	if (materialName == '' && billType != '') {
		flag = 1;
	} else if (materialName != '' && billType == '') {
		flag = 0;
	}
	return flag;
}

// 刷新
function _refresh() {
	window.location.href = window.location.href + "&dataid=" + dataid;
	return false;
}

// 校验
function _verify() {
	_verifyNecessary();
	verify();
	after_verify();
}

// 验证必录
function _verifyNecessary() {
	var tables = document.getElementsByTagName("table");
	for (var ids = 0; ids < tables.length; ids++) {
		var headTable = tables[ids];
		var headTableRows = headTable.rows;
		var headRowsLength = headTableRows.length;
		for (var i = 0; i < headRowsLength; i++) {
			var headTableColumns = headTable.rows[i].cells;
			for (var j = 0; j < headTableColumns.length; j++) {
				var cell = headTableRows[i].cells[j];
				var id = cell.childNodes[0].id;
				if (id != '' && typeof(id) != "undefined") {
					var obj = document.getElementById(id);
					if (obj != null && typeof(obj.value) != "undefined") {
						value = obj.value.replace(/(^\s*)|(\s*$)/g, ""); // 去空格;
					}
					if (obj.getAttribute("need") == 'true' && value == '') {
						alert(obj.getAttribute("aliasname") + " 不能为空！");
						throw obj.getAttribute("aliasname") + " 不能为空！";
					}
				}
			}
		}
	}
}

function verify() {
}

function after_verify() {
}

// 获取下游单据号
function _getDownBill(type) {
	var value = "";
	if (type != '' && type != null && typeof(type) != 'undefined') {
		var id = $("#_id").val();
		var value = '';
		var a = sendAjaxReqAsync("post", "../getDownBill", "fid=" + id
						+ "&ftype=" + type, function(request) {
					if ("connection-is-closed" == request.responseText) {
						alert("连接已关闭，请检查网络！");
					} else if (request.responseText == "has-no-authority") {
						alert("您没有此操作权限，请与管理员联系！");
					} else if (request.responseText == "error") {
						alert("操作失败!");
					} else if (request.responseText != "") {
						value = request.responseText;
					} else {
					}
				}, null, null, null, false);
	}
	return value;
}

// 套打设计
function _printView(templatePath) {
	$.ajax({
				type : 'POST',
				url : 'fileCopy',
				data : templatePath,
				dataType : 'text',
				contentType : 'application/x-www-form-urlencoded; charset=gbk',
				success : function(request) {
					if (request != '') {
						// alert(location.href);
						var printjs = getPrintJs("printView1", request);
						var oHead = document.getElementsByTagName('HEAD')
								.item(0);

						var oScript = document.createElement("script");
						oScript.type = "text/javascript";
						oScript.text = printjs;
						oHead.appendChild(oScript);
						// alert(oHead.innerHTML);
					} else {
						alert('取模板数据错误');
					}
				}
			});
}
function _setUp(templatePath) {
	$.ajax({
				type : 'POST',
				url : 'fileCopy',
				data : templatePath,
				dataType : 'text',
				contentType : 'application/x-www-form-urlencoded; charset=gbk',
				success : function(request) {
					if (request != '') {
						// alert(location.href);
						var setUpjs = getSetUpJs("setUp1", request);
						var oHead = document.getElementsByTagName('HEAD')
								.item(0);

						var oScript = document.createElement("script");
						oScript.type = "text/javascript";
						oScript.text = setUpjs;
						oHead.appendChild(oScript);
						// alert(oHead.innerHTML);
					} else {
						alert('取模板数据错误');
					}
				}
			});
}
function _design(templatePath) {
	$.ajax({
				type : 'POST',
				url : 'fileCopy',
				data : templatePath,
				dataType : 'text',
				contentType : 'application/x-www-form-urlencoded; charset=gbk',
				success : function(request) {
					if (request != '') {
						// alert(location.href);
						var designjs = getDesignJs("design1", request);
						var oHead = document.getElementsByTagName('HEAD')
								.item(0);

						var oScript = document.createElement("script");
						oScript.type = "text/javascript";
						oScript.text = designjs;
						oHead.appendChild(oScript);
						// alert(oHead.innerHTML);
					} else {
						alert('取模板数据错误');
					}
				}
			});
}
function _print(templatePath) {
}

// 按照正则表达式验证 add by qingfeng_li 2013-8-9
function verifyByReg(value, reg, errorInfo) {
	if (value != '' && reg != '') {
		var regExp = new RegExp(reg);
		if (!regExp.test(value)) {
			alert(errorInfo);
			throw errorInfo;
		}
	}
}

// UI效果渲染 add by qingfeng_li 2013-11-25
function _loadUIDraw() {
	// 分组渲染
	var divs = $('#billForm > div');
	for (var i = 0; i < divs.length; i++) {
		var id = divs[i].id;
		var title = divs[i].getAttribute("title");
		var visible = divs[i].getAttribute("visible");
		var open = false;
		if (visible == 0) {
			open = true;
		}
		$("#" + id).omPanel({
					title : title,
					collapsed : open,
					collapsible : true
				});
	}
}

function _export(){
	
	
}
