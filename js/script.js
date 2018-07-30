// JavaScript Document

//if (typeof global == 'undefined') global = {};
var global = global || {};

var b,i,ii,n,t,a,len;

$.copy = function(obj) {
	
	try {
	
		return JSON.parse(JSON.stringify(obj));
		
	} catch(e) {

		if (e.message.lastIndexOf(' u') != -1) {
		
			console.error('[background]$.copyにundefinedが指定されています');
			console.error(obj);
		}
	}
}

function init_audio(obj) {
	
	var b,i,n,t,a,len,key = 0;
	
	var frame_of_voice = 9;
	
	obj.bgm = [];
	obj.se  = [];
	obj.bgm_call = {};
	obj.se_call  = {};
	
	obj.bgm.push({'name':'mute', 'path':'voice'	, 'duration':0});
	obj.bgm_call[obj.bgm[key].name+''] = key+0; key++;
	
	key = 0;
	obj.se.push({'name':'mute'		,'path':'voice', 'duration':0		,'layer':0, 'loop':0});
	obj.se_call[obj.se[key].name+''] = key+0; key++;
	
	obj.se.push({'name':'click'		,'path':'voice', 'duration':0		,'layer':0, 'loop':0});
	obj.se_call[obj.se[key].name+''] = key+0; key++;
	
	obj.se.push({'name':'a15'		,'path':'voice', 'duration':53		,'layer':0, 'loop':0});
	obj.se_call[obj.se[key].name+''] = key+0; key++;
	
	obj.se.push({'name':'a45'		,'path':'voice', 'duration':53		,'layer':0, 'loop':0});
	obj.se_call[obj.se[key].name+''] = key+0; key++;
	
	obj.se.push({'name':'a30'		,'path':'voice', 'duration':88		,'layer':0, 'loop':0});
	obj.se_call[obj.se[key].name+''] = key+0; key++;
	
	obj.se.push({'name':'gozen'		,'path':'voice/takahashi', 'duration':4 * frame_of_voice ,'layer':0, 'loop':0});
	obj.se_call[obj.se[key].name+''] = key+0; key++;
	
	obj.se.push({'name':'gogo'		,'path':'voice/takahashi', 'duration':3 * frame_of_voice ,'layer':0, 'loop':0});
	obj.se_call[obj.se[key].name+''] = key+0; key++;
	
	obj.se.push({'name':'sitei'		,'path':'voice/takahashi', 'duration':240	,'layer':0, 'loop':1});
	obj.se_call[obj.se[key].name+''] = key+0; key++;

	obj.se.push({'name':'a0'		,'path':'voice', 'duration':618		,'layer':0, 'loop':0});
	obj.se_call[obj.se[key].name+''] = key+0; key++;
	
	obj.se.push({'name':'night'		,'path':'voice', 'duration':495		,'layer':0, 'loop':0});
	obj.se_call[obj.se[key].name+''] = key+0; key++;


	var dur = [];
	dur[2] = 2; dur[4] = 2; dur[5] = 2; dur[9] = 2;
	
	dur[0] = 3; dur[1] = 3; dur[3] = 3; dur[6] = 3; dur[7] = 3; dur[8] = 3; dur[10] = 3;

	dur[12] = 4; dur[14] = 4; dur[15] = 4; dur[19] = 4; dur[20] = 4;

	dur[11] = 5; dur[13] = 5; dur[16] = 5; dur[17] = 5; dur[19] = 5; dur[22] = 5;

	dur[21] = 6; dur[23] = 6;

	for (i=0; i<24; i++) {
		t = ('00'+i).slice(-2);
		obj.se.push({'name':'h'+t ,'path':'voice/takahashi/h', 'duration':(dur[i] + 1) * frame_of_voice ,'layer':0, 'loop':0});	
		obj.se_call['h'+i] = key+0; key++;
	}
	
	for (i=5; i<60; i+=5) {
		t = ('00'+i).slice(-2);
		obj.se.push({'name':'m'+t ,'path':'voice/takahashi/m', 'duration':240	,'layer':0, 'loop':0});	
		obj.se_call['m'+i] = key+0; key++;
	}
}

var ua = get_user_agent();

var xclick = new cross_click();

var audio_data = {}; init_audio(audio_data);

var audio = new audio_manager();

audio.init(audio_data.bgm, audio_data.se);

audio.start_load();

function playSE(key) {
	audio.se(audio_data.se_call[key]);
}

function getDurationSE(key) {
	
	if (typeof audio_data.se_call[key] == 'undefined') return 0;
	
	var i = audio_data.se_call[key] + 0;
	
	return audio_data.se[i].duration + 0;
}

global.bgColor_daytime  = {r:  0, g: 64, b:192};//'#0040c0';
global.bgColor_night    = {r: 32, g:  0, b: 64};//'#200040';
global.bgColor_midnight = {r: 16, g:  0, b:  0};//'#100000';
global.bgColor_alarm    = {r:255, g:255, b:255};//'#ffffff';

global.color_daytime  = {r:255, g:255, b:255};
global.color_night    = {r:255, g:255, b:  0};
global.color_midnight = {r:255, g:128, b:  0};
global.color_alarm    = {r:  0, g:  0, b:255};

// load storage
var lsd = window.localStorage;

if (typeof lsd.data == 'undefined' || lsd.data == '') {

	new_data(); mod_lsd();

} else {

	global.data = JSON.parse(lsd.data);
}
setColor();

function mod_lsd() {
	
	lsd.data = JSON.stringify(global.data);
}

function new_data() {
	
	global.data = {
		
		 morning: {h: 5, m:30}
		,evening: {h:17, m:0}
		,night  : {h:22, m:0}
		,alarm  : {h: 7, m:0}
		,b_alarm: false
	};
	
	global.data.morning.hm = global.data.morning.h * 60 + global.data.morning.m;
	global.data.evening.hm = global.data.evening.h * 60 + global.data.evening.m;
	global.data.night.hm   = global.data.night.h   * 60 + global.data.night.m;
	global.data.am_pm		= false;
	global.data.nightplay	= false;
	global.data.melomute	= false;
}

// 保存しない設定値
global.b_audio_play		= false;
global.voiceplay		= false;
global.beforeTime = 0;


function getHexStrings(number) {
	return ('00'+number.toString(16)).slice(-2);
}

function setColor() {
	
	var b,i,n,t,a,h,m;
	var cr,cg,cb,rr,gg,bb,seq;
	var color;
	var bgcolor;
	
			cr = global.color_midnight.r+0;
			cg = global.color_midnight.g+0;
			cb = global.color_midnight.b+0;
			color = '#'+getHexStrings(cr)+getHexStrings(cg)+getHexStrings(cb);
			
			cr = global.bgColor_midnight.r+0;
			cg = global.bgColor_midnight.g+0;
			cb = global.bgColor_midnight.b+0;
			bgcolor = '#'+getHexStrings(cr)+getHexStrings(cg)+getHexStrings(cb);
	
	if (typeof global.color == 'undefined')	global.color   = [];
	if (typeof global.bgColor == 'undefined')	global.bgColor = [];
	
	for (i=0; i<1440; i++) {
		
		h = i / 60 >> 0;
		m = i % 60;
		
		if (
			global.data.night.hm + 60 <= i
		||	i < global.data.morning.hm
		) {
			cr = global.color_midnight.r+0;
			cg = global.color_midnight.g+0;
			cb = global.color_midnight.b+0;
			color = '#'+getHexStrings(cr)+getHexStrings(cg)+getHexStrings(cb);
			
			cr = global.bgColor_midnight.r+0;
			cg = global.bgColor_midnight.g+0;
			cb = global.bgColor_midnight.b+0;
			bgcolor = '#'+getHexStrings(cr)+getHexStrings(cg)+getHexStrings(cb);
//			if (m == 0) console.log(h+': '+'midnight');
		}

		if (global.data.morning.hm <= i && i < global.data.morning.hm + 60) {
			
			n = i - global.data.morning.hm; if (n < 0) n += 1440;
			
			cr = global.color_midnight.r+0;
			cg = global.color_midnight.g+0;
			cb = global.color_midnight.b+0;
			rr = global.color_daytime.r+0; rr = (rr - cr) / 60;
			gg = global.color_daytime.g+0; gg = (gg - cg) / 60;
			bb = global.color_daytime.b+0; bb = (bb - cb) / 60;
			color = '#'+getHexStrings(cr + rr * n >> 0)+getHexStrings(cg + gg * n >> 0)+getHexStrings(cb + bb * n >> 0);
			
			cr = global.bgColor_midnight.r+0;
			cg = global.bgColor_midnight.g+0;
			cb = global.bgColor_midnight.b+0;
			rr = global.bgColor_daytime.r+0; rr = (rr - cr) / 60;
			gg = global.bgColor_daytime.g+0; gg = (gg - cg) / 60;
			bb = global.bgColor_daytime.b+0; bb = (bb - cb) / 60;
			bgcolor = '#'+getHexStrings(cr + rr * n >> 0)+getHexStrings(cg + gg * n >> 0)+getHexStrings(cb + bb * n >> 0);
//			if (m == 0) console.log(h+': '+'midnight 2 daytime');
		}

		if (global.data.morning.hm + 60 <= i && i < global.data.evening.hm) {
			
			cr = global.color_daytime.r+0;
			cg = global.color_daytime.g+0;
			cb = global.color_daytime.b+0;
			color = '#'+getHexStrings(cr)+getHexStrings(cg)+getHexStrings(cb);
			
			cr = global.bgColor_daytime.r+0;
			cg = global.bgColor_daytime.g+0;
			cb = global.bgColor_daytime.b+0;
			bgcolor = '#'+getHexStrings(cr)+getHexStrings(cg)+getHexStrings(cb);
//			if (m == 0) console.log(h+': '+'daytime');
		}

		if (global.data.evening.hm <= i && i < global.data.evening.hm + 60) {
			
			n = i - global.data.evening.hm; if (n < 0) n += 1440;
			
			cr = global.color_daytime.r+0;
			cg = global.color_daytime.g+0;
			cb = global.color_daytime.b+0;
			rr = global.color_night.r+0; rr = (rr - cr) / 60;
			gg = global.color_night.g+0; gg = (gg - cg) / 60;
			bb = global.color_night.b+0; bb = (bb - cb) / 60;
			color = '#'+getHexStrings(cr + rr * n >> 0)+getHexStrings(cg + gg * n >> 0)+getHexStrings(cb + bb * n >> 0);
			
			cr = global.bgColor_daytime.r+0;
			cg = global.bgColor_daytime.g+0;
			cb = global.bgColor_daytime.b+0;
			rr = global.bgColor_night.r+0; rr = (rr - cr) / 60;
			gg = global.bgColor_night.g+0; gg = (gg - cg) / 60;
			bb = global.bgColor_night.b+0; bb = (bb - cb) / 60;
			bgcolor = '#'+getHexStrings(cr + rr * n >> 0)+getHexStrings(cg + gg * n >> 0)+getHexStrings(cb + bb * n >> 0);
//			if (m == 0) console.log(h+': '+'daytime 2 night');
		}
		
		if (global.data.evening.hm + 60 <= i && i < global.data.night.hm) {
			
			cr = global.color_night.r+0;
			cg = global.color_night.g+0;
			cb = global.color_night.b+0;
			color = '#'+getHexStrings(cr)+getHexStrings(cg)+getHexStrings(cb);
			
			cr = global.bgColor_night.r+0;
			cg = global.bgColor_night.g+0;
			cb = global.bgColor_night.b+0;
			bgcolor = '#'+getHexStrings(cr)+getHexStrings(cg)+getHexStrings(cb);
//			if (m == 0) console.log(h+': '+'night');
		}

		if (global.data.night.hm <= i &&
			(i < global.data.night.hm + 60 || i < global.data.night.hm + 60 - 1440)
		) {
			n = i - global.data.night.hm; if (n < 0) n += 1440;
			
			cr = global.color_night.r+0;
			cg = global.color_night.g+0;
			cb = global.color_night.b+0;
			rr = global.color_midnight.r+0; rr = (rr - cr) / 60;
			gg = global.color_midnight.g+0; gg = (gg - cg) / 60;
			bb = global.color_midnight.b+0; bb = (bb - cb) / 60;
			color = '#'+getHexStrings(cr + rr * n >> 0)+getHexStrings(cg + gg * n >> 0)+getHexStrings(cb + bb * n >> 0);
			
			cr = global.bgColor_night.r+0;
			cg = global.bgColor_night.g+0;
			cb = global.bgColor_night.b+0;
			rr = global.bgColor_midnight.r+0; rr = (rr - cr) / 60;
			gg = global.bgColor_midnight.g+0; gg = (gg - cg) / 60;
			bb = global.bgColor_midnight.b+0; bb = (bb - cb) / 60;
			bgcolor = '#'+getHexStrings(cr + rr * n >> 0)+getHexStrings(cg + gg * n >> 0)+getHexStrings(cb + bb * n >> 0);
//			if (m == 0) console.log(h+': '+'night 2 midnight');
		}
		global.color[i]   = color;
		global.bgColor[i] = bgcolor;
	}
}

global.dateBefore = '';

global.deg = [];

for (i=0; i<7200; i++) {
	
	global.deg[i] = (i * 0.1) % 3600;
}

global.voice = {};

$('#voice_off').on(xclick.up, function(){
	
	playSE('click');
	$('#voice_off').hide();
	$('#voice_on').show();
	global.voiceplay = true;
});

$('#voice_on').on(xclick.up, function(){
	
	playSE('mute');
	$('#voice_on').hide();
	$('#voice_off').show();
	global.voiceplay = false;
});

$('#open_menu').on(xclick.up, function(){
	
	if (global.voiceplay) playSE('click');
	
	$('#close_config, #mordal_2').hide();
	$('#open_config').show();
	
	$('#open_menu').hide();
	$('#mordal_1, #close_menu').show();
	mod_config();
});

$('#close_menu').on(xclick.up, function(){
	
	if (global.voiceplay) playSE('click');
	$('#mordal_1, #close_menu').hide();
	$('#open_menu').show();
});

$('#open_config').on(xclick.up, function(){
	
	if (global.voiceplay) playSE('click');
	
	$('#close_menu, #mordal_1').hide();
	$('#open_menu').show();
	
	$('#open_config').hide();
	$('#mordal_2, #close_config').show();
	mod_config();
});

$('#close_config').on(xclick.up, function(){
	
	if (global.voiceplay) playSE('click');

	$('#mordal_2, #close_config').hide();
	$('#open_config').show();
});

function mod_config() {
	
	$('#am_pm')
		.attr('data-switch', global.data.am_pm ? 'on' : 'off');
	$('#am_pm span')
		.text(global.data.am_pm ? 'on' : 'off');
		
	$('#melomute')
		.attr('data-switch', global.data.melomute ? 'on' : 'off');
	$('#melomute span')
		.text(global.data.melomute ? 'on' : 'off');
		
	$('#nightplay')
		.attr('data-switch', global.data.nightplay ? 'on' : 'off');
	$('#nightplay span')
		.text(global.data.nightplay ? 'on' : 'off');

	$('#morning_hour')
		.text( ('00'+(global.data.morning.h + 1)).slice(-2) );

	$('#morning_minute')
		.text( ('00'+(global.data.morning.m + 0)).slice(-2) );

	$('#evening_hour')
		.text( ('00'+(global.data.evening.h + 1)).slice(-2) );

	$('#evening_minute')
		.text( ('00'+(global.data.evening.m + 0)).slice(-2) );

	$('#night_hour')
		.text( ('00'+(global.data.night.h + 1)).slice(-2) );

	$('#night_minute')
		.text( ('00'+(global.data.night.m + 0)).slice(-2) );
}

$('#am_pm').on(xclick.up, function(){
	
	if (global.voiceplay) playSE('click');

	global.data.am_pm = (global.data.am_pm == false);
	
		var d = new Date();
		
		var hour   = d.getHours();
		var minute = d.getMinutes();
		modDigital(hour,minute);	
	
	mod_lsd(); mod_config();
});

$('#melomute').on(xclick.up, function(){
	
	if (global.voiceplay) playSE('click');

	global.data.melomute = (global.data.melomute == false);
	mod_lsd(); mod_config();
});


$('#nightplay').on(xclick.up, function(){
	
	if (global.voiceplay) playSE('click');

	global.data.nightplay = (global.data.nightplay == false);
	mod_lsd(); mod_config();
});

function mod_data_hm() {

	global.data.morning.hm = global.data.morning.h * 60 + global.data.morning.m;
	global.data.evening.hm = global.data.evening.h * 60 + global.data.evening.m;
	global.data.night.hm   = global.data.night.h   * 60 + global.data.night.m;
}

global.temp = {};

function check_temp_param() {
	
	global.temp.morning.hm = global.temp.morning.h * 60 + global.temp.morning.m;
	global.temp.evening.hm = global.temp.evening.h * 60 + global.temp.evening.m;
	global.temp.night.hm   = global.temp.night.h   * 60 + global.temp.night.m;
	
	var b = true;
	b = b && (global.temp.morning.hm >= 0);
	b = b && (global.temp.evening.hm - global.temp.morning.hm >= 60);
	b = b && (global.temp.night.hm - global.temp.evening.hm >= 60);
	b = b && (global.temp.night.hm <= 60 * 23);

	if (b) {
		if (global.voiceplay) playSE('click');
		
		global.data = $.copy(global.temp);
		mod_lsd();

		var d = new Date();
		
		var hour   = d.getHours();
		var minute = d.getMinutes();

		setColor();
		modColor(hour * 60 + minute);
		mod_config();
	}
}


$('#morning_hour_sub').on(xclick.up, function(){	
	global.temp = $.copy(global.data);   global.temp.morning.h -= 1;
	check_temp_param();
});

$('#morning_hour_add').on(xclick.up, function(){	
	global.temp = $.copy(global.data);   global.temp.morning.h += 1;
	check_temp_param();
});

$('#morning_minute_sub').on(xclick.up, function(){	
	global.temp = $.copy(global.data);   global.temp.morning.m -= 15;
	
	if (global.temp.morning.m == -15) {
		global.temp.morning.h -=1; global.temp.morning.m = 45;
	}
	check_temp_param();
});

$('#morning_minute_add').on(xclick.up, function(){	
	global.temp = $.copy(global.data);   global.temp.morning.m += 15;
	if (global.temp.morning.m == 60) {
		global.temp.morning.h +=1; global.temp.morning.m = 0;
	}
	check_temp_param();
});


$('#evening_hour_sub').on(xclick.up, function(){	
	global.temp = $.copy(global.data);   global.temp.evening.h -= 1;
	check_temp_param();
});

$('#evening_hour_add').on(xclick.up, function(){	
	global.temp = $.copy(global.data);   global.temp.evening.h += 1;
	check_temp_param();
});

$('#evening_minute_sub').on(xclick.up, function(){	
	global.temp = $.copy(global.data);   global.temp.evening.m -= 15;
	
	if (global.temp.evening.m == -15) {
		global.temp.evening.h -=1; global.temp.evening.m = 45;
	}
	check_temp_param();
});

$('#evening_minute_add').on(xclick.up, function(){	
	global.temp = $.copy(global.data);   global.temp.evening.m += 15;
	
	if (global.temp.evening.m == 60) {
		global.temp.evening.h +=1; global.temp.evening.m = 0;
	}
	check_temp_param();
});


$('#night_hour_sub').on(xclick.up, function(){	
	global.temp = $.copy(global.data);   global.temp.night.h -= 1;
	check_temp_param();
});

$('#night_hour_add').on(xclick.up, function(){	
	global.temp = $.copy(global.data);   global.temp.night.h += 1;
	check_temp_param();
});

$('#night_minute_sub').on(xclick.up, function(){	
	global.temp = $.copy(global.data);   global.temp.night.m -= 15;
	
	if (global.temp.night.m == -15) {
		global.temp.night.h -=1; global.temp.night.m = 45;
	}
	check_temp_param();
});

$('#night_minute_add').on(xclick.up, function(){	
	global.temp = $.copy(global.data);   global.temp.night.m += 15;
	
	if (global.temp.night.m == 60) {
		global.temp.night.h +=1; global.temp.night.m = 0;
	}
	check_temp_param();
});



global.voice.seq = -1;
global.voice.setlist = [];

global.voice.l24 = {};
global.voice.l12 = {};

for (i=0; i<24; i++) {
	
	global.voice.l24['h'+i] = {};
	global.voice.l12['h'+i] = {};
	
	for (ii=0; ii<60; ii+=5) {
		
		global.voice.l24['h'+i]['m'+ii] = ['h'+i];
		global.voice.l12['h'+i]['m'+ii] = [i <= 12 ? 'gozen' : 'gogo'];
		global.voice.l12['h'+i]['m'+ii].push(
			i <= 12 ? 'h'+i : 'h'+(i - 12)
		);

		if (ii) {
			global.voice.l24['h'+i]['m'+ii].push('m'+ii);
			global.voice.l12['h'+i]['m'+ii].push('m'+ii);
		}
	}
}

// VFX_0
global.vfx_0 = {};
global.vfx_0.seq = -1;
global.vfx_0.max_seq = 240;
global.vfx_0.opacity = [];
for (i=0; i<=240; i++) {
	
	n = 1 / 60 * (i % 60);
	
	if (i < 60) {
		global.vfx_0.opacity[i]	= 0.33 + 0.67 * n;

	} else if (i < 180) {
		global.vfx_0.opacity[i]	= 1;
		
	} else if (i < 240) {
		global.vfx_0.opacity[i]	= 1 - 0.67 * n;
		
	} else {
		global.vfx_0.opacity[i]	= 0.33;
	}
}

// VFX_1
global.vfx_1 = {};
global.vfx_1.seq = -1;
global.vfx_1.max_seq = 60;
global.vfx_1.double = false;
global.vfx_1.r  = [];
global.vfx_1.cy = [];
global.vfx_1.cx = 320;
global.vfx_1.opacity = [];

for (i=0; i<=60; i++) {
	
	n = 1 / 60 * i;
	
	global.vfx_1.r[i]		= 10 + 310 * n;
	global.vfx_1.cy[i]		= 20 + 300 * n;
	global.vfx_1.opacity[i]	= 1 - n;	
}

// VFX2
global.vfx_2 = {};
global.vfx_2.seq = -1;
global.vfx_2.max_seq = 618;
global.vfx_2.cy = [];
global.vfx_2.opacity = [];

// g2 0, g1 56, g0 112 - 618 gap 506 (/2 253)
for (i=0; i<=2; i++) {
global.vfx_2.cy[i] = [];
global.vfx_2.opacity[i] = [];
}

for (i=0; i<=618; i++) {
	
	// cy 20 - 320
	n = 1 / 253;
	
	// g2 0 - 253 - 506 618
			if (i < 253) {
		global.vfx_2.cy[2][i] = 20 + 300 * (n * i);

	} else if (253 <= i && i < 506) {
		global.vfx_2.cy[2][i] = 20 + 300 * (1 - n * (i - 253));
		
	} else {
		global.vfx_2.cy[2][i] = 20;
	}
	
	// g1 0 56 - 309 - 562 618
			if ( 56 <= i && i < 309) {
		global.vfx_2.cy[1][i] = 20 + 300 * (n * (i - 56));
		
	} else if (309 <= i && i < 562) {
		global.vfx_2.cy[1][i] = 20 + 300 * (1 - n * (i - 309));
		
	} else {
		global.vfx_2.cy[1][i] = 20;
	}
	
	// g0 0 112 - 365 - 618
			if (112 <= i && i < 365) {
		global.vfx_2.cy[0][i] = 20 + 300 * (n * (i - 112));
		
	} else if (365 <= i && i < 618) {
		global.vfx_2.cy[0][i] = 20 + 300 * (1 - n * (i - 365));
		
	} else {
		global.vfx_2.cy[0][i] = 20;
	}
	
	// opacity
	n = 1 / 56;
	
	// g2 0 - 56 450 - 506 618
			if (i < 56) {
		global.vfx_2.opacity[2][i]	= 0.33 + 0.67 * n * i;

	} else if ( 56 <= i && i < 450) {
		global.vfx_2.opacity[2][i]	= 1;
		
	} else if (450 <= i && i < 506) {
		global.vfx_2.opacity[2][i]	= 1 - 0.67 * n * (i - 450);
		
	} else {
		global.vfx_2.opacity[2][i]	= 0.33;
	}
	
	// g1 0 56 - 112 506 - 562 618
			if ( 56 <= i && i < 112) {
		global.vfx_2.opacity[1][i]	= 0.33 + 0.67 * n * (i - 56);

	} else if (112 <= i && i < 506) {
		global.vfx_2.opacity[1][i]	= 1;
		
	} else if (506 <= i && i < 562) {
		global.vfx_2.opacity[1][i]	= 1 - 0.67 * n * (i - 506);
		
	} else {
		global.vfx_2.opacity[1][i]	= 0.33;
	}
	
	// g0 0 112 - 168 562 - 618
			if (112 <= i && i < 168) {
		global.vfx_2.opacity[0][i]	= 0.33 + 0.67 * n * (i - 112);

	} else if (168 <= i && i < 562) {
		global.vfx_2.opacity[0][i]	= 1;
		
	} else if (562 <= i && i < 618) {
		global.vfx_2.opacity[0][i]	= 1 - 0.67 * n * (i - 562);
		
	} else {
		global.vfx_2.opacity[0][i]	= 0.33;
	}
}

function voicePlay() {
	
	global.voice.seq += 1;
	
	if (global.voice.setlist.length <= global.voice.seq) {
		
		global.voice.seq = -1;
		global.voice.setlist = [];
		
	} else {
		
		id = global.voice.setlist[global.voice.seq] + '';
		playSE(id);
		global.voice.wait = getDurationSE(id);
	}
}

window.requestAnimationFrame = (function(){
										 
	return window.requestAnimationFrame	||
		window.webkitRequestAnimationFrame	||
		window.mozRequestAnimationFrame		||
		window.oRequestAnimationFrame		||
		window.msRequestAnimationFrame		||
		function(callback, element){
			window.setTimeout(callback, 1000 / 60);
		};
})();


function getColorRGBa(hm, opacity) {

	return 'rgba('
		+ parseInt(global.color[hm].substring(1,3), 16)+','
		+ parseInt(global.color[hm].substring(3,5), 16)+','
		+ parseInt(global.color[hm].substring(5,7), 16)+','
		+ opacity +')';
}

function getBGColorRGBa(hm, opacity) {

	return 'rgba('
		+ parseInt(global.bgColor[hm].substring(1,3), 16)+','
		+ parseInt(global.bgColor[hm].substring(3,5), 16)+','
		+ parseInt(global.bgColor[hm].substring(5,7), 16)+','
		+ opacity +')';
}

function modDigital(hour,minute) {
	
	var i,t,tt,cl,html;
	
	var b_gogo = (13 <= hour);
	
	if (global.data.am_pm && b_gogo) {
		t  = ('00' + (hour - 12)).slice(-2);
		
	} else {
		t  = ('00' + hour).slice(-2);
		
	}
		t += ':';
		t += ('00' + minute).slice(-2);

	var html = '';
	var tt = '';
	var cl = '';
	
	global.date = t + '';
	
	for (i=0; i<5; i++) {
		
		tt = t.substr(i,1);
		cl = '';
		
		if (i == 0 && tt == '0') cl = 'zero';
		if (i == 2 || i == 5) cl = 'colon';
		
		html += '<span class="'+cl+'">'+tt+'</span>';
	}
	
	$('#digital').html(html);
	
	if (global.data.am_pm) {
		$('#digital_sub').text(b_gogo ? 'P M' : 'A M');
	} else {
		$('#digital_sub').text('');
	}
	
	global.dateBefore = global.date + '';
}

function modColor(hm) {
	
	var t, n = hm;
	var color	= global.color[n]+'';
	var bgColor	= global.bgColor[n]+'';
	
	$('html, body').css('background-color', bgColor);
	
	t  = '1px 0 0 '		+ bgColor;
	t += ',0 1px 0 '	+ bgColor;
	t += ',-1px 0 0 '	+ bgColor;
	t += ',0 -1px 0 '	+ bgColor;
	t += ',0 0 0.1em '	+ bgColor;
	
	$('#digital, #digital_sub, .mordal')
		.css('color', color)
		.css('text-shadow', t);
		
	$('.mordal button')
		.css('color', color);
		
	$('#second polygon').attr('fill', color);
	
	$('#wrap_parts svg.fill circle, svg.fill path, svg.fill_nav polygon')
		.attr('fill',  color);
	
	$('#wrap_parts svg.stroke circle').attr('stroke', color);
	
	$('svg stop').attr('stop-color', color);
	
	$('.mordal').css('background-color', getBGColorRGBa(n, 0.87));
	
	t = 'inset 0 0 0.2em ' + getColorRGBa(n, 0.5);
	
	$('.wrap_toggle, .wrap_number_input').css('box-shadow', t);
}

function interval() {

	var b,i,n,t,a,len,key;

	var d = new Date();
	
	var hour   = d.getHours();
	var minute = d.getMinutes();
	var second = d.getSeconds();
	var frame  = (d.getMilliseconds() / 1000 * 60) >> 0;
	var sec12  = second / 12 >> 0;
	var time   = d.getTime();
	
	var deg;
	var deg_hour   = global.deg[hour   * 300 + minute * 5 + sec12];
	var deg_minute = global.deg[minute *  60 + second];
	var deg_second = global.deg[second *  60 + frame ];

	$('#hour')  .css('transform', 'rotate('+ deg_hour   +'deg)');
	$('#minute').css('transform', 'rotate('+ deg_minute +'deg)');
	$('#second').css('transform', 'rotate('+ deg_second +'deg)');
	
	var b_gogo = (13 <= hour);
	
	var html = '';
	var tt = '';
	var cl = '';
	
	if (
		(second == 0 && frame == 0)
	||	time - global.beforeTime > 15000
	) {
		
		modDigital(hour, minute);
		
		n = hour * 60 + minute;
		
		modColor(n);
		
		var b_night = (
			!global.data.nightplay
		&&	(
				n < global.data.morning.hm + 60
			||	global.data.night.hm + 60 < n
			)
		);
		
		var b_into_night = (
			!global.data.nightplay
		&&	(global.data.night.hm + 60) % (60 * 24) == n			
		);
		
		// 音声出力
		if (minute % 5 == 0
		&&	global.voiceplay
		&&	!b_night
		) {
			if (!global.data.melomute && b_into_night) {
				global.voice.setlist = ['night'];
				
			} else {
				global.voice.setlist = $.copy(
											  
					global.data.am_pm
						? global.voice.l12['h'+hour]['m'+minute]
						: global.voice.l24['h'+hour]['m'+minute]
				);
			}
			
			// 0,15,30,45の場合は、メロディーを積む
			if (minute % 15 == 0) {
				
				if (!global.data.melomute && !b_into_night) {
					
					global.voice.setlist.unshift('a' + minute);
				}
			}
			global.voice.seq = -1;
			voicePlay();
		}
		
		// 視覚効果
		if (minute % 5 == 0) {
			
			if (minute % 15 == 0) {
				
				// 15,30,45の場合は、画面効果1を設定する
				if (minute != 0) {
					
					$('#vfx0, #vfx1')
						.css('transform', 'rotate('+ (minute * 6) +'deg)');
					
					global.vfx_1.double = (minute == 30);
					global.vfx_1.max_seq = (minute == 30) ? 95 : 60;
					global.vfx_1.seq = 0;
					global.vfx_0.seq = 0;
					
				} else {
				// 00の場合は、画面効果2を設定する
					global.vfx_2.seq = 0;						
				}
				
			} else if (minute % 5 == 0) { // 15の公倍数ではない場合、画面効果0を設定する
				global.vfx_0.seq = 0;
			}
		}
	}
	
	if (global.voice.wait > 0) {
		
		global.voice.wait--;
		
		if (global.voice.wait == 0) voicePlay();
	}
	
	if (!global.b_audio_play) {
		
		if (audio.is_play()) {

			$('#voice_loading').hide();

			global.b_audio_play = true;
			
			if (global.voiceplay) {
				$('#voice_on').show();
			} else {
				$('#voice_off').show();
			}
		} else { // ローディング表示回転
			var deg_loading = global.deg[(second % 4) * 900 + frame * 15];
			$('#voice_loading').css('transform', 'rotate('+ deg_loading +'deg)');
		}
	}
	
	// 画面効果0(00以外)
	if (-1 < global.vfx_0.seq) {
		
		$('#index'+ (minute / 5 >> 0) +' circle').attr('fill-opacity'
			, global.vfx_0.opacity[global.vfx_0.seq]);
		
		global.vfx_0.seq++;
		if (global.vfx_0.max_seq < global.vfx_0.seq) {
			global.vfx_0.seq = -1;
		}
	}
	
	// 画面効果1(15,30,45)
	if (-1 < global.vfx_1.seq) {
		
		if (global.vfx_1.seq <= 60) {
		
			$('#vfx0 circle').attr('r'
				, global.vfx_1.r[global.vfx_1.seq]);
			
			$('#vfx0 circle').attr('cy'
				, global.vfx_1.cy[global.vfx_1.seq]);
			
			$('#vfx0 circle').attr('stroke-opacity'
				, global.vfx_1.opacity[global.vfx_1.seq]);
		}
		
		if (global.vfx_1.double && 35 <= global.vfx_1.seq) {
		
			$('#vfx1 circle').attr('r'
				, global.vfx_1.r[global.vfx_1.seq - 35]);
			
			$('#vfx1 circle').attr('cy'
				, global.vfx_1.cy[global.vfx_1.seq - 35]);
			
			$('#vfx1 circle').attr('stroke-opacity'
				, global.vfx_1.opacity[global.vfx_1.seq - 35]);
		}
		
		global.vfx_1.seq++;
		if (global.vfx_1.max_seq < global.vfx_1.seq) {
			global.vfx_1.seq = -1;
		}
	}

	// 画面効果2(00)
	if (-1 < global.vfx_2.seq) {
		
		n = 360 / global.vfx_2.max_seq;
		
		for (i=0; i<12; i++) {
			
			key = i % 3;
			deg = i * 30;
			
			$('#index'+i).css('transform'
				, 'rotate('+ ((deg + n * global.vfx_2.seq) % 360) +'deg)');

			$('#index'+i+' circle')
			.attr('cy'
				, global.vfx_2.cy[key][global.vfx_2.seq])
			
			.attr('fill-opacity'
				, global.vfx_2.opacity[key][global.vfx_2.seq]);
		}		
		
		global.vfx_2.seq++;
		if (global.vfx_2.max_seq < global.vfx_2.seq) {
			global.vfx_2.seq = -1;
		}
	}
	
	global.beforeTime = time+0;
	
	requestAnimationFrame(interval);
}

interval();