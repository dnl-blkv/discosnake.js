define([
		'game/CommandCode',
		'input/Controls',
		'../../input/KeyCode'
	],
	function (
		CommandCode,
		Controls,
		KeyCode
		) {

		function createDefaultControls () {
			var defaultControls = new Controls();

			// Set up the controls
			defaultControls.bindKeyDown(KeyCode.LEFT, CommandCode.TURN_SNAKE_LEFT);
			defaultControls.bindKeyDown(KeyCode.UP, CommandCode.TURN_SNAKE_UP);
			defaultControls.bindKeyDown(KeyCode.RIGHT, CommandCode.TURN_SNAKE_RIGHT);
			defaultControls.bindKeyDown(KeyCode.DOWN, CommandCode.TURN_SNAKE_DOWN);
			defaultControls.bindKeyDown(KeyCode.SPACE, CommandCode.TOGGLE_PAUSE);
			defaultControls.bindKeyDown(KeyCode.R, CommandCode.RESET_GAME);

			return defaultControls;
		}

		return createDefaultControls();
	});