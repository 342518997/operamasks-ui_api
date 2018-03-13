//自定义加载用户定义的搜索字段
function loadsearch(searchfield,identify,typename)
{
	$('#quickSearch').append("<table><tr>");
	var j = 0;
	for(var i=0;i<searchfield.length;i++)
	{     
		 if(j!=0 && j%2==0){
	         $('#quickSearch').append(" </tr><tr>");
	     }
	     if(searchfield[i].type==2 ||searchfield[i].type==13 ){//日期特殊处理
	     	j= j+2;
	     	var  formula ="yyyy-MM-dd";
	     	if(searchfield[i].type==13 ){
		     	formula ="yyyy-MM-dd hh:mm:ss";
	     	}
	     	$('#quickSearch').append("<td width='80'>"+searchfield[i].searchaliname+":</td>");
			$('#quickSearch').append("<td ><input type='text' style='width:140px;height:20px;background:url(../../images/date.png) no-repeat 120px 0px;' id='"+searchfield[i].searchname+"_from'"
				+"  onKeypress='return false;'   onFocus='SelectDate(this,\""+formula+"\");' />&nbsp;</td>");
			$('#quickSearch').append("<td width='80'>到&nbsp;&nbsp;</td>");
			$('#quickSearch').append("<td ><input type='text' style='width:140px;height:20px;background:url(../../images/date.png) no-repeat 120px 0px;' id='"+searchfield[i].searchname+"_to'"
				+ "  onKeypress='return false;'   onFocus='SelectDate(this,\""+formula+"\");' />&nbsp;</td>");
	     }else{
	     	j = j+1;
			$('#quickSearch').append("<td width='80'>"+searchfield[i].searchaliname+":</td>");
			$('#quickSearch').append("<td ><input type='text' style='width:140px;height:20px;' id='"+searchfield[i].searchname+"' />&nbsp;</td>");
	     }
	
	}
	$('#quickSearch').append("</tr></table><br>");

	//添加按钮
	$('#quickSearch').append('  <div style="margin-top: 200px;margin-left: 200px;" >');
	$('#quickSearch').append('  <button  style="width: 80px;height: 25px" id="searchfieldbutton">确定</button>&nbsp; &nbsp;');
	$('#quickSearch').append('  <button  style="width: 80px;height: 25px" onclick="submit(false)">取消</button>');
	$('#quickSearch').append('  </div>');
	
	//按钮事件
	$('#searchfieldbutton').click(function(){
			firstLoad = false;
			var data='';
			//将用户输入的数据拼装起来
			for(var i=0;i<searchfield.length;i++)
			{
				if(searchfield[i].type==2 ||searchfield[i].type==13 ){//日期特殊处理
					var from_date = $('#'+searchfield[i].searchname+"_from").val();
					var to_date = $('#'+searchfield[i].searchname+"_to").val();
					if(from_date!='' || to_date!=''){
						data+="{'type':'"+searchfield[i].type+"','field':'"+searchfield[i].searchname+"'";	
						if(from_date!=''){
							data+=", 'from_date' : '" + from_date + "'";
						}
						if(to_date!=''){
							data+=", 'to_date' : '" + to_date + "'";
						}
						data+="},";
					}
				}else if($('#'+searchfield[i].searchname).val()!=''){
					data+="{'type':'"+searchfield[i].type+"','field':'"+searchfield[i].searchname+"','value':'"+$('#'+searchfield[i].searchname).val()+"'},";
				}
			}
			data=data.substring(0,data.length-1);
			if(data!='')
			{
				data='['+data+']';
			}
			var url ;
			//重新设置数据源
			if(identify=='bill'){
				url =  "action_list?type="+typename+"&conditions="+encodeURI(encodeURI(data))+"&flag=1";
			}else if(identify=='material'){
				url =  "action_list?type="+typename+"&conditions="+encodeURI(encodeURI(data))+"&flag=0";
			}
			parent.fillBackByQuerySearch(url);
        });
}