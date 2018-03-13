
//定义两个全局变量
var reg;
var errorInfo;

//输入的数字类型必须是int型
function validate_integer(value){
	reg=/^[-\+]?\d+$/;
	errorInfo=value+"不是int型";
	verifyByReg(value,reg,errorInfo);
}

//输入的数字类型必须是double型
function validate_double(value){
	reg=/^([+-]?)[0-9]+(.[0-9]{2})$/;
	errorInfo=value+"中出现了非双精度类型的字符";
	verifyByReg(value,reg,errorInfo);
}

//输入的必须是全是数字类型型
function validate_number(value){
	reg=/^\d+$/;
	errorInfo=value+"出现非数字类型的字符";
	verifyByReg(value,reg,errorInfo);
}

//验证输入n位的数值类型
function validate_number_nbit(value,n){
	reg=eval("/^\\d{"+n+"}$/");
	errorInfo=value+"中的位数不是"+n+"位";
	verifyByReg(value,reg,errorInfo);
}

//验证有两位小数的正实数
function validate_decimal_two(value){
	reg=/^[0-9]+(.[0-9]{2})$/;
	errorInfo=value+"不是有两位小数的正实数";
	verifyByReg(value,reg,errorInfo);
}

//验证非正整数,可以是0和负整数
function validate_number_notpositive (value){
	reg=/^-[1-9]\d*|0$/;
	errorInfo=value+"不是非正整数";
	verifyByReg(value,reg,errorInfo);
}

//验证非负整数,可以是0和正整数
function validate_number_notnegative(value){
	reg=/^[1-9]\d*|0$/;
	errorInfo=value+"不是非负整数";
	verifyByReg(value,reg,errorInfo);
}

//验证正整数
function validate_positive_notzero(value){
	reg=/^[1-9]\d*$/;
	errorInfo=value+"不是正整数";
	verifyByReg(value,reg,errorInfo);
}

//验证负整数
function validate_negative_notzero(value){
	reg=/^-[1-9]\d*$/;
	errorInfo=value+"不是负整数";
	verifyByReg(value,reg,errorInfo);
}

//验证非负浮点数（正浮点数 + 0）
function validate_float_notnegative(value){
	reg=/^\d+(\.\d+)$/;
	errorInfo=value+"不是非负浮点数";
	verifyByReg(value,reg,errorInfo);
}

//验证正浮点数
function validate_float_positive(value){
	reg=/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
	errorInfo=value+"不是正浮点数";
	verifyByReg(value,reg,errorInfo);
}

//非正浮点数（负浮点数 + 0）
function validate_float_notpositive(value){
	reg=/^((-\d+(\.\d+))|(0+(\.0+)))$/;
	errorInfo=value+"不是非正浮点数";
	verifyByReg(value,reg,errorInfo);
	
}

//验证负浮点数
function validate_float_negative(value){
	reg=/^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;
	errorInfo=value+"不是负浮点数";
	verifyByReg(value,reg,errorInfo);
	
}

//验证浮点数
function validate_float(value){
	reg=/^(-?\d+)(\.\d+)$/;
	errorInfo=value+"不是浮点数";
	verifyByReg(value,reg,errorInfo);
	
}

//校验文本是否为空
function checknull(field){	
	errorInfo="输入的文本不能为空";
    if(field==""||field==null||field=='undefined'){
      returnInfo(errorInfo);
    }
    
}

//验证由26个英文字母组成的字符串
function validate_string_letter(value){
	reg=/^[A-Za-z]+$/;
	errorInfo=value+"不是由26个英文字母组成";
	verifyByReg(value,reg,errorInfo);
}

//验证由26个英文字母的大写组成的字符串
function validate_string_bigletter(value){
	reg=/^[A-Z]+$/;
	errorInfo=value+"不是由26个英文字母的大写组成";
	verifyByReg(value,reg,errorInfo);
}

//验证由26个英文字母的小写组成的字符串
function validate_string_smallletter(value){
	reg=/^[a-z]+$/;
	errorInfo=value+"不是由26个英文字母的小写组成";
	verifyByReg(value,reg,errorInfo);
}

//验证由数字和26个英文字母组成的字符串
function validate_string_number(value){
	reg=/^[A-Za-z0-9]+$/;
	errorInfo=value+"不是由数字和26个英文字母组成的字符串";
	verifyByReg(value,reg,errorInfo);
}

//验证由数字、26个英文字母或者下划线组成的字符串
function validate_string_numberandunderline(value){
	reg=/^\w+$/;
	errorInfo=value+"不是由数字、26个英文字母或者下划线组成的字符串";
	verifyByReg(value,reg,errorInfo);
}


//验证邮箱
function validate_email(value,length){
	reg=/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
	errorInfo=value+"的格式不正确";
	verifyByReg(value,reg,errorInfo);
}


//验证输入的字符是否在规定的长度内
function validate_text_islimit(value,bit){
	errorInfo="'"+value+"'的长度大于系统指定的长度";
	var arr=value.split("");
	if(arr.length>bit){
		returnInfo(errorInfo);
	}
}

//验证指定的字符长度
function islength(value,n){
	errorInfo="'"+value+"'的长度不是"+n+"位的字符";
	reg=eval("/^.{"+n+"}$/");
	verifyByReg(value,reg,errorInfo);
}


//验证时如果选择默认调用此方法   金额类型
function validate_money_default(value){
	var reg=/^\d+(\.\d{4})?$/;
	var errorInfo="金额格式有误";
	verifyByReg(value,reg,errorInfo);
}

//验证输入的只能是中文
function validate_chinese(value){
	reg=/^[\u4E00-\u9FA5]+$/;
	errorInfo="'"+value+"'出现了非中文类型的数据";
	verifyByReg(value,reg,errorInfo);
}

//跟最大的值比较
function thanMax(number,max){
	errorInfo="'"+number+"'超过了系统设置的上限";
	if(number>max){
		returnInfo(errorInfo);
		return true;
	}else{
		return false;
	}	
}

//跟最小的值比较
function thinMin(number,min){
	errorInfo="'"+number+"'低于系统设置的下限";
	if(number<min){
		returnInfo(errorInfo);
		return true;		
	}else{
		return fasle;
	}
}


//邮政编码的验证,邮箱有6位，且开头不能为0
function validate_zipcode(value){
	reg=/^[1-9]\d{5}(?!\d)$/;
	errorInfo="'"+value+"':邮政编码不符合规范";
	verifyByReg(value,reg,errorInfo);
}

//身份证验证,分为了两种,15位和18位
function validate_IdCard(value){
	var size=value.split("").length;
	if(size==15){
		reg=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;//15位身份证验证
		errorInfo="15位身份证验证'"+value+"'不符合规范,请重新输入!";
		verifyByReg(value,reg,errorInfo);
	}else if(size==18){
		reg=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/;//18位身份证验证
		errorInfo="18位身份证验证'"+value+"'不符合规范,请重新输入!";
		verifyByReg(value,reg,errorInfo);
	}else{
		errorInfo="身份证的位数只能是15位或者18位,请核实输入!";	
		returnInfo(errorInfo);
	}
}

//验证手机电话,这里手机号码必须是11位,号码可以是13至19头两个字母开头的11号码
function validate_phone(value){
	var size=value.split("").length;
	if(size==11){
		reg=/^[1][3-8]+\d{9}$/;//手机号码	
		errorInfo="'"+value+"'不符合规范,请重新输入!";
		verifyByReg(value,reg,errorInfo);
	}else{
		errorInfo="输入的电话号码的位数错误,请核实输入!";		
		returnInfo(errorInfo);
	}
}

//验证固定电话
function validate_fix(value){
	var size=value.split("").length;
	reg=/^0\d{2,3}-\d{7,8}$/;
	errorInfo="'"+value+"'不符合固定电话的规范!";
	verifyByReg(value,reg,errorInfo);
}


//每个验证都需要调用此方法
function verifyByReg(value,reg,errorInfo){
	 if(value!=''&&reg!=''){
	      var regExp = new RegExp(reg);
	      if(!regExp.test(value)){
			 alert(errorInfo);
			 throw errorInfo;
	      }
	 }
}


//不进过正则表达式验证,只需要返回信息,适合内部调用此方法
function returnInfo(message){
	alert(message);
	throw message;
}
