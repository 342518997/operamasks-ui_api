 var focusInput; 
 var primaryAttributeCarrayField;//褰撳墠涓诲睘鎬�
       
   function fillBackAndCloseDialogUserid(rowData){
        $(focusInput).val(rowData.fUsername);
        $( "#dialog-modal").omDialog('close');
     };
     
    function fillBackAndCloseDialogClassification(rowData){
        $(focusInput).val(rowData.faliasname);
        $( "#dialog-modal").omDialog('close');
     };
     
     function fillBackAndCloseDialog(rowData){
	    for(var key in rowData){
			if(key== rowData.primaryAttributeName){
				$(focusInput).val(rowData[key]); //涓诲睘鎬�
			}
	    }
	    var allInputControls=$('input[type!=submit]');
	    var allSelectControls=$('select');
		var basicField ;
		var carrayField;
	   //甯﹀嚭杈呭姪灞炴� 
		if(rowData.flag==0){
			if(primaryAttributeCarrayField!=null && primaryAttributeCarrayField!=''){
				//F7鍒板鏂囨湰妗嗗�
				for(i=0;i <allInputControls.length;i++)  
				{  
			   		basicField = allInputControls[i].getAttribute("basicField");
			   		carrayField =  allInputControls[i].getAttribute("carryField");
			   		if(basicField!=null&& carrayField!=null && basicField==primaryAttributeCarrayField){
						for(var key in rowData.queryFieldMap){
			   			if(carrayField==key){
			   				$('#'+allInputControls[i].id).val(rowData[rowData.queryFieldMap[key]]);
			   			}
			   		}
			   		}
				} 
				//F7鎼哄甫涓嬫媺閫夋嫨妗嗗�
				for(i=0;i <allSelectControls.length;i++){  
			   		basicField = allSelectControls[i].getAttribute("basicField");
			   		carrayField =  allSelectControls[i].getAttribute("carryField");
			   		if(basicField!=null&& carrayField!=null && basicField==primaryAttributeCarrayField){
						for(var key in rowData.queryFieldMap){
			   			if(carrayField==key){
			   				$('#'+allSelectControls[i].id).val(rowData[rowData.queryFieldMap[key]]);
			   			}
			   		}
			   		}
				} 
			}
	}else if(rowData.flag==1){//鍒嗗綍甯﹀嚭杈呭姪灞炴� 
		//鍒嗗綍id f7閫夋嫨鏁版嵁鏄惁褰卞搷鍒嗗綍琛宨d锛岃В鍐冲垎褰曟槸鏂板杩樻槸璧嬪�宸叉湁璁板綍鐨刡ug add by qingfeng_li 2013-8-9
		if(typeof(rowData.actOnRowId)!='undefined' && (rowData.actOnRowId==true||rowData.actOnRowId=='true')){
			addRowDataString = rowData[rowData.queryFieldMap.FID];
		}
		var entryCarrayField = rowData.entryCarrayField;//鍒嗗綍F7鎼哄甫瀛楁
		var keyAndEntryId = JSON.parse(rowData.keyAndEntryId);//鏌ヨkey鍜屽垎褰旾D
		for(var key in keyAndEntryId){
	 			$('#'+keyAndEntryId[key]).val(rowData[key]);
			if(keyAndEntryId[key]== rowData.primaryAttributeName){
				$(focusInput).val(rowData[key]); //涓诲睘鎬�
			}
   		}
		// 鎶婇殣钘忓瓧娈电殑鍊煎瓨鍏ュ叏灞�殑queryObj涓� @author Action 2014-01-22
		for(var key in hiddenEntryField){
			queryObj[hiddenEntryField[key]]=rowData[key];
   		}
	}
	
	//F7閫夋嫨鍚庡～鍏呮暟鎹�add by qingfeng_li 2013-8-2
	fillDataByHeadF7(rowData);
	fillDataByEntryF7(rowData);

    $( "#dialog-modal").omDialog('close');
 };
 	
 	function openF7Dialog(obj){
 	 	if(obj==null){
       		return ;
       	}
       	var f7url='' ;
       	var userid = obj.getAttribute("name");
       	if(userid=="userid"){
       		f7url = 'select-userid.html';
       	}else if(userid=="classifiid"){
       		f7url = 'select-userclassification.html';
       	}else{
       		var query = obj.getAttribute("query");
       		var filter = obj.getAttribute("filter");
	       	filter = getFilter(filter);
	       	primaryAttributeCarrayField = obj.getAttribute("carryField");
	     	if(query!==null && query!=='' && primaryAttributeCarrayField !=null){
		      f7url = 'query.html?query='+query+"&filter="+filter+"&primaryAttributeCarrayField="+primaryAttributeCarrayField+"&flag=0";
	       }
       	}
       	if(f7url!=''){
	       	focusInput=obj; 
	        $( "#dialog-modal").omDialog('open');
	        //涓嬮潰鏄紦鍔犺浇iframe椤甸潰锛堟彁楂樻�鑳斤級锛屽鏋滀笉寮瑰嚭dialog鍒檌frame椤甸潰姘镐笉鍔犺浇
	        var frameLoc=window.frames[0].location;
	        frameLoc.href = f7url;
	        return false;
       	}
 	}
 	
 	
    function loadF7() {
        $("#dialog-modal").omDialog({
            autoOpen: false,
            width:535,
            height: 465,
            modal: true
        });
        $('input').keydown(function(e){
        	if(this==null){
        		return ;
        	}
        	//鍙拡瀵规煡璇7鎺т欢
        	if(this.getAttribute("query")!=null){
	            if(e.keyCode==118){ //濡傛灉鎸夌殑閿槸F7
	              openF7Dialog(this);
	            }else if(e.keyCode==8 || e.keyCode==35 ||e.keyCode==36 ||e.keyCode==45 ||e.keyCode==46 ||e.keyCode==37 ||e.keyCode==39){ //鏀惧紑鏌愪簺閿洏鎸夐敭
	            	// 8 鍥炴牸 35 home 36 end 45 insert 46 delete 37 宸︾澶�39 鍙崇澶�
	            }else {
	            	//闄愪簬鍒楄〃 add by qingfeng_li 2013-9-26
	            	if(this.getAttribute("onlySelect")=="true"){
		            	return false; //绂佺敤杈撳叆鍏跺畠鍐呭
	            	}else{
	            		return true;
	            	}
	             }            
        	}
        });
    };
    
    
    /**
    *鑾峰彇sql杩囨护鏉′欢閰嶇疆鐨剆ql璇彞銆傞厤缃牸寮忓舰濡傦細f_cnumber = [#瀹㈡埛浠ｇ爜#] ,濡傛灉澶氫釜鏉′欢锛屽姞and闅斿紑 add by qingfeng_li 2013-5-24 
    **/
    function getFilter(filter){
   	 	if(filter!=null){
          		var filter_parts = filter.split("and");
          		for(var j=0;j<filter_parts.length;j++){
          		var part = filter_parts[j];
           		var array = part.split("#");
           		if(array.length==3){
	           		for(var i=0;i<array.length;i++){
	           			var str = array[i];
	           			if(str.indexOf("[")==-1 && str.indexOf("]")==-1){
							var value = getValue(str);
							if(value==''){
								filter = filter.replace(part," 0=0 ");
							}else
								filter = filter.replace(str,"'"+value+"'");
	           			}
	           	
	           		}
           		}
           		while(filter.indexOf("[")!=-1 || filter.indexOf("]")!=-1 || filter.indexOf("#")!=-1  ){
	           		filter = filter.replace("#","");
	           		filter = filter.replace("[","");
	           		filter = filter.replace("]","");
	           		filter = filter.replace("where","");
           		}
          	}
          }else
          	filter = "";
       return filter;
    }