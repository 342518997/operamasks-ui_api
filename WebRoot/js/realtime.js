//实时显示系统时间
function ShowTime(showTimeId){
	var timeString;
	var currentYear,currentMonth,currentDay,currentHours,currentMinutes,currentSeconds;
	var today;
	today=new Date();
	currentYear=today.getFullYear();
	currentMonth=today.getMonth()+1;
	currentDay=today.getDate();
	currentHours=today.getHours();
	currentMinutes=today.getMinutes();
	currentSeconds=today.getSeconds();
	
	if(currentMonth<10)
	{
	   currentMonth = "0" + currentMonth;
	}
	if(currentDay<10)
	{
	   currentDay = "0" + currentDay;
	}
	if(currentHours<10)
	{
	   currentHours = "0" + currentHours;
	}
	if(currentMinutes<10)
	{
	   currentMinutes = "0" + currentMinutes;
	}
	if(currentSeconds<10)
	{
	   currentSeconds = "0" + currentSeconds;
	}
	timeString = String(currentYear) + "-" + String(currentMonth) + "-" + String(currentDay) + "&nbsp;" + String(currentHours) + ":" + String(currentMinutes) + ":" + String(currentSeconds);
	document.getElementById(showTimeId).innerHTML = timeString;
	window.setTimeout("ShowTime('"+showTimeId+"')",1000);
}


//实时持续时间,obj当前显示日期的控件，date相对时间
function ShowProceedTime(showTimeId,dateString){
	var date = strTodate(dateString); 
	var initYear=date.getFullYear();
	var initMonth=date.getMonth()+1;
	var initDay=date.getDate();
	var initHours=date.getHours();
	var initMinutes=date.getMinutes();
	var initSeconds=date.getSeconds();

	var timeString;
	var proceedYear,proceedMonth,proceedDay,proceedHours,proceedMinutes,proceedSeconds;
	var today;
	today=new Date();
	proceedYear=today.getFullYear() - initYear;
	proceedMonth=today.getMonth() - initMonth ;
	proceedDay=today.getDate() - initDay;
	proceedHours=today.getHours()-initHours;
	proceedMinutes=today.getMinutes()-initMinutes;
	proceedSeconds=today.getSeconds()-initSeconds+1;
	
	if(proceedMonth<10)
	{
	   proceedMonth = "0" + proceedMonth;
	}
	if(proceedDay<10)
	{
	   proceedDay = "0" + proceedDay;
	}
	if(proceedHours<10)
	{
	   proceedHours = "0" + proceedHours;
	}
	if(proceedMinutes<10)
	{
	   proceedMinutes = "0" + proceedMinutes;
	}
	if(proceedSeconds<10)
	{
	   proceedSeconds = "0" + proceedSeconds;
	}
	var obj = document.getElementById(showTimeId);
	timeString = String(proceedHours) + ":" + String(proceedMinutes) + ":" + String(proceedSeconds);
	obj.innerHTML = timeString;
	if(typeof(obj.value)!='undefined'){
		obj.value = timeString;
	}
	var dateStr = dateTostr(date);
	window.setTimeout("ShowProceedTime('"+showTimeId+"','"+dateStr+"')",1000);
}


   function strTodate(strr) {
    strr1=strr.split(' ');
    datestr=strr1[0];
    timestr=strr1[1];
    strr2=datestr.split('-');
    strr3=timestr.split(':');
    date1=new Date(strr2[0],strr2[1]-1,strr2[2],strr3[0],strr3[1],strr3[2]);
    return date1;
    }

    function dateTostr(date){
      yy=date.getFullYear();
      mm=date.getMonth()+1;
      dd=date.getDate();
      hours=date.getHours();
      minutes=date.getMinutes();
      seconds=date.getSeconds();
      datestr=yy+'-'+mm+'-'+dd+' '+hours+':'+minutes+':'+seconds;
      return datestr
     }

