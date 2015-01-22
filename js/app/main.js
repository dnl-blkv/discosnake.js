define([
	'domReady',
	'game'
], function (
	domReady,
	Game
	) {
	'use strict';

	domReady(runGame);

	function runGame () {

		// Set the game parameters
		var cellSize = 20;
		var fieldWidth = 48;
		var fieldHeight = 30;

		// Create a new game instance
		var game = new Game(cellSize, fieldWidth, fieldHeight);

		// Start the game
		game.start();
	}
});