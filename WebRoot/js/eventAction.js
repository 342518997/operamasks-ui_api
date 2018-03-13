// 保存
function action_save() {
	if (before_save()) {
		_save();
	}
	// after_save();
}
function before_save() {
	return true;
}
function after_save() {

}

// 编辑
function action_edit() {
	before_edit();
	_edit();
	after_edit();
}
function before_edit() {

}
function after_edit() {

}

// 提交
function action_submit() {
	if (before_submit()) {
		_submit();
	}
	after_submit();
}
function before_submit() {
	return true;
}
function after_submit() {

}
// 新增
function action_add() {
	before_add();
	_add();
	after_add();
}

function before_add() {

}
function after_add() {

}
// 删除
function action_delete() {
	before_delete();
	_delete();
	after_delete();
}
function before_delete() {

}
function after_delete() {

}
// 保存新增
function action_save_add() {
	if (before_save_add()) {
		_save_add();
	}
	after_save_add();
}

// 工作流审核。
function action_process_audit() {
	action_process_audit();
}

function before_save_add() {
	return true;
}
function after_save_add() {

}
// 查看
function action_view() {
	before_view();
	_view();
	after_view();
}
function before_view() {

}
function after_view() {

}

function action_save_close() {
	_save_close();
}

// 刷新
function action_refresh() {
	before_refresh();
	_refresh();
	after_refresh();
}

function before_refresh() {

}
function after_refresh() {

}

// 返回界面控件id与值的json字符串
function loadData() {
	return _loadData();
}

// 根据界面控件别名获取控件对象
function getControl(aliasname) {
	return _getControl(aliasname);
}

// 根据界面控件别名获取值
function getValue(aliasname) {
	return _getValue(aliasname);
}

// 根据界面控件别名设置控件值
function setValue(aliasname, value) {
	return _setValue(aliasname, value);
}

// 获取表头控件值
function head(aliasname) {
	return _getValue(aliasname);
}

// UI效果渲染
function loadUIDraw() {
	_loadUIDraw();
}

// 給控件添加事件 obj:当前控件 event：事件名 method：事件触发方法
function addEvent(obj, event, method) {
	_addEvent(obj, event, method);
}

function printView(templatePath) {
	_printView(templatePath);
}
function setUp(templatePath) {
	_setUp(templatePath);
}
function design(templatePath) {
	_design(templatePath);
}
function print(templatePath) {
	_print(templatePath);
}
//导出
function action_export() {
	if (before_export()) {
		_export();
	}
}
function before_export(){
	return true;
}