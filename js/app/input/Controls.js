define([
		'./KeyCode'
	],
	function (
		KeyCode
		) {
		'use strict';

		function Controls () {
			this.keyDownCommandMap = {};
			this.keyUpCommandMap = {};
		}

		Controls.prototype.bindKeyDown = function (keyCode, commandCode) {
			this.keyDownCommandMap[keyCode] = commandCode;
		}

		Controls.prototype.getKeyDownBinding = function (keyCode) {
			return this.keyDownCommandMap[keyCode];
		}

		Controls.prototype.unbindKeyDown = function (keyCode) {
			this.keyDownCommandMap[keyCode] = KeyCode.NULL_KEY;
		}

		Controls.prototype.bindKeyUp = function (keyCode, commandCode) {
			this.keyUpCommandMap[keyCode] = commandCode;
		}

		Controls.prototype.getKeyUpBinding = function (keyCode) {
			return this.keyUpCommandMap[keyCode];
		}

		Controls.prototype.unbindKeyUp = function (keyCode) {
			this.keyUpCommandMap[keyCode] = KeyCode.NULL_KEY;
		}

		return Controls;
	});