	//监控键盘事件
	 document.onkeydown = keyDown;
	 
	 function keyDown (event){
		var key = event.keyCode;
	     //F5 刷新
	     if(key=='116'){
	     	if(typeof(dataid)=='undefined'){
		     	location.reload(true);
		     }else{
		     	window.location.href=window.location.href+"&dataid="+dataid; 
		     }
	     	return false;
	     }
	}