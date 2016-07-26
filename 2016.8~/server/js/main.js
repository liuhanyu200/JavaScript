var iBox = getByClass('box');
var iDel = getByClass('delete');
//delCookie('username');
if(document.getElementById('username_register')) {
	var oUser = document.getElementById('username_register');
	// Ajax检测用户名
	(function() {
		oUser.onkeyup = function() {
			var str = this.value;
			if (str=="") {
				oTxt.innerHTML="";
				return;
			} 
			if (window.XMLHttpRequest) {
				// IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
				xmlhttp=new XMLHttpRequest();
			} else {
				// IE6, IE5 浏览器执行代码
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			xmlhttp.onreadystatechange=function() {
				if (xmlhttp.readyState==4 && xmlhttp.status==200) {
					if (xmlhttp.responseText === '1') {
						oTxt.innerHTML = '恭喜！该用户名可用';
						oTxt.style.color = 'green';
						document.getElementById("reg").disabled = false;
					}
					if (xmlhttp.responseText === '0') {
						oTxt.innerHTML = '您输入的用户名被占用了哟！换一个试试';
						oTxt.style.color = 'red';
						document.getElementById("reg").disabled = true;
					}
					// oTxt.innerHTML=xmlhttp.responseText
				}
			}
			xmlhttp.open("GET","/server/index.php/login/check_user?q="+str,true);
			xmlhttp.send();
			};
	})();
}

if(document.getElementById('username_login')) {
	var oUser1 = document.getElementById('username_login');
	// 登陆检测
	(function() {
		oUser1.onkeyup = function() {
			var str = this.value;
			if (str=="") {
				oTxt.innerHTML="";
				return;
			} 
			if (window.XMLHttpRequest) {
				// IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
				xmlhttp=new XMLHttpRequest();
			} else {
				// IE6, IE5 浏览器执行代码
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			xmlhttp.onreadystatechange=function() {
				if (xmlhttp.readyState==4 && xmlhttp.status==200) {
					if (xmlhttp.responseText === '1') {
						oTxt.innerHTML = '用户不存在';
						oTxt.style.color = 'red';
						document.getElementById("password_login").disabled = true;
						document.getElementById("reg").disabled = true;
					}
					if (xmlhttp.responseText === '0') {
						oTxt.innerHTML = '输入密码~';
						oTxt.style.color = 'green';
						document.getElementById("password_login").disabled = false;
						document.getElementById("reg").disabled = false;
					}
					// oTxt.innerHTML=xmlhttp.responseText
				}
			}
			xmlhttp.open("GET","/server/index.php/login/check_user?q="+str,true);
			xmlhttp.send();
			};
	})();
}

var oTxt = document.getElementById("txtHint");

// get by Class
function getByClass(sClass){
    var aResult=[];
    var aEle=document.getElementsByTagName('*');
    for(var i=0;i<aEle.length;i++){
       /*当className相等时添加到数组中*/
       if(aEle[i].className==sClass){
            aResult.push(aEle[i]);
        }
    }
    return aResult;
};

// 点击删除时候的特效
/*(function() {
	for(var i in iDel) {
		// var thisBox = iBox[i];
		iDel[i].onclick = function() {
			console.log(i+'+100');
			this.parent.style.background = '#eee';
		};
	}
})(); */

//JS操作cookies方法!

//写cookies
function setCookie(name,value)
{
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days*24*60*60*1000);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

// 获取cookies
function getCookie(name)
{
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
	return unescape(arr[2]);
	else
	return null;
}

// 删除cookie
function delCookie(name)
{
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=getCookie(name);
	if(cval!=null)
	document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}