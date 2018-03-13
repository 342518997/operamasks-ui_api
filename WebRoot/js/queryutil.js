
function findTable(){
	var tab=document.getElementById("sql").value;
	var tableName=tab.substring(tab.indexOf("from")+1);
	    $('#sql').omSuggestion({
	        dataSource:'findTable.action?tableName='+tableName,
	        minChars :1,
	       listMaxHeight:40
	       // success:function(data){
	    	 // alert(data);
	    //}
	    });
}

function find(){
	 var selectValue=null;
	 var sqlval=null;
	 if (document.selection){
		 selectValue=document.selection.createRange().text;//验证IE浏览器
       } else if (window.getSelection){
    	// selectValue=window.getSelection();//其他浏览器
    	   var obj = document.getElementById("sql"); 
    	   var selstart = obj.selectionStart; //文字浮标选择的开始位置 
    	   var selend = obj.selectionEnd; //文字浮标选择的结束位置 
    	   selectValue= obj.value.substring(selstart,selend);
     }
	if(selectValue==null||selectValue==""){
	var sqlval=document.getElementById("sql").value.toLocaleLowerCase();
	}else{
		sqlval=selectValue;
	}
	if(sqlval.indexOf("select")!=-1&&sqlval.indexOf("create")==-1){
	 sqlval = encodeURI(sqlval);
	 $.ajax({
			type:'POST',
			url:'findColumn',
			data:"sqlval="+sqlval,
			dataType:'text',
			contentType:'application/x-www-form-urlencoded; charset=utf-8',
			success: function(data){
		  var dataJson=eval('(' +data+ ')');
		  $("#str").text("");
		     $('#mytable').omGrid({     
		         height : 400,
		         limit:0,
		         colModel :dataJson,
		         //contentType:'application/x-www-form-urlencoded; charset=utf-8',
		         dataSource:'findData.action?sqlval='+sqlval 
		     });
		 },error:function(XMLResponse){
			    document.getElementById("tab").innerHTML="";
			    document.getElementById("tab").innerHTML='<table id="mytable"></table>';
		 		var str=XMLResponse.responseText;
		 		var str1=str.substring(str.indexOf("java"),str.lastIndexOf("</pre>"));
		 		$("#str").text("");// 清空数据                
		 		$("#str").append(str1);
		 	}
		});
	}else{
		$.ajax({
			type:'POST',
			url:'updateAndDelete',
			data:"sqlval="+sqlval,
			dataType:'text',
			limit:0,
			contentType:'application/x-www-form-urlencoded; charset=utf-8',
			success: function(data){
			var dataJson=eval('(' +data+ ')');
			$("#str").text("");
			   if(dataJson.update=='0002'){
				   alert("更新成功");
			   }else if(dataJson.del=='0001'){
				   alert("删除成功");
			   }else if(dataJson.insert=='0003'){
				   alert("插入数据成功");
			   }else if(dataJson.drop=='0004'){
				   alert("删除表成功");
			   }else if(dataJson.create=='0005'){
				   alert("创建表成功");
			   }else{
				   alert("系统出错");
			   }
		 },error:function(XMLResponse){
		 		var str=XMLResponse.responseText;
		 		var str1=str.substring(str.indexOf("java"),str.lastIndexOf("</pre>"));
		 		$("#str").text("");// 清空数据                
		 		$("#str").append(str1);
		 	}
		});
	}
}


