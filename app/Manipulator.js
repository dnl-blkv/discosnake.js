define([
		'./timeUtils'
	],
	function (
		timeUtils
		) {
		var timeNow = timeUtils.timeNow;

		function Manipulator() {
			this.keysPressed = {};
			this.lastKeyPressed = 0;
			this.KEY_CODE = {
				LEFT: 37,
				UP: 38,
				RIGHT: 39,
				DOWN: 40
			}

			var manipulator = this;
			window.addEventListener('keyup', function(event) { manipulator.onKeyUp(event); }, false);
			window.addEventListener('keydown', function(event) { manipulator.onKeyDown(event); }, false);
		}

		Manipulator.prototype.isKeyDown = function (keyCode) {
			return this.keysPressed[keyCode];
		}

		Manipulator.prototype.onKeyDown = function (event) {
			this.keysPressed[event.keyCode] = timeNow();
			this.lastKeyPressed = event.keyCode;
			console.log(event.keyCode);
		}

		Manipulator.prototype.getLastKeyPressed = function () {
			return this.lastKeyPressed;
		}

		Manipulator.prototype.onKeyUp = function (event) {
			delete this.keysPressed[event.keyCode];
		}

		return Manipulator;
	});