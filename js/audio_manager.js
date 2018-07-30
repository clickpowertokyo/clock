


var audio_manager = function audio_manager() {


	// initialize
	
	var wait_per_second = 131072;// wait ratio

	var se_vol  = 8; // 0-8
	var bgm_vol = 0; // 0-8
	
	
	// BufferLoader by W3C
	
	function BufferLoader(context, urlList, callback) {
	  this.context = context;
	  this.urlList = urlList;
	  this.onload = callback;
	  this.bufferList = new Array();
	  this.loadCount = 0;
	}
	
	BufferLoader.prototype.loadBuffer = function(url, index) {
		
		var request = new XMLHttpRequest();
		request.open("GET", url, true);
		request.responseType = "arraybuffer";
		
		var loader = this;
		
		request.onload = function() {
			
			loader.context.decodeAudioData(
										   
				request.response,
				
				function(buffer) {
					
					if (!buffer) {
						console.error('error decoding file data: ' + url);
						return;
					}
					
					console.log('audio loaded: '+url);
					
					loader.bufferList[index] = buffer;
					
					total_bytes += buffer.length;
					
					if (++loader.loadCount == loader.urlList.length) {
						
						loader.onload(loader.bufferList);
						
						wait = total_bytes / wait_per_second * 1000;
						
						time_wait = setTimeout(allow_play, wait);
					}
				},
				
				function(error) {
					
					console.error('decodeAudioData error', error);
				}
			);
		}
			
		request.onerror = function() {
			
			console.error('BufferLoader: XHR error');
		}
		
		request.send();
	}
	
	BufferLoader.prototype.load = function() {
		for (var i = 0; i < this.urlList.length; ++i)
		this.loadBuffer(this.urlList[i], i);
	}
	
	function allow_play() {
		
		clearTimeout(time_wait);
		b_play = true;
	}
	
	
	var total_bytes = 0;
	var wait = 0, time_wait;
	
	var b_audio = true;
	var b_load  = false;
	var b_play  = false;
	
	this.is_audio = function() { return b_audio; }
	
	this.is_load  = function() { return b_load; }
	
	this.is_play  = function() { return b_play; }

	var audio_list = [];

	var audio_context, audio_bufferLoader, audio_gainNode, audio_source;
	var se_gainNode, se_source;
	var se_gainNode_0, se_source_0;
	var se_gainNode_1, se_source_1;
	var bgm_gainNode, bgm_source;
	
	var current_se = -1;
	var current_se_0 = -1;
	var current_se_1 = -1;
	var current_bgm = -1;
	
	var temp;
	
	var ua = navigator.userAgent;
	
	
	
	try {
	
		audio_context = new AudioContext();
	
	} catch(e) {
		
		try {
			
			audio_context = new webkitAudioContext();
			
		} catch(e) {
			
			b_audio = false;
		}
	}
	
	
	if (b_audio) {
	
		audio_context.createGain = audio_context.createGain || audio_context.createGainNode;
		se_gainNode = audio_context.createGain();
		se_gainNode_0 = audio_context.createGain();
		se_gainNode_1 = audio_context.createGain();
		bgm_gainNode = audio_context.createGain();
	}
	
	
	var len_bgm, len_se, path;
	
	var duration = [], se_layer = [], loop = [];
	
	this.init = function (bgm, se) {
		
		b_load = false;
		
		if (!b_audio) { return; }
		
		len = bgm.length;
		
		for (i=0; i<len; i++) {
			
			t  = '';
			t += (typeof bgm[i].path != 'undefined') ? bgm[i].path : 'sound/bgm/';
			t += (t.slice(-1) != '/') ? '/' : '';
			t += bgm[i].name+'.mp3';
			
			audio_list[i] = t+'';
			duration[i] = bgm[i].duration+0;
			loop[i] = (bgm[i].duration == true);
		}
		
		len_bgm = len+0;
		
		
		len = se.length;
		
		for (i=0; i<len; i++) {

			t  = '';
			t += (typeof se[i].path != 'undefined') ? se[i].path : 'sound/se/';
			t += (t.slice(-1) != '/') ? '/' : '';
			t += se[i].name+'.mp3';

			audio_list[i+len_bgm] = t+'';
			duration[i+len_bgm] = se[i].duration+0;
			loop[i+len_bgm] = (se[i].duration == true);
			se_layer[i] = se[i].layer+0;
		}
		
		len_se = len+0;
	}
	
	
	
	this.start_load = function () {
		
		if (b_audio && !b_load) {

			b_load = true;
			console.log('=== start loading ===');

			audio_bufferLoader = new BufferLoader(audio_context, audio_list, function(){
																					  
			});

			audio_bufferLoader.load();
		}
	}

	
	
	this.se = function(n) {
		
		if (!b_audio || !b_play) return;
		
		if (-1 < n && n < len_se) {
			
			switch(se_layer[n]) {
				
				case -1:
					if (current_se_0 > -1) {se_source_1.stop(current_se_0 + len_bgm);}
					if (current_se_1 > -1) {se_source_1.stop(current_se_1 + len_bgm);}
					current_se_0 = -1;
					current_se_1 = -1;
					break;
				
				case 0: case 2:
				
					if (current_se_0 > -1) {se_source_0.stop(current_se_0 + len_bgm);}
					
					if (se_layer[n] == 2 && current_se_1 != -1) {
						se_source_1.stop(current_se_1 + len_bgm);
						current_se_1 = -1;
					}
					
					se_source_0 = audio_context.createBufferSource();
					se_source_0.buffer = audio_bufferLoader.bufferList[n + len_bgm];
					
					if (duration[n + len_bgm] > 0 && loop[n + len_bgm]) {
						
						se_source_0.loopStart = 0;
						se_source_0.loopEnd = duration[n + len_bgm] / 60;
						se_source_0.loop = true;
					}
					
					se_source_0.connect(se_gainNode_0);
					se_gainNode_0.gain.value = 0.5;
					se_gainNode_0.connect(audio_context.destination);
			
					se_source_0.start = se_source_0.start || se_source_0.noteOn;
					se_source_0.stop  = se_source_0.stop  || se_source_0.noteOff;
					
					se_source_0.start(n + len_bgm);
					current_se_0 = n+0;
					break;
				
				case 1:
				
					if (current_se_1 > -1) {se_source_1.stop(current_se_1 + len_bgm);}
		
					se_source_1 = audio_context.createBufferSource();
					se_source_1.buffer = audio_bufferLoader.bufferList[n + len_bgm];
					
					if (duration[n + len_bgm] > 0 && loop[n + len_bgm]) {
						
						se_source_1.loopStart = 0;
						se_source_1.loopEnd = duration[n + len_bgm] / 60;
						se_source_1.loop = true;
					}
					
					se_source_1.connect(se_gainNode_1);
					se_gainNode_1.gain.value = 0.5;
					se_gainNode_1.connect(audio_context.destination);
			
					se_source_1.start = se_source_1.start || se_source_1.noteOn;
					se_source_1.stop  = se_source_1.stop  || se_source_1.noteOff;
					
					se_source_1.start(n + len_bgm);
					current_se_1 = n+0;
					break;
				
			}
			
			current_se = n+0;
		}
	}
	
	
	
	this.bgm = function (n) {
		
		if (!b_audio || !b_play) return;
		
		if (-1 < n && n < len_bgm) {

			if (current_bgm > -1) {bgm_source.stop(current_bgm);}

			bgm_source = audio_context.createBufferSource();
			bgm_source.buffer = audio_bufferLoader.bufferList[n];
			
			if (duration[n] > 0 && loop[n]) {
				
				bgm_source.loopStart = 0;
				bgm_source.loopEnd = duration[n] / 60;
				bgm_source.loop = true;
			}
			
			bgm_source.connect(bgm_gainNode);
			bgm_gainNode.gain.value = 0.5;
			bgm_gainNode.connect(audio_context.destination);
	
			bgm_source.start = bgm_source.start || bgm_source.noteOn;
			bgm_source.stop  = bgm_source.stop  || bgm_source.noteOff;
	
			bgm_source.start(n);
			
			current_bgm = n+0;
		}
	}
	
	this.se_volume = function (n) {
		
		if (n < 0 || 8 < n) return false;
		
		se_vol = n;
		
		se_gainNode.gain.value = se_vol*0.125;
		se_gainNode_0.gain.value = se_vol*0.125;
		se_gainNode_1.gain.value = se_vol*0.125;
	}
	
	this.bgm_volume = function (n) {
		
		if (n < 0 || 8 < n) return false;
		
		bgm_vol = n;
		
		bgm_gainNode.gain.value = bgm_vol*0.125;
//		bgm_gainNode_0.gain.value = bgm_vol*0.125;
//		bgm_gainNode_1.gain.value = bgm_vol*0.125;
	}
}