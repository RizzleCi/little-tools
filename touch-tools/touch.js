// 输入 参数1：dom 参数2：{事件名：执行的函数}

var touch = function (ele,eventSign) {
	var sign = {
		startTime : 0,
		startX : 0,
		startY : 0,
		timer: null
	}

	function touchStart(e) {
		sign.startTime = new Date()
		sign.startX = e.touches[0].pageX
		sign.startY = e.touches[0].pageY
		sign.timer = setTimeout(function () {
			if (typeof(eventSign.longtap) == 'function') {
				eventSign.longtap()
			}
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
			if (typeof(eventSign.right) == 'function') {
				eventSign.right()
			}
		}else if (moveX < -50) {
			if (typeof(eventSign.left) == 'function') {
				eventSign.left()
			}
		}
		if ( moveY > 50 ) {
			if (typeof(eventSign.down) == 'function') {
				eventSign.down()
			}
		}else if (moveY < -50) {
			if (typeof(eventSign.up) == 'function') {
				eventSign.up()
			}
		}
		if ( time < 300 ) {
			if (typeof(eventSign.tap) == 'function') {
				eventSign.tap()
			}
			clearTimeout(sign.timer)
		}
	}

	ele.addEventListener('touchstart',touchStart,false)
	ele.addEventListener('touchmove',touchMove,false)
	ele.addEventListener('touchend',touchEnd,false)
}
