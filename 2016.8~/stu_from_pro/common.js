<?php include($_SERVER['DOCUMENT_ROOT'].'/application/views/common/i18n.php'); ?>

var V = {
	checkUname: function(un){
		var pattern = /^[^\/\\\[\]\":;|<>+=,?*]{1,16}$/;
		return pattern.test(un);
	},

	checkPwd: function(pwd){
		var pattern = /^[-_`~!@#$%^&*()=+;:"',<.>\/?{\[}\]\\|a-zA-Z0-9]{6,64}$/;
		return pattern.test(pwd);
	},

	checkAccount: function(account){
		var pattern = /^[^\/\[\]\":;|<>+=,?*]{1,32}$/;
		return pattern.test(account);
	},

	checkVncAccount: function(account){
		account = account.split(':');
		if (account.length != 2)
		{
			return false;
		}
		if (!V.checkNum(account[0]))
		{
			return false;
		}
		if (!V.checkAccount(account[1]))
		{
			return false;
		}
		return true;
	},

	checkAccountPwd: function(pwd){
		var pattern = /^[ -_`~!@#$%^&*()=+;:"',<.>\/?{\[}\]\\|a-zA-Z0-9]{1,256}$/;
		return pattern.test(pwd);
	},

	checkEmail: function(email){
		if(email.length > 100)
		{
			return false;
		}
		var pattern = /^[a-zA-Z0-9]+([._+-]*[a-zA-Z0-9])*@[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?$/;
		return pattern.test(email);
	},

	checkDate: function(date){
		var pattern = /^(?:(?!0000)[0-9]{4}([-])(?:(?:0[1-9]|1[0-2])\1(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])\1(?:29|30)|(?:0[13578]|1[02])\1(?:31))|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-])02\2(?:29))$/;
		return pattern.test(date);
	},

	checkDateSeg: function(dt1, dt2){
		dt1 = dt1.replace(/[-\/]/g, '');
		dt2 = dt2.replace(/[-\/]/g, '');
		return dt2 >= dt1;
	},

	checkDateSeg2: function(dt1, dt2){
		dt1 = dt1.replace(/[-\/]/g, '');
		dt2 = dt2.replace(/[-\/]/g, '');
		return dt2 > dt1;
	},

	checkDatetime: function(dt){
		var pattern = /^[0-9]{4}[-\/][0-9]{2}[-\/][0-9]{2}[ ]{1}[0-9]{2}[:]{1}[0-9]{2}[:]{1}[0-9]{2}$/;
		return pattern.test(dt);
	},

	checkTime: function(time){
		var pattern = /^(?:[0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
		return pattern.test(time);
	},

	checkMobile: function(mobile){
		if(mobile === '')
		{
			return true;
		}
		var pattern = /^[0-9]{1,14}$/;
		return pattern.test(mobile);
	},

	checkStrlen: function(str, len){
		var limit = 50;
		if(len)
		{
			limit = len;
		}
		return str.length <= limit;
	},

	checkComment: function(comment){
		return this.check_strlen(comment, 50);
	},

	checkIP: function(ipstr){
		var pattern = /^((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|[0-9])(\.((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|[0-9])){3}$/;
		if(pattern.test(ipstr))
		{
			if(ipstr == '0.0.0.0' || ipstr == '255.255.255.255' || V.ip127(ipstr))
			{
				return false;
			}
			return true;
		}
		return false;
	},

	checkIP2: function(ipstr){
		var pattern = /^((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|[0-9])(\.((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|[0-9])){3}$/;
		if(pattern.test(ipstr))
		{
			return true;
		}
		return false;
	},

	ip127: function(ipstr){
		if(!V.checkIP2(ipstr))
		{
			return false;
		}
		dec = V.ip2long(ipstr)
		if(dec >= 2130706432 && dec <= 2147483647)
		{
			return true;
		}
		return false;
	},

	ip2long: function(ipstr){
		var res = false;
		if(V.checkIP2(ipstr))
		{
			var nums = ipstr.split('.');
			res = 0;
			res = (nums[0] * Math.pow(256, 3)) + (nums[1] * Math.pow(256, 2)) + (nums[2] * Math.pow(256, 1)) + (nums[3] * Math.pow(256, 0));
		}
		return res;
	},

	long2ip: function(num){
		var res = false;
		if(/^[0-9]{1,10}$/.test(num) && (num >= 0 && num <= 4294967295))
		{
			res =  Math.floor (num / Math.pow ( 256, 3 ) ) + '.' +
	           Math.floor ( ( num % Math.pow ( 256, 3 ) ) / Math.pow ( 256, 2 ) ) + '.' +
	           Math.floor ( ( ( num % Math.pow ( 256, 3 ) ) % Math.pow ( 256, 2 ) ) / Math.pow ( 256, 1 ) ) + '.' +
	           Math.floor ( ( ( ( num % Math.pow ( 256, 3 ) ) % Math.pow ( 256, 2 ) ) % Math.pow ( 256, 1 ) ) / Math.pow ( 256, 0 ) );
		}
		return res;
	},

	checkIPSegment: function(ip1, ip2){
		var res = false;
		if(!V.checkIP2(ip1) || !V.checkIP2(ip2))
		{
			return res;
		}
		res = (V.ip2long(ip1) <= V.ip2long(ip2));
		return res;
	},

	/*
		函数名：check_mask()
		功能：根据给定的掩码或网络标识位长度，返回网络标识位的长度（0到32）。若输入不合法，返回-1。
		输入：点分十进制格式的掩码，或网络标识位长度（0到32）。
		输出：
			1、失败时返回-1。
			2、成功时返回网络标识位的长度（0到32）
	*/
	checkMask: function(mask){
		var res = -1;
		if(/^[0-9]{1,2}$/.test(mask) && Number(mask) >= 0 && Number(mask) <= 32)
		{
			res = Number(mask);
		}
		else if(V.checkIP2(mask))
		{
			var num = V.ip2long(mask);
			var num_bin = num.toString(2); //转换为二进制
			if(num_bin == 0)
			{
				res = 0;
			}
			else if(num_bin.length == 32 && /^[1]{0,32}[0]{0,32}$/.test(num_bin))
			{
				res = num_bin.lastIndexOf('1') + 1;
			}
		}
		return res;
	},

	checkDomain: function(domain){
		if(domain.length > 256)
		{
			return false;
		}
		var pattern = /^[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?$/;
		return pattern.test(domain);
	},

	checkPort: function(portstr){
		var pattern = /^[1-9]$|(^[1-9][0-9]$)|(^[1-9][0-9][0-9]$)|(^[1-9][0-9][0-9][0-9]$)|(^[1-5][0-9][0-9][0-9][0-9]$)|(^[6][0-4][0-9][0-9][0-9]$)|(^[6][5][0-4][0-9][0-9]$)|(^[6][5][5][0-2][0-9]$)|(^[6][5][5][3][0-5]$)/;
		return pattern.test(portstr);
	},

	checkMac: function(mac_str){
		var pattern = /^([0-9a-fA-F]{2})(([:][0-9a-fA-F]{2}){5})$/;
		return pattern.test(mac_str);
	},

	checkNum: function(str){
		// var pattern = /^0$|^[1-9][0-9]*$/;
		var pattern = /^[0-9]+$/;
		return pattern.test(str);
	},

	checkPrio: function(prio){
		if(!V.checkNum(prio))
		{
			return false;
		}
		prio = Number(prio);
		if(prio >= 0 && prio <= 255)
		{
			return true;
		}
		return false
	},

	checkMtu: function(mtu){
		if( ! /^[1-9][\d]*$/.test(mtu))
		{
			return false;
		}
		mtu = Number(mtu);
		if(mtu >= 576 && mtu <= 1500)
		{
			return true;
		}
		return false;
	},

	checkCmd: function(cmd){
		// var pattern = /^[-_`~!@#$%^&*()=+;:\"\',<.>\/?{\[}\]|\\a-zA-Z0-9\u4e00-\u9fa5]{1,150}$/;
		// return pattern.test(cmd);
		var pattern = /^[^\u0000-\u001f]{1,150}$/;
		var pattern2 = /^[^\u007f]{1,150}$/;
		if(pattern.test(cmd) && pattern2.test(cmd))
		{
			return true;
		}
		return false;
	},

	checkVisibleCharactor: function(str){
		var pattern = /^[-_`~!@#$%^&*()=+;:\"\',<.>\/?{\[}\]|\\a-zA-Z0-9]*$/;
		return pattern.test(str);
	},

	checkVisibleCharactor2: function(str){
		// 包含空格
		var pattern = /^[ -_`~!@#$%^&*()=+;:\"\',<.>\/?{\[}\]|\\a-zA-Z0-9]*$/;
		return pattern.test(str);
	},

	checkPrivatekeyOpenssh: function(privatekey){
		var headers = new Array(
			"-----BEGIN RSA PRIVATE KEY-----\n",
			"-----BEGIN DSA PRIVATE KEY-----\n"
		);
		for (var i in headers)
		{
			if (privatekey.indexOf(headers[i]) == 0)
			{
				return true;
			}
		}
		return false;
	},

	checkPublickeyOpenssh: function(publickey) {
		return true;
	},

	checkAssetIP: function(ipstr){
		if (ipstr.length > 100) {
			return false;
		}
		if (ipstr == '0.0.0.0' || ipstr == '255.255.255.255' || V.ip127(ipstr)) {
			return false;
		}
		return true;
	},

	checkAssetName: function(assetName) {
		var pattern = /[\s]+/;
		if (pattern.test(assetName))
		{
			return false;
		}
		if (assetName.indexOf('/') === -1 && assetName.indexOf('@') === -1)
		{
			return true;
		}
		return false;
	},

	checkAssetTagName: function(tagname) {
		var pattern = /[\s]+/;
		if (pattern.test(tagname))
		{
			return false;
		}
		if (tagname.indexOf('/') === -1 && tagname.indexOf('@') === -1)
		{
			return true;
		}
		return false;
	},

	checkHttpHeader: function(text) {
		text = C.trim(text);
		var rows = text.split('\n');
		for (var i in rows) {
			var index = rows[i].indexOf(':');
			if (index === -1 || index === 0) {
				return false;
			}
		}
		return true;
	},

	checkSmsgateUrl: function(url) {
		var index = url.indexOf('?');
		if (index === -1 || index === 0) {
			return false;
		}

		var query = url.substr(index + 1);
		return V.checkSmsgateQuery(query);
	},

	checkSmsgateQuery: function(query) {
		if (query === ''||query === null) {
			return false;
		}
		if (query.indexOf('$smsMob') === -1) {
			return false;
		}
		return true;
	},

	_checkSmsgateQuery: function(query) {
		if (query === ''||query === null) {
			return false;
		}

		var mobile_key = '';
		var smstext_key = '';
		// var params = {};

		query = query.split('&');
		var name = '';
		var value = '';

		for (var i in query) {
			index = query[i].indexOf('=');

			if (index === -1 || index === 0) {
				continue;
			}

			name = query[i].substring(0, index);
			value = query[i].substr(index + 1);
			// params[name] = value;

			if (value === '$smsMob') {
				if (mobile_key !== '') {
					return false;
				}
				mobile_key = name;
			} else if (value === '$smsText') {
				if (smstext_key !== '') {
					return false;
				}
				smstext_key = name;
			}
		}

		if (mobile_key === '') {
			return false;
		}
		if (smstext_key === '') {
			return false;
		}

		return true;
	},

	checkSmsgateSoapApi: function(api) {
		var pattern = /^[a-zA-Z0-9_]+\(.+\)$/;
		if (!pattern.test(api))
		{
			return false;
		}

		var index = api.indexOf('(');
		// if (index === -1 || index === 0) {
		// 	return false;
		// }
		// if (api.substr(-1) !== ')') {
		// 	return false;
		// }

		var args = api.substring(index + 1, api.length - 1);
		if (args === '') {
			return false;
		}
		if (args.indexOf('$smsMob') === -1) {
			return false;
		}

		return true;
	},

	checkUrl: function(url) {
		return true;
	}
};

var LZH = {
	userDomain: '用户域',
	assetDomain: '资产域',
	auditDomain: '审计域',
	assetDir: '资产组'
};

var L = LZH;

var config = {
	emptyAccount: '[EMPTY]'
};

var C = {
	htmlEncode: function(str){
		if (str === null || str === undefined) {
			return '';
		}
		str = '' + str;

		str = str.replace(/&/g, "&amp;");
		str = str.replace(/</g, "&lt;");
		str = str.replace(/>/g, "&gt;");
		str = str.replace(/"/g, "&quot;");
		str = str.replace(/'/g, "&#39;");
		return str;
	},
  
  //A JavaScript equivalent of PHP’s urldecode
  //http://phpjs.org/functions/urldecode/
  urldecode:function(str) { 
   return decodeURIComponent((str+'').replace(/\+/g, '%20'));
  }, 

	getUrlHostname: function(){
		var hostname = window.location.hostname;
		return hostname;
	},

	jsonEncode: function(obj) {
		try {
			return JSON.stringify(obj);
		} catch (e) {
			return '';
		}
	},

	jsonDecode: function(str) {
		try {
			return JSON.parse(str);
		} catch (e) {
			return null;
		}
	},

	emptyObject: function(obj) {
		for (var i in obj) {
			return false;
		}
		return true;
	},

	strfdate: function(date) {
		var str = '';
		var year = date.getFullYear();
		var month = date.getMonth();
		var day = date.getDate();
		var hour = date.getHours();
		var minute = date.getMinutes();
		var second = date.getSeconds();

		month += 1;
		month = month >= 10 ? month : '0' + month;
		day = day >= 10 ? day : '0' + day;
		hour = hour >= 10 ? hour : '0' + hour;
		minute = minute >= 10 ? minute : '0' + minute;
		second = second >= 10 ? second : '0' + second;

		str = year + '-' + month + '-' + day + ' ' + hour + ':' + minute  + ':' + second;
		return str;
	},

	strftime: function(timestamp) {
		var date = new Date(Number(timestamp) * 1000);
		return this.strfdate(date);
	},
	
	round: function(num, ndigits) {
		return Number(num).toFixed(ndigits);
	},

	objectMerge: function(first, second) {
		// merge properties of second into first
		for (var i in second) {
			if (first[i] === undefined) {
				first[i] = second[i];
			}
		}
		return first;
	},

	inArray: function(find, array) {
		for (var i in array) {
			if (array[i] === find) {
				return true;
			}
		}
		return false;
	},

	rowsColumnValue: function(rows, keyname) {
		var res = [];
		for (var i in rows) {
			res.push(rows[i][keyname]);
		}
		return res;
	},

	urlParse: function(url) {
		url = url ? url : window.location.href;

		var loc = this.locationParse(url);
		var query = this.queryParse(loc[1]);
		return [loc, query];
	},

	locationParse: function(url) {
		var location = '';
		var query = '';
		var index = url.indexOf('?');

		if (index !== -1) {
			location = url.substr(0, index);
			query = url.substr(index + 1);
		} else {
			location = url;
		}
		return [location, query];
	},

	queryParse: function(query) {
		var params = {};

		query = query.split('&');
		var name = '';
		var value = '';
		var index = -1;

		for (var i in query) {
			index = query[i].indexOf('=');

			if (index === -1 || index === 0) {
				continue;
			}

			name = query[i].substring(0, index);
			value = query[i].substr(index + 1);
			params[name] = decodeURIComponent(value);
		}

		return params;
	},

	queryStr: function(params) {
		var query = '';
		for (var name in params) {
			query += query === '' ? '' : '&';
			query += name + '=' + encodeURIComponent(params[name]);
		}
		return query;
	},

	getUrlParam: function(name) {
		var url = C.urlParse();
		var value = url[1][name];
		if (typeof value === 'undefined') {
			value = '';
		}
		return value;
	},

  getUrlParameter:function(sParam)
  {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return C.urldecode(sParameterName[1]);
        }
    }
  },

	getCookie: function(c_name) {
		if (document.cookie.length>0)
		{
			c_start=document.cookie.indexOf(c_name + "=");
			if (c_start!=-1)
			{
				c_start=c_start + c_name.length+1;
				c_end=document.cookie.indexOf(";",c_start);
				if (c_end==-1) c_end=document.cookie.length;
				return unescape(document.cookie.substring(c_start,c_end));
			}
		}
		return "";
	},

	setCookie: function(name, value, path, expires, domain, secure) {
		document.cookie = name + "=" + escape(value) +
		((expires) ? "; expires=" + expires : "") +
		((path) ? "; path=" + path : "") +
		((domain) ? "; domain=" + domain : "") +
		((secure) ? "; secure" : "");
	},

	delCookie: function(name, cpath) {
		//为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间
	   var date = new Date();
	   date.setTime(date.getTime() - 1000);
	   cstr = name + "=''; expires=" + date.toGMTString();
	   if(cpath)
	   {
		cstr += "; path=" + cpath;
	   }
	   document.cookie = cstr;
	},

	trim: function(str) {
		if (str === null || typeof str === 'undefined') {
			return '';
		}
		str = str.replace(/(^\s+)|(\s+$)/g, "");
		return str;
	},

	baseUrl: function() {
		return 'https://' + window.location.host + '/';
	},

	isIE7: function(){
		if($.browser.msie && $.browser.version == '7.0')
		{
			return true;
		}
		return false;
	},

	isIE: function() {
		if($.browser.msie)
		{
			return true;
		}
		return false;
	},

	isWebkit: function() {
		if($.browser.webkit)
		{
			return true;
		}
		return false;
	},

	isOpera: function() {
		if($.browser.opera)
		{
			return true;
		}
		return false;
	},

	isChrome: function() {
		if($.browser.chrome)
		{
			return true;
		}
		return false;
	},

	getValue: function(elem) {
		return C.trim(elem.val());
	},

	getInputValue: function(container) {
		var data = {};
		var getValue = this.getValue;
		container.find('input[type="text"]').each(function() {
			var id = $(this).attr('id');
			if (id !== undefined) {
				data[id] = getValue($(this));
			}
		});
		container.find('input[type="password"]').each(function() {
			var id = $(this).attr('id');
			if (id !== undefined) {
				data[id] = getValue($(this));
			}
		});
		container.find('input[type="hidden"]').each(function() {
			var id = $(this).attr('id');
			if (id !== undefined) {
				data[id] = getValue($(this));
			}
		});
		container.find('textarea').each(function() {
			var id = $(this).attr('id');
			if (id !== undefined) {
				data[id] = getValue($(this));
			}
		});
		return data;
	},

	getSelectValue: function (container) {
		var data = {};
		var elem = container.find('select');
		for (var i = 0, n = elem.length; i < n; i ++) {
			var id = elem.eq(i).attr('id');
			if (id !== undefined) {
				data[id] = elem.eq(i).val();
			}
		}
		return data;
	},

	getCheckboxValue: function (container) {
		var data = {};
		container.find('input:checkbox').each(function() {
			var id = $(this).attr('id');
			if (id !== undefined) {
				var value = $(this).prop('checked') ? '1' : '0';
				data[id] = value;
			}
		});
		return data;
	},

	getRadioValue: function(container) {
		var data = {};
		container.find('input:radio').each(function() {
			var name = $(this).attr('name');
			if (data[name] === undefined) {
				data[name] = container.find('input[name="' + name + '"]:checked').val();
			}
		});
		return data;
	},

	parseForm: function(container) {
		var data = {};
		data = this.objectMerge(data, this.getInputValue(container));
		data = this.objectMerge(data, this.getSelectValue(container));
		data = this.objectMerge(data, this.getCheckboxValue(container));
		data = this.objectMerge(data, this.getRadioValue(container));
		return data;
	},

	renameKey: function(obj, keyName, newKeyName) {
		obj[newKeyName] = obj[keyName];
		delete obj[keyName];
	}
};

var AC = {
	ajaxParamEncode: function(param){
		var param_encoded = {};
		for (var i in param) {
			param_encoded[i] = encodeURIComponent(param[i]);
		}
		return param_encoded;
	},

	ajaxCallback: function(data) {
		data = C.jsonDecode(data);
		if (data && typeof data === 'object' && typeof data.errcode !== 'undefined') {
			if (data.errcode == -2) {
				document.location.href = C.baseUrl();
				return false;
			} else if (data.errcode == -3) {
				UI.msg.error('<?php echo _("操作失败：参数错误"); ?>');
				return false;
			}
		}
		return true;
	},

	ajax: function(params) {
		var settings = {
			async: true,
			cache: false,
			type: 'POST',
			url: '',
			data: ''
		};

		if (typeof params.async !== 'undefined') {
			settings.async = params.async;
		}
		if (typeof params.cache !== 'undefined') {
			settings.cache = params.cache;
		}
		if (typeof params.type !== 'undefined') {
			settings.type = params.type;
		}
		if (typeof params.timeout !== 'undefined') {
			settings.timeout = params.timeout;
		}
		if (typeof params.url !== 'undefined') {
			settings.url = params.url;
		}
		if (typeof params.data !== 'undefined') {
			settings.data = this.ajaxParamEncode(params.data);
		}
		if (typeof params.success !== 'undefined') {
			settings.success = params.success;
			ajaxCallback = this.ajaxCallback;

			settings.success = function(msg) {
				if (ajaxCallback(msg)) {
					params.success(msg);
				}
			}
		}
		if (typeof params.error !== 'undefined') {
			settings.error = params.error;
		}
		if (typeof params.complete !== 'undefined') {
			settings.complete = params.complete;
		}

		$.ajax(settings);
	},

	getProtocol: function(){
		var prots = {
			'1': 'TELNET',
			'2': 'SSH',
			'3': 'FTP',
			'4': 'SFTP',
			'5': 'RDP',
			'6': 'VNC',
			'8': 'SQL Server'
		};
		return prots;
	},

	getAllProtocol: function(){
		prots = this.getProtocol();
		prots['0'] = 'SYSDEF';
		return prots;
	},

	getDefaultPort: function(protid){
		var ports = {
			'1': '23',
			'2': '22',
			'3': '21',
			'4': '22',
			'5': '3389',
			'6': '5900',
			'8': '1433'
		};
		return ports[protid];
	},

	getProtocolName: function(protocolId) {
		var prots = this.getAllProtocol();
		for (var i in prots) {
			if (String(protocolId) === i) {
				return prots[i];
			}
		}
		return '';
	},

	getProtocolId: function(protocolName) {
		var prots = this.getAllProtocol();
		for (var i in prots) {
			if (prots[i].toUpperCase() === String(protocolName).toUpperCase()) {
				return i;
			}
		}
		return '';
	},

	getFlexApp: function(appname){
		return document[appname];
	},

	checkSsoInstall: function(){
		var res = this.checkSsoInstall_v1();
		if (res === 0) {
			res = this.checkSsoInstall_v2();
		}
		return res;
	},

	checkSsoInstall_v1: function() {
		var res = 0;
		if ($('#plugin-container').length == 0) {
			var obj = $('<div id="plugin-container" style="visible: hidden; position: absolute; bottom: 0; right: 0; z-index: -9999;"><object id="plugin0" type="application/x-das-usm-sso" width="10" height="10"></object></div>');
			$('body').append(obj);
		}
		var plugin = document.getElementById('plugin0');
		if (plugin.valid) {
			res = 1;
		}
		obj.remove();
		return res;
	},

	checkSsoInstall_v2: function() {
		var res = 0;
		if ($('#plugin-container').length == 0) {
			var obj = $('<div id="plugin-container" style="visible: hidden; position: absolute; bottom: 0; right: 0; z-index: -9999;"><object id="plugin0" type="application/x-usmsso-x64" width="10" height="10"></object></div>');
			$('body').append(obj);
		}
		var plugin = document.getElementById('plugin0');
		if(plugin.valid) {
			res = 1;
		}
		obj.remove();
		return res;
	},

	runSsoClient: function(url) {
		if (C.isWebkit() || C.isOpera()) {
			document.location.href = url;
		} else {
			$('#hiddeniframe').remove();
			var iframe = $('<iframe id="hiddeniframe" src="" style="display: none;"></iframe>');
			iframe.attr('src', url);
			$('body').append(iframe);
		}
	},

	durationFormat: function(stime, etime) {
		var duration = Number(etime) - Number(stime);
		var day = Math.floor(duration / 86400);
		var hour = Math.floor((duration % 86400) / 3600);
		var minute = Math.floor((duration % 3600) / 60);
		var second = duration % 60;

		var durstr = '';
		durstr += day > 0 ? (day + '<?php echo _("天"); ?>') : '';
		durstr += hour > 0 ? (hour + '<?php echo _("小时"); ?>') : '';
		durstr += minute > 0 ? (minute + '<?php echo _("分"); ?>') : '';
		durstr += second + '<?php echo _("秒"); ?>';

		return durstr;
	},

	bytesFormat: function(bytes) {
		bytes = Number(bytes);
		if (bytes < 1024) {
			res = bytes + 'B';
		} else if (bytes >= 1024 && bytes < 1048576) {
			res = C.round(bytes / 1024, 2) + 'KB';
		} else if(bytes >= 1048576 && bytes < 1073741824) {
			res = C.round(bytes / 1048576, 2) + 'MB';
		} else {
			res = C.round(bytes / 1073741824, 2) + 'GB';
		}
		return res;
	},

	getParentNodes: function(node, treeObj) {
		var parents 	= [],
			parentNode 	= node.getParentNode();
		
		if (!parentNode) {
			return parents;
		}

		var parents = this.getParentNodes(parentNode, treeObj);
		parents.push(parentNode);
		
		return parents;
	},

	domainNodeOfAssetDir: function(dirNode, treeObj) {
		// 获取资产组结点所在的资产域结点
		var parents = this.getParentNodes(dirNode, treeObj);
		for (var i in parents) {
			if (parents[i].type == 2 && parents[i].id != 4) {
				return parents[i];
			}
		}
		return null;
	},

	dialogParams: function(params) {
		var res = {};
		var keyname = '';
		for (var key in params) {
			keyname = key.substr(2);
			res[keyname] = params[key];
		}
		return res;
	},

	getAllUsers: function() {
		users = [];
		AC.ajax({
			async: false,
			url: '/index.php/common/all_users',
			success: function(msg) {
				msg = C.jsonDecode(msg);
				if (msg) {
					users = msg;
					AC.setUserIcon(users);
				}
			}
		});
		return users;
	},

	getMyUsers: function() {
		users = [];
		AC.ajax({
			async: false,
			url: '/index.php/user/user/my_users',
			success: function(msg) {
				msg = C.jsonDecode(msg);
				if (msg) {
					users = msg;
				}
			}
		});
		return users;
	},

	setDeptIcon: function(depts) {
		for (var i in depts) {
			if (depts[i].stat == 0) {
				depts[i].iconSkin = 'diydead';
			} else {
				//depts[i].iconSkin = 'diyassetdomain';
			}
		}
	},

	setDomainIcon: function(domains) {
		for (var i in domains) {
			if (domains[i].stat == 0) {
				domains[i].iconSkin = 'diydead';
			} else {
				if (domains[i].type == 1 ) {
					if (domains[i].id == 3) {
						domains[i].iconSkin = 'diyuserroot';
					} else {
						domains[i].iconSkin = 'diyusergroup';
					}
				} else if (domains[i].type == 2 ) {
					if (domains[i].id == 4) {
						domains[i].iconSkin = 'diyassetroot';
					} else {
						domains[i].iconSkin = 'diyassetdomain';
					}
				} else if (domains[i].type == 4 ) {
					domains[i].iconSkin = 'diyassetgroup';
				}
			}
		}
	},

	setAccountGroupIcon: function(groups) {
		for (var i in groups) {
			groups[i].iconSkin = 'diyaccountgroup';
		}
	},

	setUserIcon: function(users) {
		for (var i in users) {
			users[i].iconSkin = 'diyuser';
		}
	},

	setAppServerIcon: function(servers) {
		for (var i in servers) {
			servers[i].iconSkin = 'diyappserver';
		}
	},

	setAppIcon: function(apps) {
		for (var i in apps) {
			apps[i].iconSkin = 'diyapp';
		}
	},

	getAllUserDomains: function() {
		domains = [];
		AC.ajax({
			async: false,
			url: '/index.php/domain/all_domains',
			data: {type: 'user'},
			success: function(msg) {
				msg = C.jsonDecode(msg);
				if (msg) {
					domains = msg;
					AC.setDomainIcon(domains);
				}
			}
		});
		return domains;
	},

	getMyDomains: function(type) {
		var domains = [];
		AC.ajax({
			async: false,
			url: '/index.php/domain/my_domains',
			data: {type: type},
			success: function(msg) {
				msg = C.jsonDecode(msg);
				if (msg) {
					domains = msg;
					AC.setDomainIcon(domains);
				}
			}
		});
		return domains;
	},

	getMyAccountGroups: function() {
		var groups = [];
		var res = AC.getObjectFromUrl('/index.php/asset/account/my_groups', undefined, []);
		if (res.length) {
			groups = res[0];
		}
		AC.setAccountGroupIcon(groups);
		return groups;
	},

	curUid: function() {
		return $('#cur-user').attr('data-uid');
	},

	curUname: function() {
		return $('#cur-user').text();
	},

	curDeptid: function() {
		return $('#cur-user').attr('data-deptid');
	},

	userFormatter: function(row, uname_key, name_key) {
		uname_key = uname_key || 'uname';
		name_key = name_key || 'name';

		var html = C.htmlEncode(row[uname_key]);
		if (row[name_key]) {
			html += '<span class="tcm">' + C.htmlEncode(row[name_key]) + '</span>';
		};
		return html;
	},

	assetFormatter: function(row, ip_key, name_key) {
		ip_key = ip_key || 'ip';
		name_key = name_key || 'astname';

		var html = C.htmlEncode(row[ip_key]);
		if (row[name_key]) {
			html += '<span class="tcm">' + C.htmlEncode(row[name_key]) + '</span>';
		};
		return html;
	},

	userDomains: [],
	myUserDomains: function() {
		if (!AC.userDomains.length) {
			AC.userDomains = AC.getMyDomains(1);　 
		}
		return AC.userDomains;
	},

	assetDomains: [],
	myAssetDomains: function() {
		if (!AC.assetDomains.length) {
			AC.assetDomains = AC.getMyDomains(2);　 
		}
		return AC.assetDomains;
	},

	getDomains: function(assetDomains) {
		var res = [];
		for (var i in assetDomains) {
			if (assetDomains[i].type == 2 && assetDomains[i].id != 4) {
				res.push(assetDomains[i]);
			}
		}
		return res;
	},

	getAssetList: function(domainid) {
		var assets = [];
		AC.ajax({
			async: false,
			url: '/index.php/asset/asset/my_asset_list',
			data: {domainid: domainid},
			success: function(msg) {
				msg = C.jsonDecode(msg);
				if (msg) {
					assets = msg;
				}
			}
		});
		return assets;
	},

	getObjectFromUrl: function(url, params, default_res) {
		var res = [];
		
		if (default_res !== undefined) {
			res = default_res;
		}

		var ajax = {
			async: false,
			url: url,
			success: function(msg) {
				msg = C.jsonDecode(msg);
				if (msg) {
					res = msg;
				}
			}
		};
		if (params) {
			ajax.data = params;
		}

		AC.ajax(ajax);
		return res;
	},

	getFromUrl: function(url, params, default_res) {
		var res = '';
		
		if (default_res !== undefined) {
			res = default_res;
		}

		var ajax = {
			async: false,
			url: url,
			success: function(msg) {
				res = msg;
			}
		};
		if (params) {
			ajax.data = params;
		}

		AC.ajax(ajax);
		return res;
	},

	delayCounter: 0,
	delay: function(callback, timeout, counter) {
		// Delay to call callback
		var delay = arguments.callee;
		
		if (counter === undefined){
			var counter = AC.delayCounter + 1;
			AC.delayCounter += 1;

			if (!timeout) {
				timeout = 200; // 毫秒
			}

			setTimeout(function(){
				delay(callback, timeout, counter);
			}, timeout);			
		} else if (counter === AC.delayCounter){
			callback();
		}
	},

	myDepts: [],
	getMyDepts: function() {
		if (AC.myDepts.length) {
			return AC.myDepts;
		}

		// var depts = AC.getObjectFromUrl('/index.php/user/user/my_depts', undefined, []);
		var depts = AC.getObjectFromUrl('/index.php/common/my_depts', undefined, []);
		AC.myDepts = depts;
		return depts;
	},

	myRoles: [],
	getMyRoles: function() {
		if (AC.myRoles.length) {
			return AC.myRoles;
		}
		
		var roles = AC.getObjectFromUrl('/index.php/user/user/my_roles', undefined, []);
		return roles;
	},

	allRoles: [],
	getAllRoles: function() {
		if (AC.allRoles.length) {
			return AC.allRoles;
		}
		
		var roles = AC.getObjectFromUrl('/index.php/user/user/all_roles', undefined, []);
		return roles;
	},

	getOmauthrRoles: function() {
		var roles = AC.getAllRoles();
		if ($('#_shemi_sj89').length && $('#_shemi_sj89').val() == '1') {
			var omauthr_roles = [];
			for (var i in roles) {
				if (!C.inArray(roles[i].id, [100, 101, 107])) {
					omauthr_roles.push(roles[i]);
				}
			}
			return omauthr_roles;
		} else {
			return roles;
		}
		return roles;
	},

	getAuditRuleRoles: function() {
		var roles = AC.getAllRoles();
		var rule_roles = [];

		if ($('#_shemi_sj89').length && $('#_shemi_sj89').val() == '1') {
			for (var i in roles) {
				if (C.inArray(roles[i].id, [103, 105])) {
					rule_roles.push(roles[i]);
				}
			}
		} else {
			for (var i in roles) {
				if (C.inArray(roles[i].id, [100, 101, 103, 105])) {
					rule_roles.push(roles[i]);
				}
			}
		}
		return rule_roles;
	}
};
var BD = {
    DataBinder:function( object_id ){
        var pubSub = jQuery({});
        var data_attr = "bind-" + object_id,
            message = object_id + ":change",
            errormsg =  object_id + ":error"
    
        jQuery( document ).on( "change", "[data-" + data_attr + "]", function( evt ) {
          var $input = jQuery( this );
          pubSub.trigger( message, [ $input.data( data_attr ), $input.val() ] );
        });
        
        pubSub.on( message, function( evt, prop_name, new_val ) {
          jQuery( "[data-" + data_attr + "=" + prop_name + "]" ).each( function() {
            var $bound = jQuery( this );
            if ($bound.is("input, textarea, select") ) {
              if(this.type === "checkbox"){
                 if( new_val === "1"){
                    $bound.attr('checked', true); 
                    new_val = "0"
                 }
                 else{
                    $bound.attr('checked', false); 
                    new_val = "1" 
                 }
              }
              $bound.val( new_val );
            } else {
              $bound.html( new_val );
            }
          });
        });
        return pubSub;
    },
    Item: function ( id ) {
      var binder = new BD.DataBinder( id ),
          item = {
            attributes: {},
            set: function( attr_name, val ) {
              this.attributes[ attr_name ] = val;
              binder.trigger( id + ":change", [ attr_name, val, this ] ); //事件触发流动
            },
            get: function( attr_name ) {
              if(typeof(this.attributes[attr_name]) === "undefined" ){
                  return "" ;
              }
              else
              {
                  return this.attributes[ attr_name ];
              }
            },
            css:function( attr_name, name , val) {
              var data_attr = "bind-" + id;
              $( "[data-" + data_attr + "=" + attr_name + "]" ).css(name,val);
            },
            addcss:function( attr_name, name ) {
              var data_attr = "bind-" + id;
              $( "[data-" + data_attr + "=" + attr_name + "]" ).addClass(name);
            },
            error:function( attr_name, val) {
              binder.trigger( id + ":error", [ attr_name, val ] ); 
            },
            onevent:function( attr_name, val ,func) {
              $("[data-bind-"+id +"="+attr_name+"]").on(val,func);
            },
            _binder: binder
          };

      binder.on( id + ":change", function( evt, attr_name, new_val, initiator ) {
        if ( initiator !== item ) { 
          item.set( attr_name, new_val );
          var data_attr = "bind-" + id;
          $( "[data-" + data_attr + "=" + attr_name + "]" ).each(function(){$(this).trigger("set");});
        }
      });

      binder.on( id + ":error", function( evt, attr_name, emsg ) {
          var data_attr = "bind-" + id;
          $( "[data-" + data_attr + "=" + attr_name + "]" ).each(function(){UI.itError($(this), emsg);});
      });
      return item;
    }
};
