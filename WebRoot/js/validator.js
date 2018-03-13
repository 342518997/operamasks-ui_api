	//校验经纬度
	function checkLalo(object){	
		var reg=/\d*\*\d*/;
		var value=object.value;
		if(reg.exec(value)==null)
		{
			alert('请输入正确的格式"经度"*"纬度",经纬度必须是数字');
			object.value="";
		}
	}
