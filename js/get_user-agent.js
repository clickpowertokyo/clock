// get user-agent infomation
// must inport jQuery.

function get_user_agent() {
	
	var t_json;
	var ua = navigator.userAgent;
	var device  = 'unknown';
	var browser = 'unknown';
	var render  = 'unknown';
	var prefix  = '';
	var smart   = ($(window).width() === screen.width && window.orientation >= 0);
	var version1 = new Array;
	var version2 = new Array;
	var pc = true;

	var a_consumer = new Array(
	'Game',
	'Nitro',
	'Nintendo',
	'PSP',
	'PLAYSTATION',
	'AVE-Front',
	'DreamPassport',
	'Inettv',
	'LocationFreeTV');
	
	var a_consumer_num = a_consumer.length;
		
	// search device
	if(ua.indexOf("Linux") != -1 || ua.indexOf("BSD") != -1 || ua.indexOf("Solaris") != -1) {
		device = 'unix';
	}

	if(ua.indexOf("Win") != -1) {
		device = 'win';
	}

	if(ua.indexOf("Mac") != -1) {
		device = 'mac';
	}

	if(ua.indexOf("CrOS") != -1) {
		device = 'chrome';
	}

	if(ua.indexOf("CE") != -1) {
		device = 'win_pda'; pc = false;
	}

	if(ua.indexOf("Mobi") != -1) {
		device = 'win_mobile'; pc = false;
	}

	if(ua.indexOf("DoCoMo") != -1 || ua.indexOf("FOMA") != -1) {
		device = 'docomo'; pc = false;
	}

	if(ua.indexOf("KDDI") != -1) {
		device = 'au'; pc = false;
	}

	if(ua.indexOf("SoftBank") != -1) {
		device = 'softbank'; pc = false;
	}

	if(ua.indexOf("iPhone") != -1 | ua.indexOf("iPod") != -1) {
		device = 'apple'; pc = false;
	}

	if(ua.indexOf("iPad") != -1) {
		device = 'apple';
	}

	if(ua.indexOf("Android") != -1) {
		device = 'android';
	}
	
	var i;
	for (i=0; i<a_consumer_num; i++) {
		
		if(ua.indexOf(a_consumer[i]) != -1) {
			device = 'consumer';
			break;
		}
	}



	// search browser
	if(ua.indexOf("Mozilla") != -1) {
		browser = 'mozilla';
	}

	if(ua.indexOf("MSIE") != -1) {
		browser = 'ie';
	}

	if(ua.indexOf("Firefox") != -1) {
		browser = 'firefox';
	}

	if(ua.indexOf("Opera") != -1) {
		browser = 'opera';
	}

	if(ua.indexOf("Safari") != -1) {
		browser = 'safari';
	}

	if(ua.indexOf("Chrome") != -1) {
		browser = 'chrome';
	}

	if(ua.indexOf("NetFront") != -1) {
		render = 'netfront';
	}
	
	
	
	// get version
	if (browser == 'ie') {
		version1 = ua.split('MSIE ');
		version2 = version1[1].split('.');

	} else if (browser == 'firefox') {
		version1 = ua.split('Firefox/');
		version2 = version1[1].split('.');

	} else if (browser == 'chrome') {
		version1 = ua.split('Chrome/');
		version2 = version1[1].split('.');

	} else if (browser == 'safari' || browser == 'opera') {
		version1 = ua.split('Version/');
		version2 = version1[1].split('.');

	} else {
		version2[0] = navigator.appVersion.split('.');
	
	}



	// search render
	if(ua.indexOf("KHTML") != -1) {
		render = 'khtml';
	}

	if(ua.indexOf("Trident") != -1 | ua.indexOf("Tasman") != -1) {
		render = 'trident';
	}

	if(ua.indexOf("Gecko") != -1) {
		render = 'gecko';
	}

	if(ua.indexOf("Presto") != -1) {
		render = 'presto';
	}
  	
	if(ua.indexOf("WebKit") != -1) {
		render = 'webkit';
	}


	
	// set prefix

	if (browser == 'opera')   {prefix = 'o';}
	if (browser == 'ie')      {prefix = 'ms';}
	if (browser == 'mozilla' || browser == 'firefox') {prefix = 'moz';}
	if (render == 'webkit')   {prefix = 'webkit';}



	// make json string

	t_json = '{';
	t_json += '"device"  : "'+ device +'",';
	t_json += '"browser" : "'+ browser +'",';
	t_json += '"version" : ' + parseInt(version2[0]) +',';
	t_json += '"render"  : "'+ render +'",';
	t_json += '"prefix"  : "'+ prefix +'",';
	t_json += '"pc"      : '+ pc +',';
	t_json += '"smart"   : '+ smart;
	t_json += '}';
	
	return t_json;	
}