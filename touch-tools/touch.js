// 输入 参数1：dom 参数2：{事件名：执行的函数}

var touch = function (ele,eventSign) {
	var sign = {
		startTime : 0,
		startX : 0,
		startY : 0,
		timer: null
	}
	function addEvent(type) {
		if (typeof(eventSign[type]) == 'function') {
			eventSign[type]()
		}
	}
	function touchStart(e) {
		sign.startTime = new Date()
		sign.startX = e.touches[0].pageX
		sign.startY = e.touches[0].pageY
		sign.timer = setTimeout(function () {
			addEvent('longtap')
		},600)
	}
	function touchMove(e) {
		sign.startTime = 0
		clearTimeout(sign.timer)
	}
	function touchEnd(e) {
		var endX = e.changedTouches[0].pageX
		var endY = e.changedTouches[0].pageY
		var endTime = new Date()
		var moveX = endX - sign.startX
		var moveY = endY - sign.startY
		var time = endTime - sign.startTime
		if ( moveX > 50 ) {
			addEvent('right')
		}else if (moveX < -50) {
			addEvent('left')
		}
		if ( moveY > 50 ) {
			addEvent('down')
		}else if (moveY < -50) {
			addEvent('up')
		}
		if ( time < 300 ) {
			addEvent('tap')
			clearTimeout(sign.timer)
		}
	}

	ele.addEventListener('touchstart',touchStart,false)
	ele.addEventListener('touchmove',touchMove,false)
	ele.addEventListener('touchend',touchEnd,false)
}
