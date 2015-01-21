define([
		'game/CommandCode',
		'engine/input/Controls',
		'engine/input/KeyCode'
	],
	function (
		CommandCode,
		Controls,
		KeyCode
		) {

		function createInvertedControls () {
			var invertedControls = new Controls();

			// Set up the controls
			invertedControls.bindKeyDown(KeyCode.LEFT, CommandCode.TURN_SNAKE_RIGHT);
			invertedControls.bindKeyDown(KeyCode.UP, CommandCode.TURN_SNAKE_DOWN);
			invertedControls.bindKeyDown(KeyCode.RIGHT, CommandCode.TURN_SNAKE_LEFT);
			invertedControls.bindKeyDown(KeyCode.DOWN, CommandCode.TURN_SNAKE_UP);
			invertedControls.bindKeyDown(KeyCode.SPACE, CommandCode.TOGGLE_PAUSE);
			invertedControls.bindKeyDown(KeyCode.R, CommandCode.RESET_GAME);

			return invertedControls;
		}

		return createInvertedControls();
	});