
function ajax(url,fnSucc,fnFaild) {
	// 创建ajax对象
	var oAjax = null;

	/* XMLHttpRequest是一个变量 */
	/* window.XMLHttpRequest是一个属性 */

	if(window.XMLHttpRequest) {
	 	oAjax = new XMLHttpRequest();
	} else {
		oAjax = new ActiveXObject("Microsoft.XMLHTTP");
	}



	// 连接服务器
	// open(方法，url，是否异步)
	oAjax.open('GET',url,true);

	// 发送请求
	oAjax.send();

	// 接收返回值
	// 当ajax和服务器有通信发生触发onreadystatechange
	oAjax.onreadystatechange = function () {

	 	///console.log(oAjax.readyState);
	 	if(oAjax.readyState === 4) {

	 		// alert(oAjax.status);
	 		if(oAjax.status === 200) {
	 			// success
	 			fnSucc(oAjax.responseText);
	 		} else {
	 			// fail
	 			// alert('失败了...');
	 			if(fnFaild) {
	 				fnFaild();
	 			}
	 		}
	 	}
	}
	
}










