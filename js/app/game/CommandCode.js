define([],
	function () {
		'use strict';

		return {
			// Null command
			NULL_COMMAND: 'nullCommand',

			// Snake control commands
			TURN_SNAKE_DOWN: 'turnSnakeDown',
			TURN_SNAKE_LEFT: 'turnSnakeLeft',
			TURN_SNAKE_RIGHT: 'turnSnakeRight',
			TURN_SNAKE_UP: 'turnSnakeUp',

			// Game management commands
			TOGGLE_PAUSE: 'togglePause',

			// Menu navigation commands
			NEXT_MENU_ITEM: 'nextMenuItem',
			PREVIOUS_MENU_ITEM: 'previousMenuItem',
			SELECT_MENU_ITEM: 'selectMenuItem',

			// Menu actions commands
			CONTINUE_GAME: 'continueGame',
			NEW_GAME: 'newGame'
		}
	});