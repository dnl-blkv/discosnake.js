define([
		'./timeUtils'
	],
	function (
		timeUtils
		) {
		var timeNow = timeUtils.timeNow;

		function Manipulator() {

			this.keyDownListener = null;
			this.keyDownListenerArguments = null;
			this.keyUpListener = null;
			this.keyUpListenerArguments = null;
			this.keysPressed = {};
		}

		Manipulator.prototype.isKeyDown = function (keyCode) {
			return this.keysPressed[keyCode];
		}

		Manipulator.prototype.setKeyDownListener = function () {
			var args = Array.prototype.slice.call(arguments);

			this.keyDownListener = args[0];
			this.keyDownListenerArguments = args.slice(1, args.length);

			var manipulator = this;
			window.addEventListener('keydown', function(event) { manipulator.onKeyDown(event); }, false);

		}

		Manipulator.prototype.onKeyDown = function (event) {
			this.keysPressed[event.keyCode] = timeNow();

			var keyDownListenerArguments = Array.prototype.slice.call(this.keyDownListenerArguments);
			keyDownListenerArguments.push(event);

			this.keyDownListener.apply(null, keyDownListenerArguments);
		}

		Manipulator.prototype.setKeyUpListener = function () {
			var args = Array.prototype.slice.call(arguments);

			this.keyUpListener = args[0];
			this.keyUpListenerArguments = args.slice(1, args.length);

			var manipulator = this;
			window.addEventListener('keyup', function(event) { manipulator.onKeyUp(event); }, false);
		}

		Manipulator.prototype.onKeyUp = function (event) {
			delete this.keysPressed[event.keyCode];

			var keyUpListenerArguments = Array.prototype.slice.call(this.keyUpListenerArguments);
			keyUpListenerArguments.push(event);

			this.keyUpListener.apply(keyUpListenerArguments);
		}

		return Manipulator;
	});