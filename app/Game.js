define([
		'./GameGraphics'
	],
	function(
		GameGraphics
		) {
		function Game () {
			this.graphics = new GameGraphics();
		}

		return Game;
});