define([
		'./numberUtils',
		'./Tile'
	],
	function (
		numberUtils,
		Tile
		) {
		var getRandomInteger = numberUtils.getRandomInteger;

		function Apple(size, cellX, cellY) {
			// Convert the basic properties
			var fillStyle = '#8f0';
			var lineStyle = '#fff';

			// Call the super constructor
			Tile.call(this, size, cellX, cellY, fillStyle, lineStyle);
		}

		Apple.prototype = Object.create(Tile.prototype);
		Apple.prototype.constructor = Apple;

		Apple.prototype.placeRandomly = function (game) {
			var cellsWidth = game.getCellsWidth();
			var cellsHeight = game.getCellsHeight();

			this.setCellX(game, getRandomInteger(0, cellsWidth));
			this.setCellY(game, getRandomInteger(0, cellsHeight));
		}

		return Apple;
	});