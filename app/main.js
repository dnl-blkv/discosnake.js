define([
	'./Game'
], function (
	Game
	) {

	// Save the game properties
	var cellSize = 20;
	var fieldWidth = 40;
	var fieldHeight = 30;

	// Create the new Game Instance
	var game = new Game(20, 40, 30);

	// Start the game
	game.start();

});