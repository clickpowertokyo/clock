
var cross_click = function() {

	var deviceEvents = {
		Touch     : typeof document.ontouchstart !== 'undefined',
		Pointer   : window.navigator.pointerEnabled,
		MSPointer : window.navigator.msPointerEnabled
	};
	
	var eventNames = {
		start     : deviceEvents.Pointer ? 'pointerdown' : deviceEvents.MSPointer ? 'MSPointerDown' : deviceEvents.Touch ? 'touchstart' : 'mousedown',
		move      : deviceEvents.Pointer ? 'pointermove' : deviceEvents.MSPointer ? 'MSPointerMove' : deviceEvents.Touch ? 'touchmove'  : 'mousemove',
		end       : deviceEvents.Pointer ? 'pointerup'   : deviceEvents.MSPointer ? 'MSPointerUp'   : deviceEvents.Touch ? 'touchend'   : 'mouseup',
		click     : 'click'
	};
	
	this.down	= eventNames.start;
	this.move	= eventNames.move;
	this.up		= eventNames.end;
	
	this.blockDouble = function(target) {
		
		$(target).on(eventNames.end, function(e) {
			
			e.preventDefault();
			return false;
		});
	}
}