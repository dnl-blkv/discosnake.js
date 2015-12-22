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

		function createInvertedControls () {
			var invertedControls = new Controls();

			// Set up the controls
			invertedControls.bindKeyDown(KeyCode.LEFT, CommandCode.DIRECT_SNAKE_RIGHT);
			invertedControls.bindKeyDown(KeyCode.UP, CommandCode.DIRECT_SNAKE_DOWN);
			invertedControls.bindKeyDown(KeyCode.RIGHT, CommandCode.DIRECT_SNAKE_LEFT);
			invertedControls.bindKeyDown(KeyCode.DOWN, CommandCode.DIRECT_SNAKE_UP);
			invertedControls.bindKeyDown(KeyCode.SPACE, CommandCode.TOGGLE_PAUSE);

			return invertedControls;
		}

		return createInvertedControls();
	});