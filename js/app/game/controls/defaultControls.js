define([
		'game/CommandCode',
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
			defaultControls.bindKeyDown(KeyCode.R, CommandCode.RESET_GAME);

			// TODO: Separate menu actions into different control set
			defaultControls.bindKeyDown(KeyCode.W, CommandCode.PREVIOUS_MENU_ITEM);
			defaultControls.bindKeyDown(KeyCode.S, CommandCode.NEXT_MENU_ITEM);
			defaultControls.bindKeyDown(KeyCode.ENTER, CommandCode.SELECT_MENU_ITEM);

			return defaultControls;
		}

		return createDefaultControls();
	});