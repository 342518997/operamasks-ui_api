		var picture=new Array();
		var contorlid='';//点击上传图片的时候控件的id；
	
		function startUpload(id)
		{
			contorlid=id;
			$('#'+contorlid).omFileUpload('upload');
		}
		
		function loadUploadFile()
		{
			$("input[type='file']").omFileUpload({
			//omfileUpload
	    	action : "../../omfileUpload.do?basicDateName="+request('materialName'),
	    	method:'POST',
	    	
	    	multi: true,
	    	onComplete : function(ID,fileObj,response,data,event){
	    	response=response.substring(0,response.length-1);
	    	response+=','+'"controlid":"'+contorlid+'"}';
	    	var jsonData = eval("("+response+")");
	    	picture[picture.length]=response;
	    	//pictureMessage=jsonData;
	    	var oldhtml=$('#response').html();
	    	$('#response').html(oldhtml+jsonData.picturename+'已上传文件至此：<a target="_blank" href="../../'+jsonData.fileUrl+'">点击浏览</a><br/>');
	    }
			  });
		}