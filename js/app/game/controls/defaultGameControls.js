define([
		'game/commands/CommandCode',
		'engine'
	],
	function (
		CommandCode,
		engine
		) {

		var Controls = engine.input.Controls;
		var KeyCode = engine.input.KeyCode;

		function createDefaultControls () {
			var defaultControls = new Controls();

			// Set up the controls
			defaultControls.bindKeyDown(KeyCode.LEFT, CommandCode.TURN_SNAKE_LEFT);
			defaultControls.bindKeyDown(KeyCode.UP, CommandCode.TURN_SNAKE_UP);
			defaultControls.bindKeyDown(KeyCode.RIGHT, CommandCode.TURN_SNAKE_RIGHT);
			defaultControls.bindKeyDown(KeyCode.DOWN, CommandCode.TURN_SNAKE_DOWN);
			defaultControls.bindKeyDown(KeyCode.SPACE, CommandCode.TOGGLE_PAUSE);

			return defaultControls;
		}

		return createDefaultControls();
	});