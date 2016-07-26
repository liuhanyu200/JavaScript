/**JavaScript方法实现Ajax
 * @return {responseText}
 */
document.getElementById('a').onclick = function() {

	// 创建XHR对象
	var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	//
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			// responseText返回
			console.log("hah");
			document.getElementById('ajax').innerHTML = xmlhttp.responseText;
		}
	};
	// open 
	xmlhttp.open("POST","/server/txt/test.txt");
	// send
	xmlhttp.send();
};



/**
 * jQuery方法实现Ajax
 */
$('#b').click(function() {
	$.ajax({				
		async: true,
		cache: false,
		type:"POST",
		url:"/server/txt/test.txt",
		success: function(data) {
			// console.log("haha");
			$('#ajax').text(data);
		}
	});
});