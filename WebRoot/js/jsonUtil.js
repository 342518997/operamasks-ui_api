	     /*****array转换成json*****/
	   function arraytojson(array){
	     	var returnValue='[';
	     	for(var i=0;i<array.length;i++)
	     	{
	     		returnValue+=array[i];
	     		if(i!=array.length-1)
	     		{
	     			returnValue+=',';
	     		}
	     	}
	     	returnValue+=']';
	     	return returnValue;
	     }