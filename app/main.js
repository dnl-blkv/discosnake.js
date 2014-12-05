define([
	'domReady',
	'./Game'
], function (
	domReady,
	Game
	) {
	// Save the game properties


	var ready = {
		dom: false,
		fonts: false
	}

	domReady(runGame);

	function runGame () {

		var cellSize = 20;


		var fieldWidth = 48;
		var fieldHeight = 30;

		var game = new Game(cellSize, fieldWidth, fieldHeight);
		game.start();
	}

});