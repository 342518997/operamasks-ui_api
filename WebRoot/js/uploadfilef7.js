 var focusInput; 
 var primaryAttributeCarrayField;//当前主属性
 var LODOP; //声明为全局变量
 //通用打印分录
 function PrintMytable(){
	    var entry, str0,sb, str,sb1="", str1;
	    var sb2, str2, sb3, str3,sb4,str4, k, m;
		var activatedTabId = $('#attach').omTabs('getActivated');
		entry=document.getElementById(activatedTabId).innerHTML;
		str0=entry.substring(entry.indexOf("<div"),entry.lastIndexOf("/div>"))+"/div>";
		  alert(str0);
		//吧div下style所有width为150px替换为80px；
		   str=str0.replace(new RegExp("150px", 'g'), "50px");
		  //截取的tr中间有th
		  sb=str.substring(str.indexOf("<tr"), str.indexOf("/tr>"))+"/tr>";
		   
		  //截取的table，目标table,需要把th写入的table
		   k=str.indexOf("<table");
		   m=str.indexOf("<table",k+1);
		   str1=str.substring(m, str.lastIndexOf("/table>"))+"/table>";
		   
		   //截取<table到<tbody>并插入样式
		     str4=str1.substring(str1.indexOf("<table"),str1.indexOf("border="));
		      sb3=str4+'border=1  style="border-collapse:collapse;font-size:9pt;" bordercolor="#000000" align="center"><tbody>';
		     //截取table中的<tr>
		        if(str1.indexOf("<tr")!=-1){
		        	sb1=str1.substring(str1.indexOf("<tr"),str1.lastIndexOf("</tr>"))+"</tr>"; 		        	
		        }
		      //拼装string字符串
		     sb2=sb3+sb+sb1+"</tbody></table>";
		        LODOP=getLodop(document.getElementById('LODOP'),document.getElementById('LODOP_EM'));  
				//LODOP.ADD_PRINT_TABLE(100,5,500,280,sb2);
				//LODOP.SET_PRINT_PAGESIZE(3,1385,45,"");
				strCenterStyle="<style/>table {width:100%}</style>";
				LODOP.ADD_PRINT_HTM(1,"0.5%","99%",140,strCenterStyle+sb2); //左右空5px

				LODOP.PREVIEW();
		}	
  
 function Design() {
	 LODOP=getLodop(document.getElementById('LODOP'),document.getElementById('LODOP_EM'));  
     LODOP.PRINT_INIT("");
	LODOP=getLodop(document.getElementById('LODOP'),document.getElementById('LODOP_EM'));
	LODOP.PRINT_DESIGN();		
}; 
     
    function fileloadF7() {
        $("#dialog-modal").omDialog({
            autoOpen: false,
            width:450,
            height: 400,
            modal: true
            
        });
        $( "#dialog-modal").omDialog('open');
        var frameLoc=window.frames[0].location;
        frameLoc.href='../../printjsp/uploadfile.jsp?billType='+billType+'&materialName='+materialName;
        return false;
      }
   
   //打印方法
    function queryDesign(jsonObject){
    	var ftaxMan=jsonObject.ftaxMan,ftaxNationNumber=jsonObject.ftaxNationNumber,
    	    ftaxLocalNumber=jsonObject.ftaxLocalNumber,ftown=jsonObject.ftown,
    	    fstreet=jsonObject.fstreet,fbusiness=jsonObject.fbusiness,
    	    fapplyThing=jsonObject.fapplyThing,ftaxNationAdmin=jsonObject.ftaxNationAdmin,
    	    ftime=jsonObject.ftime,ftaxLocalNumber=jsonObject.ftaxLocalNumber,
    	    ftaxLocalAdmin=jsonObject.ftaxLocalAdmin,ftaxNation=jsonObject.ftaxNation,
    	    ftaxNationHead=jsonObject.ftaxNationHead,ftaxNationOne=jsonObject.ftaxNationOne,
    	    ftaxLocal=jsonObject.ftaxLocal,ftaxLocalHead=jsonObject.ftaxLocalHead,
    	    ftaxLocalOne=jsonObject.ftaxLocalOne,fnumber=jsonObject.fnumber;
        var str0='<h3>纳税信用证明单</h3>';
    	var str="&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp纳税人<u>"+ftaxMan+"</u>,税务登记证号(居民身份证号)<u>"+ftaxNationNumber+" "+ftaxLocalNumber+"</u>,在<u>"+ftown+"</u>,<u>"+fstreet+"</u>村(社区、街道)" +
    			"从事<u>"+fbusiness+"</u>,经营现申请办理<u>"+fapplyThing+"</u>行政事项，经审核，已缴清相关税费。";
    	var str2=" <font size=2>注：此证明单有效期15天，第一个单位审核盖章起7天内到另一个单位审核盖章有效，从最后审核单位审核盖章起计有效期15天。此证明单由行政事项办理单位存档。</font>";
    	var str3="县国税审核盖章";
    	var str4="县地税审核盖章";
    	var str5=ftime;
    	var str6="国税: 该纳税人的纳税情况经县 国 税局税收管理员<u>"+ftaxNationAdmin+"</u>、所属<u>"+ftaxNation+"</u>分局局长<u>"+
    	ftaxNationHead+"</u>初审，县 国 税局纳税信用证明单开具专干<u>"+ftaxNationOne+"</u>审核，同意出具纳税信用证明单。 ";
    	var str7="地税: 该纳税人的纳税情况经县 地 税局税收管理员<u>"+ftaxLocalAdmin+"</u>、所属<u>"+ftaxLocal+"</u>分局局长<u>"+
    	ftaxLocalHead+"</u>初审，县 地 税局纳税信用证明单开具专干<u>"+ftaxLocalOne+"</u>审核，同意出具纳税信用证明单。";
    	var str8="<h3>NO:"+fnumber+"</h3>";
    	LODOP=getLodop(document.getElementById('LODOP'),document.getElementById('LODOP_EM'));
		LODOP.PRINT_INIT("");
		LODOP.ADD_PRINT_HTM(20,460,200,30,str0);
		LODOP.SET_PRINT_STYLE("Alignment",2);
		LODOP.ADD_PRINT_HTM(50,800,200,30,str8);
		LODOP.SET_PRINT_STYLE("Alignment",3);
		LODOP.ADD_PRINT_HTM(130,50,650,50,str);
		LODOP.SET_PRINT_STYLEA(5,"LineSpacing",20);
		LODOP.ADD_PRINT_HTM(180,50,650,50,str2);
		LODOP.ADD_PRINT_HTM(280,150,150,50,str3);
		LODOP.ADD_PRINT_HTM(280,650,150,50,str4);
		LODOP.ADD_PRINT_HTM(310,650,150,40,str5);
		LODOP. ADD_PRINT_LINE(370,60,370,1030,0,1);
		LODOP.ADD_PRINT_HTM(380,50,650,50,str6);
		LODOP. ADD_PRINT_LINE(440,60,440,1030,0,1);
		LODOP.ADD_PRINT_HTM(450,50,650,50,str7);
		LODOP. SET_PRINT_PAGESIZE (2, 0, 0,"A4");
		LODOP. SET_SHOW_MODE("LANDSCAPE_DEFROTATED",1);
		LODOP.PREVIEW();	
    }
    //打印设计
    function printDesign(){
    	LODOP=getLodop(document.getElementById('LODOP'),document.getElementById('LODOP_EM'));
		LODOP.PRINT_INIT("");
		LODOP.SET_PRINT_PAGESIZE(1,2100,2970,"");
    	LODOP.PRINT_DESIGN();
    }
    