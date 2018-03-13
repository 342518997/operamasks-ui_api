loadblur();
$('#toolbar').append("<input type='button' onclick='langloclick()'  value='获取地理位置经纬度'></input>");
function langloclick()
{
	window.open('getlanglo.jsp');
} 
//给经纬度字段加上onblur方法。
function loadblur()
{
	//给地图字段添加方法。当地图text失去焦点，马上给地址字段给值
	document.getElementById('390ae88c6bb64fa0b8da260529cac33710000016').onblur=function ()
	{
		var langlo=document.getElementById('390ae88c6bb64fa0b8da260529cac33710000016').value;
		var data=langlo.split('*');
		var gc = new BMap.Geocoder(); 
		var point = new BMap.Point(data[0],data[1]);
		gc.getLocation(point, function(rs){
        var addComp = rs.addressComponents;
        document.getElementById('f4ee60fc87b84148ad7b163fc60ca19d10000016').value=addComp.province+addComp.city+addComp.district+addComp.street+addComp.streetNumber;
       // alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
        }
        )
	}
}