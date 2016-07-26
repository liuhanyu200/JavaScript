/**
 * 请写一个字符串转成驼峰的方法？        
例如：border-bottom-color  -> borderBottomColor

 * 查找字符串中出现最多的字符和个数？        
例如：sdjksfssscfssdd  -> 字符最多的是s，出现了7次

 * 如何给字符串加千分符？        
例如：3562123761  -> 3,562,123,761

要求：以上三道题，都需要用两种以上的方式实现：一种用传统的字符串、数组方式实现，一种用正则表达式的方式实现；
 */



// 字符串转驼峰---字符串操作
(function (str) {
	// toUpperCase()
	var arr = str.split('-');
	for(var i=1;i<arr.length;i++) {
		arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substring(1);
	}
	console.log(arr); // [ "border", "Bottom", "Color" ]
	// join 方法
	console.log(arr.join(''));
})('border-bottom-color');

// 字符串转驼峰 --- 正则
(function (str) {
	var re = /-(\w)/g; // 子项 () ---> \w
	console.log(str.replace(re,function ($0,$1) { // $0表示正则本身 $1表示子项()
		return $1.toUpperCase();
	}));
})('border-bottom-color');

// 查找字符串中出现次数最多的字符和个数 --- 字符串方法实现
(function (str) {

	var obj = {};
	var value = '';
	var num = 0;

	for (var i=0;i<=str.length;i++) {
		if (!obj[str[i]]) {
			obj[str[i]] = [];
		}
		else{
			obj[str[i]].push(str[i]);
		}
	}
	for (var attr in obj) {
		if (num < obj[attr].length) {

			// +1 ?
			num = obj[attr].length+1;
			value = obj[attr][0];
		}
	}
	console.log(value+'...'+num);
})('sdjksfssscfssdd');

// 查找字符串中出现次数最多的字符和个数 --- 正则
(function (str) {

	var arr = str.split('');
	arr.sort();
	str = arr.join('');
	console.log(str);

	var re = /(\w)\1+/g;
	var num = 0;

	str.replace(re,function ($0,$1) {
		if (num < $0.length) {
			num = $0.length;
			value = $1;
		}
	});
	console.log(num+'...'+value);
})('sdjksfssscfssdd');

// 给字符串加千分符 字符串方式
(function (str) {

	var iNum = str.length%3;
	var prev = '';
	var arr = [];
	var iNow = 0;
	var tmp = '';

	if (iNum != 0) {
		prev = str.substring(0,iNum);
		arr.push(prev);
	}

	str = str.substring(iNum);
	for (var i=0;i<=str.length;i++) {
		iNow++;
		tmp += str[i];

		if (iNow == 3 && tmp) {
			arr.push(tmp);
			tmp = '';
			iNow = 0;
		}
	}
	console.log(arr.join(','));  // 36,247,892,349,256,721,637

})('36247892349256721637');

/**
 * (?=) 前向声明  
 * (?!) 反前向声明
 */
(function () {
	var str = 'abcahabsdia';
	var re = /a(?=b)/g;
	var re1 = /a(?!b)/g;
	console.log(str.replace(re,'*'));
	console.log(str.replace(re1,'*'));
})();


// 给字符串加千分符 正则 匹配一个具体位置

(function (str) {
	// 
	var re = /(?=(?!\b)(\d{3})+$)/g;
	console.log(str.replace(re,','));
})('247892349256721637');


// 返回一个只包含数字的数组
(function (str) {
	var re = /\d+/g;
	// var re1 = /(a-z)+/g;
	console.log(str.match(re));
	// console.log(str.match(re1));
})('12dnjs3434d8fs88as012ndsj33kk');





















































































