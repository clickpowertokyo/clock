<!DOCTYPE HTML>
<html lang="ja-JP">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<title>Y-clock 時刻読上機能つきレスポンシブ時計</title>

<meta name="description" content="PC・スマホ・タブレットで使える時計です。5分毎の時刻読み上げ機能あり、無料＆広告表示はありません。">

<meta property="og:site_name" content="Y-clock 時刻読上機能つきレスポンシブ時計">
<meta property="og:title" content="Y-clock 時刻読上機能つきレスポンシブ時計">
<meta property="og:description" content="PC・スマホ・タブレットで使える時計です。5分毎の時刻読み上げ機能あり、無料＆広告表示はありません。">

<meta property="og:type" content="article">
<meta property="og:url" content="https://clock.yamato.website/">
<meta property="og:image" content="https://clock.yamato.website/img/key_visual.jpg">
<meta property="fb:admins" content="100000025947091" >
<meta name="twitter:site" content="ClickpowerTokyo">
<meta name="twitter:card" content="summary">
<meta name="twitter:creator" content="@ClickpowerTokyo">
<meta name="twitter:description" content="PC・スマホ・タブレットで使える時計です。5分毎の時刻読み上げ機能あり、無料＆広告表示はありません。">
<meta name="twitter:image:src" content="https://clock.yamato.website/img/key_visual.jpg">

<meta name="viewport" content="width=device-width, user-scalable=0">
<meta name="apple-mobile-web-app-capable" content="yes">

<link rel="canonical" href="https://clock.yamato.website/">

<link href="css/style.css?r=<?= time() ?>" rel="stylesheet" type="text/css">

<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/get_user-agent.js"></script>
<script type="text/javascript" src="js/cross_click.js"></script>
<script type="text/javascript" src="js/audio_manager.js?r=<?= time() ?>"></script>
</head>

<body>

<div id="wrap_clock">
<div id="wrap_parts">

<svg id="hour" class="parts fill stroke" viewBox="0 0 640 640">
<g display="none" overflow="visible" y="0" x="0" width="100%" height="100%"></g>
<defs>

<linearGradient id="fill_hour" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stop-color="#fff" stop-opacity="0.67"></stop>
<stop offset="20%" stop-color="#fff" stop-opacity="0.18"></stop>
<stop offset="100%" stop-color="#fff" stop-opacity="0.18"></stop>
</linearGradient>

</defs>  
<polygon fill="url(#fill_hour)" stroke="none" points="320,320 298,180 320,160 342,180 320,320">
</svg>

<svg id="minute" class="parts fill stroke" viewBox="0 0 640 640">
<g display="none" overflow="visible" y="0" x="0" width="100%" height="100%"></g>
<defs>

<linearGradient id="fill_minute" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stop-color="#fff" stop-opacity="0.18"></stop>
<stop offset="6%" stop-color="#fff" stop-opacity="0.18"></stop>
<stop offset="12%" stop-color="#fff" stop-opacity="0.67"></stop>
<stop offset="50%" stop-color="#fff" stop-opacity="0.18"></stop>
<stop offset="100%" stop-color="#fff" stop-opacity="0.18"></stop>
</linearGradient>

</defs>  
<polygon fill="url(#fill_minute)" stroke="none" points="320,0 330,20 321,40 345,180 321,320 338,180 320,165 301,180 319,320 295,180 319,40 310,20 320,0">
</svg>

<svg id="second" class="parts fill" viewBox="0 0 640 640">
<g display="none" overflow="visible" y="0" x="0" width="100%" height="100%"></g>
<polygon fill="#fff" stroke="none" fill-opacity="0.5" points="320,40 321,180 320,320 319,180 320,40">
</svg>

<?php 

for ($i=0; $i<12; $i++): 

	$r = ($i % 3 == 0) ? 10 : 5;
?>

<svg id="index<?= $i ?>" class="parts fill" viewBox="0 0 640 640" style="transform:rotate(<?= $i * 30 ?>deg)">
<g display="none" overflow="visible" y="0" x="0" width="100%" height="100%"></g>
<circle fill="#fff" stroke="none" fill-opacity="0.33" r="<?= $r ?>" cx="320" cy="20">
</svg>

<?php endfor; ?>


<svg id="vfx0" class="parts stroke" viewBox="0 0 640 640">
<g display="none" overflow="visible" y="0" x="0" width="100%" height="100%"></g>
<circle fill="none" stroke="#fff" stroke-opacity="0" stroke-size="2" r="10" cx="320" cy="20">
</svg>

<svg id="vfx1" class="parts stroke" viewBox="0 0 640 640">
<g display="none" overflow="visible" y="0" x="0" width="100%" height="100%"></g>
<circle fill="none" stroke="#fff" stroke-opacity="0" stroke-size="2" r="10" cx="320" cy="20">
</svg>



<div id="digital" class="font1"></div>
<div id="digital_sub" class="font1"></div>

</div><!-- wrap_parts -->
</div><!-- wrap_clock -->





<!-- navigations -->

<svg id="def_fill">
<defs>
<radialGradient id="bubble_edge" cx="0.5" cy="0.5" fx="0.5" fy="0.5" r="0.5">
<stop offset="0%" stop-color="#fff" stop-opacity="0.0"></stop>
<stop offset="90%" stop-color="#fff" stop-opacity="0.0"></stop>
<stop offset="100%" stop-color="#fff" stop-opacity="0.18"></stop>
</radialGradient>
</defs>  
</svg>

<svg id="button_UR" class="nav_UR" viewBox="0 0 512 512">
<path fill="url(#bubble_edge)" d="M256,0C114.609,0,0,114.609,0,256s114.609,256,256,256s256-114.609,256-256S397.391,0,256,0z M256,472
c-119.297,0-216-96.703-216-216S136.703,40,256,40s216,96.703,216,216S375.297,472,256,472z"/>
</svg>

<svg id="button_DL" class="nav_DL" viewBox="0 0 512 512">
<path fill="url(#bubble_edge)" d="M256,0C114.609,0,0,114.609,0,256s114.609,256,256,256s256-114.609,256-256S397.391,0,256,0z M256,472
c-119.297,0-216-96.703-216-216S136.703,40,256,40s216,96.703,216,216S375.297,472,256,472z"/>
</svg>

<svg id="button_DR" class="nav_DR" viewBox="0 0 512 512">
<path fill="url(#bubble_edge)" d="M256,0C114.609,0,0,114.609,0,256s114.609,256,256,256s256-114.609,256-256S397.391,0,256,0z M256,472
c-119.297,0-216-96.703-216-216S136.703,40,256,40s216,96.703,216,216S375.297,472,256,472z"/>
</svg>



<svg id="logo" class="nav_UL fill_nav" viewBox="0 0 640 640">
<polygon fill="#fff" fill-opacity="0.5" points="242.615,201.489 230.356,397.621 240.376,593.755 254.873,397.621 	"/>
<polygon fill="#fff" fill-opacity="0.5" points="241.921,202.558 57.874,118.899 50,50.004 118.895,42.131 	"/>
<polygon fill="#fff" fill-opacity="0.5" points="597.439,40.393 570.423,40.223 553.192,61.54 398.999,77.886 240.829,203.801 404.081,89.041 452.788,107.267 
434.564,155.976 240.829,203.801 439.643,167.132 553.192,61.54 580.585,62.535 	"/>
</svg>

<div id="wrap_voice_loading" class="nav_DR" style="overflow:hidden;">
<svg id="voice_loading" class="fill" viewBox="0 0 512 512">

<path fill="#fff" fill-opacity="0.5" d="M247.5,160v16l48-24l-48-24v16c-32,0-70.039,20.594-89.961,51.578L164,212.75C179.828,181.484,215.5,160,247.5,160z"/>
<path fill="#fff" fill-opacity="0.5" d="M160,264.5h16l-24-48l-24,48h16c0,32,20.586,70.031,51.578,89.969L212.75,348C181.484,332.172,160,296.5,160,264.5z"/>
<path fill="#fff" fill-opacity="0.5" d="M247.5,352v-16l-48,24l48,24v-16c48,0,78.531-20.594,98.469-51.578L335.25,299.25C319.422,330.516,295.5,352,247.5,352z"/>
<path fill="#fff" fill-opacity="0.5" d="M316.422,166.031L299.25,176.75C330.516,192.578,352,216.5,352,264.5h-16l24,48l24-48h-16
C368,216.5,347.406,185.969,316.422,166.031z"/>

</svg></div>

<svg id="voice_off" class="nav_DR fill" viewBox="0 0 512 512" style="display:none;">

<path fill="#fff" fill-opacity="0.5" d="M380.766,365.172L146.844,131.234c-4.312-4.312-11.297-4.312-15.609,0s-4.312,11.266,0,15.594l233.938,233.938
c4.312,4.312,11.297,4.312,15.594,0C385.078,376.469,385.078,369.484,380.766,365.172z"/>
<path fill="#fff" fill-opacity="0.5" d="M352,325.094V166.109c0-19.75-3.828-27.797-20.859-17.812l-97.266,58.672L352,325.094z"/>
<path fill="#fff" fill-opacity="0.5" d="M181.094,208H168c-4.422,0-8,3.578-8,8v80c0,4.422,3.578,8,8,8h67.5l95.641,59.719c3.891,2.281,7.031,3.5,9.656,3.984
L181.094,208z"/>

</svg>

<svg id="voice_on" class="nav_DR fill" viewBox="0 0 512 512" style="display:none;">

<path fill="#fff" fill-opacity="0.5" d="M331.141,148.297L232.156,208H168c-4.422,0-8,3.578-8,8v80c0,4.422,3.578,8,8,8h67.5l95.641,59.719
c17.031,9.969,20.859,1.938,20.859-17.844V166.109C352,146.359,348.172,138.312,331.141,148.297z"/>

</svg>


<svg id="open_menu" class="nav_UR fill" viewBox="0 0 512 512" style="">

<path fill="#fff" fill-opacity="0.5" d="M351.938,224C334.266,224,320,238.297,320,255.969S334.266,288,351.938,288C369.672,288,384,273.641,384,255.969
S369.672,224,351.938,224z"/>
<path fill="#fff" fill-opacity="0.5" d="M255.938,224C238.266,224,224,238.297,224,255.969S238.266,288,255.938,288C273.672,288,288,273.641,288,255.969
S273.672,224,255.938,224z"/>
<path fill="#fff" fill-opacity="0.5" d="M160,224c-17.688,0-32,14.297-32,31.969S142.312,288,160,288c17.656,0,32-14.359,32-32.031S177.656,224,160,224z"/>
</svg>


<svg id="close_menu" class="nav_UR fill_nav" viewBox="0 0 512 512" style="display:none;">
<polygon fill="#fff" fill-opacity="0.5" points="335.188,154.188 256,233.375 176.812,154.188 154.188,176.812 233.375,256 154.188,335.188 176.812,357.812 
256,278.625 335.188,357.812 357.812,335.188 278.625,256 357.812,176.812 "/>
</svg>


<svg id="open_config" class="nav_DL fill fill_nav" viewBox="0 0 512 512">
<path fill="#fff" fill-opacity="0.5" d="M256,144c-61.844,0-112,50.156-112,112s50.156,112,112,112s112-50.156,112-112S317.844,144,256,144z M256,347
	c-50.25,0-91-40.766-91-91c0-50.25,40.75-91,91-91c50.234,0,91,40.75,91,91C347,306.234,306.234,347,256,347z"/>
<path fill="#fff" fill-opacity="0.5" d="M256,272c-8.844,0-16-7.156-16-16s7.156-16,16-16s16,7.156,16,16S264.844,272,256,272z"/>
<polygon fill="#fff" fill-opacity="0.5" points="246.062,257.375 257.391,246.062 287.547,276.219 276.234,287.547 	"/>
<polygon fill="#fff" fill-opacity="0.5" points="234.969,204.453 250.5,200.609 265.219,259.953 249.688,263.797 	"/>
<path fill="#fff" fill-opacity="0.5" d="M373,138.969c-14.625-14.656-38.375-14.656-53.031,0L373,192C387.656,177.359,387.656,153.594,373,138.969z"/>
<path fill="#fff" fill-opacity="0.5" d="M138.984,139c-14.641,14.625-14.641,38.375,0,53.031L192.031,139C177.375,124.344,153.625,124.344,138.984,139z"/>	
</svg>


<svg id="close_config" class="nav_DL fill_nav" viewBox="0 0 512 512" style="display:none;">
<polygon fill="#fff" fill-opacity="0.5" points="335.188,154.188 256,233.375 176.812,154.188 154.188,176.812 233.375,256 154.188,335.188 176.812,357.812 
256,278.625 335.188,357.812 357.812,335.188 278.625,256 357.812,176.812 "/>
</svg>


<!-- navigations -->



<!-- mordal area1 misc -->
<div id="mordal_1" class="mordal" style="display:none">

<h1 class="font1">Y-clock by <a href="https://twitter.com/clickpowertokyo" target="_blank">clickpower</a> <img src="img/clickpower.png" class="pixel" alt="" style="width:1em"></h1>

<hr>

<h2>このサイトは？</h2>

<div class="wrap_text">

<p>PC・スマホ・タブレットで使える時計です。（HTML5 + CSS3 + jQuery）</p>

<p>デジタル表示・アナログ表示に加え、5分ごとに時刻を読み上げます。</p>

<p>さらに毎時0・15・30・45分には視覚効果とサウンドが加わります。</p>

<p>日の出・日の入り・深夜で色が変わります。これにより夜の眠気を妨げません。</p>

<p>作者はこれを使い、朝の支度しながらテレビをつけるのを止め時短もできました。</p>

</div><!-- wrap_text -->


<hr><!-- －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ -->

<h2>ご注意</h2>

<div class="wrap_text">

<p>音声のon/offは右下のスピーカーアイコンで切り替えます。ページ読込直後は音声読込が終わるまで設定できません。スマホの場合、音声読込に時間がかかります。</p>

<p>左下の時計アイコンを押すと各種設定が行えます。設定内容はリロードしてもブラウザに保存されます。</p>

<p>日の出は1時～22時、日の入りは2時～23時、深夜は2時～24時の間で15分単位で時間帯を設定できますが、それぞれ1時間以上開ける必要があります。カレンダーによる自動補正は行っていません。</p>

<p>このサイトの無断転載を固く禁じます。</p>

</div><!-- wrap_text -->


<hr><!-- －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ -->


<div class="wrap_text">

<p class="footer">2018&copy; クリックパワー<br>
時報読み上げ：タカハシ（CeVIO）<br>
チャイム音声：<a href="https://twitter.com/beepboytokyo" target="_blank">BEEPBOY</a>
</p>


</div><!-- wrap_text -->




</div>
<!-- mordal area1 misc -->


<div id="mordal_2" class="mordal" style="display:none">

<div class="config_ui column2">
	<div class="param_name">設定</div>
</div>

<hr>

<div class="config_ui column2">
	<div class="param_name">12時間表示</div>
	<div>
	<span class="wrap_toggle toggle font1" id="am_pm" data-switch="off">
	<span>off</span>
	</span>
	</div>
</div>

<div class="config_ui column2">
	<div class="param_name">メロディー無音</div>
	<div>
	<span class="wrap_toggle toggle font1" id="melomute" data-switch="off">
	<span>off</span>
	</span>
	</div>
</div>

<div class="config_ui column2">
	<div class="param_name">夜間発音</div>
	<div>
	<span class="wrap_toggle toggle font1" id="nightplay" data-switch="off">
	<span>on</span>
	</span>
	</div>
</div>

<hr>

<div class="config_ui column3">
	<div class="param_name">日の出</div>
	<div>
	<span class="wrap_number_input font1">
		<button id="morning_hour_sub" class="sub">－</button>
		<i id="morning_hour">00</i>
		<button id="morning_hour_add" class="add">＋</button>
	</span>
	</div>
	
	<div>
	<span class="wrap_number_input font1">
		<button id="morning_minute_sub" class="sub">－</button>
		<i id="morning_minute">00</i>
		<button id="morning_minute_add" class="add">＋</button>
	</span>
	</div>
</div>

<div class="config_ui column3">
	<div class="param_name">日の入</div>
	<div>
	<span class="wrap_number_input font1">
		<button id="evening_hour_sub" class="sub">－</button>
		<i id="evening_hour">00</i>
		<button id="evening_hour_add" class="add">＋</button>
	</span>
	</div>
	
	<div>
	<span class="wrap_number_input font1">
		<button id="evening_minute_sub" class="sub">－</button>
		<i id="evening_minute">00</i>
		<button id="evening_minute_add" class="add">＋</button>
	</span>
	</div>
</div>

<div class="config_ui column3">
	<div class="param_name">深夜</div>
	<div>
	<span class="wrap_number_input font1">
		<button id="night_hour_sub" class="sub">－</button>
		<i id="night_hour">00</i>
		<button id="night_hour_add" class="add">＋</button>
	</span>
	</div>
	
	<div>
	<span class="wrap_number_input font1">
		<button id="night_minute_sub" class="sub">－</button>
		<i id="night_minute">00</i>
		<button id="night_minute_add" class="add">＋</button>
	</span>
	</div>
</div>

</div>
<!-- mordal2 clock config -->


<script src="https://www.gstatic.com/firebasejs/5.0.4/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBshGsPa9ja2HehcFN8KPRNkBHPehFzFuQ",
    authDomain: "y-clock-fe407.firebaseapp.com",
    databaseURL: "https://y-clock-fe407.firebaseio.com",
    projectId: "y-clock-fe407",
    storageBucket: "",
    messagingSenderId: "1028421533100"
  };
  firebase.initializeApp(config);
</script>

<script type="text/javascript" src="js/script.js?r=<?= time() ?>"></script>
</body>
</html>