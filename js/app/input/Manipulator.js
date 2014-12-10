define([
		'./InputEvent',
		'./InputMap',
		'./KeyCode',
		'utils/timeUtils'
	],
	function (
		InputEvent,
		InputMap,
		KeyCode,
		timeUtils
		) {
		var timeNow = timeUtils.timeNow;

		function Manipulator() {
			this.nullCommandCode = 'nullCommand';
			this.commandListener = null;
			this.commandListenerArguments = null;
			this.inputMap = new InputMap();
			this.keysPressed = {};

			var manipulator = this;
			window.addEventListener(InputEvent.KEY_DOWN, function(event) { manipulator.onKeyDown(event); }, false);
			window.addEventListener(InputEvent.KEY_UP, function(event) { manipulator.onKeyUp(event); }, false);
		}

		/**
		 * Check if a given key is down.
		 * @param keyCode
		 * @returns {*}
		 */
		Manipulator.prototype.isKeyDown = function (keyCode) {
			return this.keysPressed[keyCode];
		}

		Manipulator.prototype.setCommandListener = function () {
			var args = Array.prototype.slice.call(arguments);

			this.commandListener = args[0];
			this.commandListenerArguments = args.slice(1, args.length);
		}

		Manipulator.prototype.onKeyDown = function (event) {
			this.keysPressed[event.keyCode] = timeNow();

			sendCommand(this, event);
		}

		Manipulator.prototype.onKeyUp = function (event) {
			this.keysPressed[event.keyCode] = 0;

			sendCommand(this, event);
		}

		Manipulator.prototype.bindKeyDown = function (keyCode, commandCode) {
			this.inputMap.bindKeyDown(keyCode, commandCode);
		}

		Manipulator.prototype.unbindKeyDown = function (keyCode) {
			this.inputMap.unbindKeyDown(keyCode);
		}

		Manipulator.prototype.bindKeyUp = function (keyCode, commandCode) {
			this.inputMap.bindKeyUp(keyCode, commandCode);
		}

		Manipulator.prototype.unbindKeyUp = function (keyCode) {
			this.inputMap.unbindKeyUp(keyCode);
		}

		Manipulator.prototype.setNullCommandCode = function (nullCommandCode) {
			this.nullCommandCode = nullCommandCode;
		}

		function getCommandCode (manipulator, event) {
			var keyCode = event.keyCode;
			var type = event.type;
			var commandCode = manipulator.nullCommandCode;
			var inputMap = manipulator.inputMap;

			switch(type) {
				case InputEvent.KEY_DOWN:
					commandCode = inputMap.getKeyDownBinding(keyCode);
					break;
				case InputEvent.KEY_UP:
					commandCode = inputMap.getKeyUpBinding(keyCode);
					break;
				default:
					break;
			}

			return commandCode;
		}

		function sendCommand (manipulator, event) {

			var commandListener = manipulator.commandListener;

			// Add the command code to the command listener arguments
			var commandCode = getCommandCode(manipulator, event);

			if (commandCode !== this.nullCommandCode) {
				var commandListenerArguments = Array.prototype.slice.call(manipulator.commandListenerArguments);
				commandListenerArguments.push(commandCode);
				commandListener.apply(commandListener, commandListenerArguments);
			}
		}

		return Manipulator;
	});