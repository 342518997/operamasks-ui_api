if(window.top!==self){
	window.top.location.href=self.location.href;
}
function addUser() {
		var firstChar = document.getElementById("username").value.charAt(0);
		var userName=document.getElementById("username").value;
		if(document.getElementById("username").value=="") {
			alert("用户名称不能为空");
			document.getElementById("username").focus();
			return;
		}else if(userName.search("[\f\n\r\t\v]")!=-1||userName.indexOf(" ")!=-1){
			alert("用户名中不能有空白字符或空格");
			document.getElementById("username").focus();
			return;
		}else{
		
		}
		
		var password=document.getElementById("password").value;
		if(password==""||password=="null"){
			 alert("密码不能为空");
			document.getElementById("username").focus();
			return;
		 }else if(password.length<6||password.length>16){
		 	alert("密码长度必需在6-16之间");
			document.getElementById("username").focus();
			return;
		}else if(password.search("[\f\n\r\t\v]")!=-1||password.indexOf(" ")!=-1){
		   alert("密码中不能有空白字符或空格");
			document.getElementById("username").focus();
			return;
		 }	
		 
         
		
		with(document.getElementById("userForm")) {alert(22);
		   	method="post";
			action = "login.action";
			submit();
		}
 }
 
 
 function userLogin() {
     
       // return;
		var firstChar = document.getElementById("username").value;
		var userName=document.getElementById("username").value;
		if(document.getElementById("username").value=="") {
			alert("用户名称不能为空");
			document.getElementById("username").focus();
			return;
		}else if(userName.search("[\f\n\r\t\v]")!=-1||userName.indexOf(" ")!=-1){
			alert("用户名中不能有空白字符或空格");
			document.getElementById("username").focus();
			return;
		}else{
		
		}
		
		var password=document.getElementById("password").value;
		if(password==""||password=="null"){
			 alert("密码不能为空");
			document.getElementById("username").focus();
			return;
		 }else if(password.length<6||password.length>16){
		 	alert("密码长度必需在6-16之间");
			document.getElementById("username").focus();
			return;
		}else if(password.search("[\f\n\r\t\v]")!=-1||password.indexOf(" ")!=-1){
		   alert("密码中不能有空白字符或空格");
			document.getElementById("username").focus();
			return;
		 }	
		 
   
		with(document.getElementById("userForm")) {
		   method="post";
			action = "userlogin.action";
		}
 }
	
	function validate(st) {
		
		if(st==1){
		  var str=document.getElementById("username").value;
		  var firstChar=str.charAt(0);
		  if(str==""||str=="null"){"WebRoot/login.jsp"
			  document.getElementById("spanusername").innerHTML = "请输入用户名";
		  }else if(str.length>15){
			  document.getElementById("spanusername").innerHTML = "用户名太长";
		  }else if(str.search("[\f\n\r\t\v]")!=-1||str.indexOf(" ")!=-1){
			  document.getElementById("spanusername").innerHTML = "不能有非空白字符或空格";
		  }else {
			  document.getElementById("spanusername").innerHTML = "";
		  }
		}
		if(st==2){
		    var str2=document.getElementById("password").value;
		    
		    if(str2==""||str2=="null"){
			  document.getElementById("spanpassword").innerHTML = "请输入密码";
			} else if(str2.length<6||str2.length>16){
		  	  document.getElementById("spanpassword").innerHTML = "密码长度必需在6-16之间";
		    }else if(str2.search("[\f\n\r\t\v]")!=-1||str2.indexOf(" ")!=-1){
		    	document.getElementById("spanpassword").innerHTML = "密码中不能有空白字符";
		    }else{
		    	document.getElementById("spanpassword").innerHTML = "";
		    }
        }
        
       

}