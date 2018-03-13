addButton();
loadvalite();
function addButton(){
	//$('#toolbar').append('&nbsp;<input type="button" id="audit" value="bug处理" onclick ="audit()" />');
}

function audit(){
	
}

function loadvalite(){	
 $("#billForm").validate({
                rules : {
                    C_f_number : "required",
                    C_f_title : "required",
                    C_f_submitter : "required",
                    C_f_expectedFinisher : "required",
                    C_f_expectedFinishedTime : {
                    	required:true,
                    	isDate : true
                    },
                    C_f_desc : "required"
                },
                messages : {
                    C_f_number : {
                        required : "请输入编码"
                    },
                    C_f_title : {
                        required : "请输入主题"
                    },
                    C_f_submitter : {
                        required : "请输入提交人"
                    },
                    C_f_expectedFinisher : {
                        required : "请输入期望处理人"
                    },
                    C_f_expectedFinishedTime : {
                        required : "请输入期望处理日期",
                        isDate : "请输入正确的日期格式"
                    },
                    C_f_desc : {
                        required : "请输入bug描述"
                    }
                }
            });

}

function _validator(){
	var C_f_number = document.getElementsByName("C_f_number")[0].value;
	if(C_f_number==''){
		alert("请输入编码");
		return false;
	}
	var C_f_title = document.getElementsByName("C_f_title")[0].value;
	if(C_f_title==''){
		alert("请输入主题");
		return false;
	}
	
	var C_f_submitter = document.getElementsByName("C_f_submitter")[0].value;
	if(C_f_submitter==''){
		alert("请输入提交人");
		return false;
	}
	var C_f_expectedFinisher = document.getElementsByName("C_f_expectedFinisher")[0].value;
	if(C_f_expectedFinisher==''){
		alert("请输入期望处理人");
		return false;
	}
	var C_f_expectedFinishedTime = document.getElementsByName("C_f_expectedFinishedTime")[0].value;
	if(C_f_expectedFinishedTime==''){
		alert("请输入期望处理日期");
		return false;
	}
	var C_f_desc = document.getElementsByName("C_f_desc")[0].value;
	if(C_f_desc==''){
		alert("请输入bug描述");
		return false;
	}
	
	return true;
	
	
}