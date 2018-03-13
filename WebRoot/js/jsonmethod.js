//刪除元素json元素
 function deletejson(i,json)
    {
    	var returnjson=eval('(' + '[]' + ')');
    	for(var t=0;t<json.length;t++)
    	{
    		if(t==i)
    		{
    			
    		}
    		else
    		{
    			returnjson.push(json[t]);
    		}
    	}
    	return returnjson;
    }