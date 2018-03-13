/****计算传过来的一个日期和当前日期相差的年****/
function counage(strBirthday)
{
	var returnAge;
	var strBirthdayArr=strBirthday.split("-");
	var birthYear = strBirthdayArr[0];
	var birthMonth = strBirthdayArr[1];
	var birthDay = strBirthdayArr[2];

	d = new Date();
	var nowYear = d.getYear()+1900;//由于默认的时间是当前减去1900.
	var nowMonth = d.getMonth() + 1;
	var nowDay = d.getDate();
	if(nowYear == birthYear)
		{			
			returnAge = 0;//同年 则为0岁
		}
	else
		{
			var ageDiff = nowYear-birthYear ; //年之差
	if(ageDiff > 0)
		{
			if(nowMonth == birthMonth)
			{
				var dayDiff = nowDay-birthDay;//日之差
				if(dayDiff < 0)
				{
					returnAge = ageDiff-1;
				}
				else
				{
					returnAge = ageDiff ;
				}
		}
		else
		{
			var monthDiff = nowMonth-birthMonth;//月之差
			if(monthDiff < 0)
			{
				returnAge = ageDiff-1;
			}
			else
			{
				returnAge = ageDiff ;
			}
		}
	}
	else
	{
		returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
	}
	}
return returnAge;//返回周岁年龄
}
/*******自定义显示日期的格式*********/
Date.prototype.format = function(format)  
{  
    var o =  
    {  
        "M+" : this.getMonth()+1, //month  
        "d+" : this.getDate(),    //day  
        "h+" : this.getHours(),   //hour  
        "m+" : this.getMinutes(), //minute  
        "s+" : this.getSeconds(), //second  
        "q+" : Math.floor((this.getMonth()+3)/3),  //quarter  
        "S" : this.getMilliseconds() //millisecond  
    }  
    if(/(y+)/.test(format))  
    format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4 - RegExp.$1.length));  
    for(var k in o)  
    if(new RegExp("("+ k +")").test(format))  
    format = format.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));  
    return format;  
}  
