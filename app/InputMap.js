define([
		'./KeyCode'
	],
	function (
		KeyCode
		) {

		function InputMap () {
			this.keyDownCommandMap = {};
			this.keyUpCommandMap = {};
		}

		InputMap.prototype.bindKeyDown = function (keyCode, commandCode) {
			this.keyDownCommandMap[keyCode] = commandCode;
		}

		InputMap.prototype.getKeyDownBinding = function (keyCode) {
			return this.keyDownCommandMap[keyCode];
		}

		InputMap.prototype.unbindKeyDown = function (keyCode) {
			this.keyDownCommandMap[keyCode] = KeyCode.NULL_KEY;
		}

		InputMap.prototype.bindKeyUp = function (keyCode, commandCode) {
			this.keyUpCommandMap[keyCode] = commandCode;
		}

		InputMap.prototype.getKeyUpBinding = function (keyCode) {
			return this.keyUpCommandMap[keyCode];
		}

		InputMap.prototype.unbindKeyUp = function (keyCode) {
			this.keyUpCommandMap[keyCode] = KeyCode.NULL_KEY;
		}

		return InputMap;
	});