var addRowDataString = ''; //分录记录id
var hiddenEntryField={};//分录隐藏字段对象
var queryObj={};
/*******添加表**********/
function addtable(index,data)
{
	var li='';
	var hrefdiv='';
	for(var i=0;i<data.length;i++)
	{
		li+='<li><a href="#'+data[i].basicdata+'div"'+'tabid="'+data[i].basicdata+'div">'+data[i].message+'</a></li>';
		hrefdiv+='<div id="'+data[i].basicdata+'div"></div>';
		  $('#attach').omTabs('add', {
                    title : data[i].message,
                    content : 'New Content '
                });
	}
	//添加ul标签
	$('#attach').append('<ul>'+li+'</ul>');
	//添加层
	$('#attach').append(hrefdiv);
	//做成选项卡.这个和attach添加ul和层的顺序不能乱，和operamasks框架有关。框架只可以加载，attach里面已经有元素的东西。
	$('#attach').omTabs({
                		 tabWidth : 'auto'
            			});
    //对层里面添加表
	for(var i=0;i<data.length;i++)
	{
		dealEntryButton(data[i].basicdata);
		$('#'+data[i].basicdata+'div').append('<table id="'+data[i].basicdata+'" ></table>');
	}
	loadgrid(0,data);
}
function  loadgrid(index,data)
	{
			var firstLoad=true; 
			var json ;
			var condition = "[]";
			var f7queryJson = "[]"; 
			var editable = ""; //分录可编辑列 add by qingfeng_li 2013-9-6
			var uneditable = ""; //分录不可编辑列 add by qingfeng_li 2013-8-14
			var link="";//连接条件
			var entryentitytype = 1;
			if(typeof(data[index].f7query)!='undefined' && data[index].f7query!=''){
		         f7queryJson = JSON.stringify(data[index].f7query);
			}
			if(typeof(data[index].condition)!='undefined' &&  data[index].condition!=''){
				condition =  JSON.stringify(data[index].condition);
			}
			if(typeof(data[index].uneditable)!='undefined' ){
				uneditable =  data[index].uneditable;
			}
			if(typeof(data[index].editable)!='undefined' ){
				editable =  data[index].editable;
			}
			if(typeof(data[index].link)!='undefined' ){
				link =  data[index].linkfield;
			}
			if(typeof(data[index].entryentitytype)!='undefined' ){
				entryentitytype =  data[index].entryentitytype;
			}
			var ind=index;
			 $.ajax({
  						type: 'POST',
  						url:"basicEntryColModel" ,
 						 data:"entrybasicdataname="+data[index].basicdata+"&f7query="+f7queryJson+"&uneditable="+uneditable+"&editable="+editable,
  						dataType:'text',
  						contentType:'application/x-www-form-urlencoded; charset=utf-8',
  						 success: function(request){
	  						var requestJson=eval('(' +request+ ')');
	  						json = requestJson;
	  						//动态追加分录js
	    					var oHead = document.getElementsByTagName('HEAD').item(0);
		  			    	var oScript= document.createElement("script");
		  					oScript.type = "text/javascript";
					 		oScript.text = requestJson.entryJs;
				            oHead.appendChild(oScript);

  							$("#"+data[index].basicdata).omGrid({
  									// limit:10,
               						// title : '表格',
               						width:requestJson.width,
               						height : requestJson.height,
         							dataSource : "basicEntryJson?dataid="+dataid+"&basicdataid="+data[ind].id+"&basictable="+data[ind].tablename+"&condition="+condition+"&link="+link+"&entryentitytype="+entryentitytype,
         							colModel : eval('('+requestJson.col+')'),
         						    onBeforeEdit : function(rowIndex , rowData){
  								        //每次编辑前情空queryObj;
  								        queryObj={};
         								if(data[ind].f7query!='' && firstLoad ){
         								//绑定F7事件 add by qingfeng_li 2013-8-2
         									bindF7Event(data[ind],requestJson);
         								}
         								//编辑前控制行 add by qingfeng_li 2014-3-6
         								return beforeEntryEdit(rowIndex , rowData);
			                        },
         							onAfterEdit : function(rowIndex , rowData){
										//给新增的分录赋ID									
										if(rowData.FID=='' && addRowDataString!=''){
											rowData.FID = addRowDataString;
										}
										//获取携带隐藏字段 @author Action 2014-01-22
										for(var key in queryObj){
											rowData[key]=queryObj[key];
										}
										afterEntryEdit(rowIndex,rowData);//分录编辑完成后操作 add by qingfeng_li 2013-8-13
         							},
         							//分录双击操作  add by qingfeng_li 2014-3-10
         							 onRowDblClick:function(rowIndex,rowData,event){
									 	return onEntrydbClick(data[ind],rowIndex);
		   							  },
         							  //行背景颜色 add by qingfeng_li 2014-3-6
					 				 rowClasses : function(rowIndex,rowData){
					                     return dealEntryRowClasses(rowIndex,rowData);
					                 },
         							onSuccess:function(){
         								if(index!=data.length-1)
         								{
         									index++;
         									loadgrid(index,data);
         								}
     								},
     								 onRefresh:function(nowPage,pageRecords,event){
     								 	dealEntryButtonAvailable(data[ind].basicdata);
     								 }
            									});
   							 }
						});
            $('#'+data[ind].basicdata+'detail').click(function(){
          			openDetail(data[ind]);
            	});
            $('#'+data[ind].basicdata+'add').click(function(){
           		if(!isEntryButtonAvailable()){//按钮是否可用
           			return ;
           		}
            	var type = data[ind].entryentitytype;
            	if(typeof(type)=='undefined' ||type==1){
	            	$('#'+data[ind].basicdata).omGrid('insertRow',0,{id:100,FID:''});
	            	//从dataSourceJson获取f7添加图标字段信息
	            	var dataSourceJson=data[ind];
	            	for(var i in dataSourceJson.f7query){
		 				if(!!dataSourceJson.f7query[i].fieldName){
		 					var fieldId = dataSourceJson.f7query[i].fieldName;
		 					var obj=document.getElementById(fieldId);
		 					obj.style="background:url(../../images/F7.png) no-repeat 133px -2px;";
		 					$("#"+fieldId).keydown(function(){
		 						return false;
		 					});
		 				}
					}
	            	init(data,ind);
	            	if(data[ind].f7query!='' && firstLoad){
	            		firstLoad =  false;
	            		//绑定F7事件 add by qingfeng_li 2013-8-2
						bindF7Event(data[ind],json);
	            		}
            	}else{//单据分录新增时打开
            		var newUrl = url.substring(0,url.lastIndexOf("/"));
            		var selectedRecords = $('#'+data[ind].basicdata).omGrid('getSelections',true);
					 newUrl +="/billedit.jsp?billType="+data[ind].basicdata+"&oprater=1";
	      	   		//在父窗口打开 add by qingfeng_li 2013-7-30
		       	    var aliasname = data[ind].message;
		       	    var idx = Math.round(Math.random()*10000);//避免重复引起页签打不开bug add by qingfeng_li 
		       	    var total = parent.$('#center-tab').omTabs('getLength');
		       	  	parent.$('#center-tab').omTabs('add', {
					    index : total,
					    title : aliasname,
					    content : "<iframe id='"+idx+"' border=0 frameBorder='no' name='inner-frame' src='"+newUrl+"' height='650' width='100%'></iframe>",
					    tabId : idx,
					    closable : true
					});
            	}
            	});
            	
            $('#'+data[ind].basicdata+'del').click(function(){
            	if(!isEntryButtonAvailable()){//按钮是否可用
           			return ;
           		}
            	var dels = $('#'+data[ind].basicdata).omGrid('getSelections');
            	if(dels.length <= 0 ){
            		alert('请选择删除的记录！');
            		return;
            	}
            	$('#'+data[ind].basicdata).omGrid('deleteRow',dels[0]);
            });
            $('#'+data[ind].basicdata+'save').click(function(){
            	if(typeof(dataid)!="undefined" && dataid!=''){
            	if(beforeEntrySave(data[ind].basicdata)){//分录保存前
	            	var savedata = $('#'+data[ind].basicdata).omGrid('getChanges');
	            	var formDataStr = JSON.stringify(savedata);
	            	/*****此处传递data到后台并处理*******/
	            	$.ajax({
						type: 'POST',
						url:"savebasicentrydata" ,
					 	data:"json="+formDataStr+"&dataid="+dataid+"&basictable="+data[ind].tablename,
						dataType:'text',
						contentType:'application/x-www-form-urlencoded; charset=utf-8',
						success: function(request){
	  					if(request=='ok'){
				 			alert('保存成功');
				 			afterEntrySave(data[ind].basicdata);
	  					}else{
	  						alert('保存失败！');
	  					}
	   					 }
						});
	            	/*****保存成功之后执行如下操作********/
	            	 $('#'+data[ind].basicdata).omGrid('saveChanges');
            	}
            	}
            	else
            	{
            		alert('请先保存表头！');
            	}
            });
}
	
	//按钮是否可用
	function isEntryButtonAvailable(){
		if(oprater==0 || oprater==1){
			return true;
		}
		alert("非编辑状态不允许此操作");
		return false;
	}
	//处理按钮是否可用
	function dealEntryButtonAvailable(entryid){
		//if(oprater==0 || oprater==1){
		//}
	}
	
	//打开详细信息
	function openDetail(dataJson){
		var newUrl = url.substring(0,url.lastIndexOf("/"));
        var oprater = 2;
        var selectedRecords = $('#'+dataJson.basicdata).omGrid('getSelections',true);
        if(selectedRecords[0].FID==''||typeof(selectedRecords[0].FID)=='undefined'){
        	return ;
        }
		 newUrl +="/material.jsp?materialName="+dataJson.basicdata+"&dataid="+selectedRecords[0].FID+"&oprater="+oprater;
    	   		//在父窗口打开 add by qingfeng_li 2013-7-30
      	    var aliasname = dataJson.message;
      	    var id = selectedRecords[0].FID;
      	    var total = parent.$('#center-tab').omTabs('getLength');
      	  	parent.$('#center-tab').omTabs('add', {
		    index : total,
		    title : aliasname,
		    content : "<iframe id='"+id+"' border=0 frameBorder='no' name='inner-frame' src='"+newUrl+"' height='650' width='100%'></iframe>",
		    tabId : id,
		    closable : true
		});
	}
	
	//绑定F7事件 dataSourceJson为分录数据源json ,entryColDataJson为basicEntryColModel返回的json  add by qingfeng_li 2013-8-2
	function bindF7Event(dataSourceJson,entryColDataJson){
		for(var primaryAttributeCarrayField in entryColDataJson.f7AttributeMap){
			$('#'+primaryAttributeCarrayField).keydown(function(e){
		 		focusInput=this;
		 		var f7query ;
		 		var keyAndEntryId ;
		 		var actOnRowId ;//是否带出分录id
           		for(var i in dataSourceJson.f7query){
	 				if(dataSourceJson.f7query[i].fieldName==this.id){
	 					f7query = dataSourceJson.f7query[i].queryName;
	 					keyAndEntryId =JSON.stringify(dataSourceJson.f7query[i].keyAndEntryId);
	 					hiddenEntryField=dataSourceJson.f7query[i].hiddenEntryField;
	 					if(typeof(dataSourceJson.f7query[i].actOnRowId)=='undefined'){
		 					actOnRowId = false;
	 					}else{
		 					actOnRowId = dataSourceJson.f7query[i].actOnRowId;
	 					}
	 				}
				}
		 		var entryCarrayField = entryColDataJson.f7AttributeMap[this.id]; 
		 		queryf7(e,'query.html?query='+f7query+"&primaryAttributeCarrayField="+this.id+"&flag=1&entryCarrayField="+entryCarrayField+"&actOnRowId="+actOnRowId+"&keyAndEntryId="+keyAndEntryId);
			});
		}
	}

	//初始化分录数据
	function init(data,ind){
		if(typeof(data[ind].init)!='undefined'){
			for(var i =0;i<data[ind].init.length;i++){
				$('#'+data[ind].init[i].name).val(parseJS(data[ind].init[i].value));
				$('#'+data[ind].init[i].name).attr("disabled",data[ind].init[i].disabled);
			}
		}
	}
		
		//结构形如head(#客户代码#)
		function parseJS(string){
			if(string!=null && string.indexOf("head")!=-1){
				var parameters = string.split("#");
				for(var i = 0;i<parameters.length;i++){
					//暂时只处理含有一个参数的返回值
					if(parameters[i].indexOf("(")==-1 && parameters[i].indexOf(")")==-1){
						return this.head(parameters[i]);
					}
				}
			}else
				return string;
		}

    	function queryf7(e,url)
      	{
      	  if(e.keyCode==118){ //如果按的键是F7
                $( "#dialog-modal").omDialog('open');
                //下面是缓加载iframe页面（提高性能），如果不弹出dialog则iframe页面永不加载
                var frameLoc=window.frames[0].location;
                frameLoc.href=url;
                return false;
            }else{
                return false; //禁用输入其它内容
            }
          }