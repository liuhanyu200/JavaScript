/**
 * demo made by klci 
 */

// find Num from str
(function () {
	var str = '12,87 76 -ddf 89 ff76---2345kkk---sdjs9-.';
	var arr = [];
	var tmp = '';
	var i = 0;

	for (i=0;i<str.length;i++) {
		if (str.charAt(i) >= '0' && str.charAt(i) <= '9') {
			tmp = str.charAt(i);
			arr.push(tmp);
			tmp = '';
		}
	}
	console.log(arr); 
	// ["1", "2", "8", "7", "7", "6", "8", "9", "7", "6", "2", "3", "4", "5", "9"]
})();

// find Num from str 2
(function () {
	var str = '12,87 76 -ddf 89 ff76---2345kkk---sdjs9-.';
	var arr = [];
	var tmp = '';
	var i = 0;

	for (i=0;i<str.length;i++) {
		if (str.charAt(i) >= '0' && str.charAt(i) <= '9') {
			tmp += str.charAt(i);
		}
		else {
			if (tmp) {
				arr.push(tmp);
				tmp = '';
			}
		}
	}

	if (tmp) {
		arr.push(tmp);
		tmp = '';
	}
	console.log(arr);
	// ["12", "87", "76", "89", "76", "2345", "9"]
})();


// reg find Num
(function () {
	var str = '12,87 76 -ddf 89 ff76---2345kkk---sdjs9-.';
	var re = /\d+/g;
	console.log(str.match(re)); // ["12", "87", "76", "89", "76", "2345", "9"]
})();

// 正则 基本应用
(function () {
	var str = 'sbduh83U12asjd';
	// i 忽略大小写
	// JS风格
	var re = new RegExp('u1','i');
	// perl 风格
	var re1 = /u1/i;
	console.log(re); // /u1/i
	console.log(str.match(re)); // ["U1", index: 7, input: "sbduh83u12asjd"]
	console.log(re.test(str)); // true
})();

// search 和 正则 配合
(function () {
	var str = '2gh2321923hhjdkfsdjf349123ji231263h2u323u123';
	var re = /\d/; //  \d 表示数字 匹配一个数字
	var re1 = /\d/g; // 匹配 全局的数字
	var re2 = /\d+/g; // 匹配不定个数字

	var str1 = window.navigator.userAgent;

	// 识别浏览器是不是chrome
	if (str1.search(/chrome/i) != -1) {
		console.log('chrome');
	}
	else {
		console.log('not chrome');
	}
	console.log(str.search(re)); // 0

	console.log(str.match(re)); // 
	console.log(str.match(re1)); // 
	console.log(str.match(re2)); // 
})();

// replace 和 正则
(function () {
	var str = '1jh2aaa213AAAk4k5Aa23';
	// 替换一个2为T
	console.log(str.replace(2,'T'));
	// 替换全局的2为T
	console.log(str.replace(/2/g,'T'));
	// 替换大小的a为100
	console.log(str.replace(/a/gi,100));
})();


/**
 * 匹配任意单个字符 [] 或者
 * [a-z]所有的英文 [0-9]所有数字 \d 
 * [^a] 除了a以外所有都可以
 * [^a-z0-9]除了a-z 0-9以外都可以 即 匹配特殊字符
 */
(function () {
	var str = '1a2bji1b@#$56%%!!!)(2f=gif1；;A2d1c2dfh1a22a12c12b1';
	var re = /1[abc]2/gi; // /1a2|1b2|1c2/
	var re1 = /[^a-z0-9]/gi;
	console.log(str.match(re)); // [ "1a2", "1c2", "1a2" ]
	console.log(str.match(re1)); // [ "@", "#", "$", "%", "%", "!", "!", "!", ")", "(", 等 3 项… ]
})();

/**
 * 去除html标记
 */
(function () {
	var str = '<h3>hello 你好啊sdsfg<p>发生的价格is大</p></h3>';

	// 匹配<>以及<>内部的东西，除了<>里面有<>的
	var re = /<[^<>]+>/g;
	// 去除所有html标签
	console.log(str.replace(re));
})();

/**
 * 检测qq
 */
(function () {
	var str = '我的qq是2356979368，你的qq是多少呢？是不是123456？';
	var re = /[0-9]\d{4,9}/g;
	console.log(str.match(re));
})();

/**
 * 检测电话号码
 */
(function () {
	var str = '15974813773';
	var str1 = '12247893421';
	var re = /^1[358]\d{9}$/;
	//console.log(re.test(str));
	console.log(re.test(str1));
})();

/**
 * 校验邮箱
 */
(function (str) {
	//^$ 检测整个字符串
	var re = /^\w+@[a-z0-9]+\.[a-z]{2,4}$/;
	console.log(re.test(str));
})('2356979368@qq.com');

/**
 * 去除首尾空格
 */
(function (str) {
	var re = /^\s+|\s+$/g;
	console.log('('+str.replace(re,'')+')');
})('  ni a 什么都不是?  ');

/**
 * 匹配中文
 */
(function (str) {
	var re = /[\u4e00-\u9fa5]+/g;
	console.log(str.match(re));
})('鱼松 is my friend ？姜亦凡is my friend周彬，优盘，李毅');










