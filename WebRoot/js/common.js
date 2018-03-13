	//创建xmlHttpRequest请求
	function createXMLHttpReqeust() {
			var request;
			if (window.XMLHttpRequest) { // Mozilla,...
			    request = new XMLHttpRequest();
			    }else if (window.ActiveXObject) { // IE
			       request = new ActiveXObject("Msxml2.XMLHTTP"); 
			 }
			return request;
		};
		
		//发送ajax请求async为true时为异步 ,false时为同步
		function sendAjaxReqAsync(reqMethod,url,postParam,parseMsg200,parseMsg404,parseMsg500,loading,async){
				//创建 XMLHttpRequest 对象
				var request = createXMLHttpReqeust();
							
				//通过XMLHttpRequest发送消息
				request.open(reqMethod,url,async);
				if("post"==reqMethod){
						request.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8 ");
				}
				
				//注册事件，通过XMLHttpRequest获取响应内容
				request.onreadystatechange = function(){
					if(request.readyState==4){
						if(request.status==200){
						
							if(parseMsg200)
								parseMsg200(request);
						}else if(request.status==404){
							if(parseMsg404)
								parseMsg404(request);
						}else if(request.status==500){
							if(parseMsg500)
								parseMsg500(request);
						}
					}else{
						if(loading)
							loading(request);				
					}
				};
				if("post"==reqMethod){
					request.send(postParam);
				}else{
					request.send(null);    //firefox
				}
		}		
		
	//发送ajax请求
	function sendAjaxReq(reqMethod,url,postParam,parseMsg200,parseMsg404,parseMsg500,loading){
			//创建 XMLHttpRequest 对象
			var request = createXMLHttpReqeust();
						
			//通过XMLHttpRequest发送消息
			request.open(reqMethod,url);
			if("post"==reqMethod){
					request.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8 ");
			}
			
			//注册事件，通过XMLHttpRequest获取响应内容
			request.onreadystatechange = function(){
				  
				if(request.readyState==4){
					if(request.status==200){
					
						if(parseMsg200)
							parseMsg200(request);
					}else if(request.status==404){
						if(parseMsg404)
							parseMsg404(request);
					}else if(request.status==500){
						if(parseMsg500)
							parseMsg500(request);
					}
				}else{
					if(loading)
						loading(request);				
				}
			};
			if("post"==reqMethod){
				request.send(postParam);
			}else{
				request.send(null);    //firefox
			}
		};
		
		//工具栏跟随滚动条移动 add by qingfeng_li 2014-3-14
       $(window).scroll(function(){
           var top = $('#toolbarContain').offset().top + $('#toolbarContain').height();
           var windowScroll = $(window).scrollTop();
           if( top <= windowScroll ){
               $("#toolbar").addClass("toolbar-float");
           }else{
               $("#toolbar").removeClass("toolbar-float");
           }
       });
       
	//新页签打开	
	function openNewTabByName(tabName,url,fname){
			if(url==null || url ==""){
				alert("无请求资源！");
				return ;
			}
			if(fname=='main'){
			  parent.$('#center-tab').omTabs('activate', 0);
			  return;
			}
			var tabId = parent.tabElement.omTabs('getAlter', 'tab_'+fname);
			if (tabId) {
				parent.$('#center-tab').omTabs('activate', tabId);
			}else{
			 var total = parent.$('#center-tab').omTabs('getLength');
			 var idx = 'tab_'+fname;
			 parent.$('#center-tab').omTabs('add', {
			    index : total,
			    title : tabName,
			    content : "<iframe id='"+idx+"' border=0 frameBorder='no' name='inner-frame' src='"+url+"' height='650' width='100%'></iframe>",
			    tabId : idx,
			    closable : true
			});
		}
	}
	
	//新页签打开	
	function openNewTab(tabName,url){
			if(url==null || url ==""){
				alert("无请求资源！");
				return ;
			}
			var total = parent.$('#center-tab').omTabs('getLength');
			var idx = Math.round(Math.random()*10000);
			parent.$('#center-tab').omTabs('add', {
			    index : total,
			    title : tabName,
			    content : "<iframe id='"+idx+"' border=0 frameBorder='no' name='inner-frame' src='"+url+"' height='650' width='100%'></iframe>",
			    tabId : idx,
			    closable : true
			});
	}

	//根据单据类型和参数打开新界面 add by qingfeng_li 2013-12-25
	function openNewUIByURL(type,flag,parms){//type指单据类型 flag指类型(基础资料/单据) parms指参数 
		var ui = "" ;
		if(flag==0){
			 ui = "/material.jsp" ;
		}else if(flag==1){
			 ui = "/billedit.jsp" ;
		}else{
			alert("打开界面出差！");
			return false;
		}
		if(parms==null){
			parms="";
		}
    	 sendAjaxReq("post","../getBillURL","billType="+type,
     	 function(request){
       	  	var newUrl = url.substring(0,url.lastIndexOf("/"));
       	  	var parematerURL = request.responseText;
       	  	var parematers = parematerURL.substring(parematerURL.indexOf("?"),url.length);
       	  	newUrl = newUrl +ui+ parematers+parms;
       	    var aliasname = getParameter(newUrl,'faliasname');
       	    var title = aliasname;
       	    newUrl += "&title="+escape(title);
       	    var total = parent.$('#center-tab').omTabs('getLength');
       	    var idx = Math.round(Math.random()*10000);//避免重复id引起页签打不开bug
       	  	parent.$('#center-tab').omTabs('add', {
			    index : total,
			    title : aliasname,
			    content : "<iframe id='"+idx+"' border=0 frameBorder='no' name='inner-frame' src='"+newUrl+"' height='650' width='100%'></iframe>",
			    tabId : idx,
			    closable : true
			});
	
      	  	},
      	  null,null,null);
   }
		//获取id下面所有tag为tagname的控件的id与值组成的json对象 形如：[{'field':'faliasname','value':'aaa'},{'field':'ftablename','value':'bbb'}]
		function getControlsJson(id,tagname){
		 	var controls=document.getElementById(id).getElementsByTagName(tagname);
           	var wherejson = '';
           	var value ='';
           	for(var i =0;i<controls.length;i++){
				var control = controls[i];
				if(tagname=='input'){
					value = document.getElementById(control.id).value;
				}
				if(typeof(control.id)!="undefined" && value!=''){
					wherejson+="{'field':'"+control.id+"','value':'"+value+"'},";
				}
           	}
			wherejson = wherejson.substring(0,wherejson.length-1)
			if(wherejson!=''){
				wherejson='['+wherejson+']';
			}
           return wherejson;
		}
		
		//添加单头控件 width,height 为0时表示默认大小，为-1时表示自由大小，否则表示指定大小 add by qingfeng_li 2013-8-7
		function addHeadControl(controlDivId,tagName,text,id,value,width,height){
			var w = 85;
			var h = 25;
			var stype = ";";//宽高同时为-1时
			if(width>w){
				w = width;
			}
			if(height>h){
				h = height;
			}
			if(width!=-1){
				stype = "width:"+w+"px;";
			}
			if(height!=-1){
				stype += "height:"+h+"px;";
			}
			if(value==null||value==""){
				value = "''";
			}
			if(tagName=='input'){
				$('#'+controlDivId).append(text+': <input  style='+stype+' id="'+id+'" name="'+id+'" value='+value+'  />').append('&nbsp;');
			}else if(tagName=='button'){
				$('#'+controlDivId).append('<button class="butDef"  style='+stype+'  id="'+id+'"  name="'+id+'"  value='+value+' >'+text+'</button>').append('&nbsp;');
			}
			
			return document.getElementById(id);
		}
		
		
		//添加分录控件 width,height 为0时表示默认大小，为-1时表示自由大小，否则表示指定大小  add by qingfeng_li 2013-8-7
		function addEntryControl(basicdata,tagName,text,id,value,width,height){
			var w = 70;
			var h = 20;
			var stype = "visibility:visible;";
			if(width>w){
				w = width;
			}
			if(height>h){
				h = height;
			}
			if(width!=-1){
				stype += "width:"+w+"px;";
			}
			if(height!=-1){
				stype += "height:"+h+"px;";
			}
			if(value==null){
				value = "''";
			}
			if(tagName=='input'){
				$('#'+basicdata+'div').append('&nbsp;').append(text+': <input  style='+stype+' id='+basicdata+id+' name='+basicdata+id+' value='+value+'  />');
			}else if(tagName=='button'){
				$('#'+basicdata+'div').append('&nbsp;').append('<button style='+stype+'  id='+basicdata+id+'  name='+basicdata+id+'  value='+value+' >'+text+'</button>');
			}
			return document.getElementById(basicdata+id);
		}
		
		//给分录basicdata的按钮div追加新按钮 buttonName 按钮名 buttonAliasName 按钮别名
		//内置触发事件 buttonName为add时新增，add为del时未删除，add为save时为保存，add为detail时为明细
		function addEntryButton(basicdata,buttonName,buttonAliasName){
			$('#'+basicdata+'div').append('<button style="width: 70px;height: 20px"  id="'+basicdata+buttonName+'"  >'+buttonAliasName+'</button>').append('&nbsp;&nbsp;');
		}
		
		//给分录basicdata的按钮div追加默认按钮 新增 删除 保存
		function addEntryDefaultButton(basicdata){
			$('#'+basicdata+'div').append('<button style="width: 70px;height: 20px"  id="'+basicdata+'add" value="新增" >新增</button>').append('&nbsp;&nbsp;');
			$('#'+basicdata+'div').append('<button style="width: 70px;height: 20px"  id="'+basicdata+'del" value="删除" >删除</button>').append('&nbsp;&nbsp;');
			//$('#'+basicdata+'div').append('<button style="width: 70px;height: 20px"  id="'+basicdata+'save" value="保存" >保存</button>').append('&nbsp;&nbsp;');
			$('#'+basicdata+'div').append('<button style="width: 70px;height: 20px"  id="'+basicdata+'detail" value="明细" >明细</button>').append('&nbsp;&nbsp;');
		}
		
		//移除控件 
		function removeNode(id){
			var obj = document.getElementById(id);  
			if(obj!=null){
	    		obj.parentNode.removeChild(obj);	
			}
		}
		
		  //分录basicdata的按钮处理
		function dealEntryButton(basicdata){
		 	addEntryDefaultButton(basicdata);
		}
		

		function getPrintJs( functionName , content){
			
			var printjs = "var LODOP;" +" function " + functionName +"(){" +
			"LODOP=getLodop(document.getElementById('LODOP'),document.getElementById('LODOP_EM'));"
			+content+ " LODOP.PREVIEW();}";
			return printjs;
		}
    function getSetUpJs( functionName , content){
			
			var setUpjs = "var LODOP;" +" function " + functionName +"(){" +
			"LODOP=getLodop(document.getElementById('LODOP'),document.getElementById('LODOP_EM'));"
			+content+ " LODOP.PRINT_SETUP();}";
			return setUpjs;
		}
    function getDesignJs( functionName , content){
		
		var designjs = "var LODOP;" +" function " + functionName +"(){" +
		"LODOP=getLodop(document.getElementById('LODOP'),document.getElementById('LODOP_EM'));"
		+content+ "LODOP.PRINT_DESIGN();}";
		return designjs;
	}

		
		//单头F7选择后填充数据 add by qingfeng_li 2013-8-2
		function fillDataByHeadF7(rowData){
		
		}
		
		//分录F7选择后填充数据 add by qingfeng_li 2013-8-2
		function fillDataByEntryF7(rowData){
			//(var key in rowData.queryFieldMap){
			//(key); //别名
			//(rowData.queryFieldMap[key]);//字段名
			//(rowData[rowData.queryFieldMap[key]]);//字段值
		}
		
		//设置分录控件值   add by qingfeng_li 2013-8-7
		function setEntryValue(basicdata,id,value){
			document.getElementById(basicdata+id).value = value;

		}

		
		
		//分录编辑完成后操作 add by qingfeng_li 2013-8-13
		function afterEntryEdit(rowIndex,rowData){
			

		}
		
		//分录保存前操作 add by qingfeng_li 2013-12-18
		function beforeEntrySave(basicdata){
			return true;
		}
		
		//分录保存后操作 add by qingfeng_li 2013-8-13
		function afterEntrySave(basicdata){
		

		}
		//表头保存后操作 add by qingfeng_li 2013-8-13
		function afterSave(basicdata,id){
		

		}
		
	//分录编辑前 add by qingfeng_li 2014-3-6
		function beforeEntryEdit(rowIndex , rowData){
			return true;
		}
		
		//行背景样式处理 add by qingfeng_li 2014-3-6
		function dealEntryRowClasses(rowIndex,rowData){
			if(rowIndex%2==0){
				return 'oddRow';
			}else{
				return 'evenRow';
			}
		}
			
		//分录双击操作  add by qingfeng_li 2014-3-10
		function onEntrydbClick(dataJson){
			return true;
		}
