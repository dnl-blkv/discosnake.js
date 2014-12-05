define([
	'domReady',
	'./Game'
], function (
	domReady,
	Game
	) {

	// Save the game properties
	var cellSize = 20;
	var fieldWidth = 40;
	var fieldHeight = 30;
	var game;

	var ready = {
		dom: false,
		fonts: false
	}

	domReady(runGame);

	function runGame () {
		game = new Game(cellSize, fieldWidth, fieldHeight);
		game.start();
	}

});