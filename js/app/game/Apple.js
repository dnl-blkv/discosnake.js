define([
		'graphics/Tile',
		'utils/numberUtils'
	],
	function (
		Tile,
		numberUtils
		) {
		'use strict';

		var getRandomInteger = numberUtils.getRandomInteger;

		function Apple (size, cellX, cellY) {
			// Convert the basic properties
			var fillStyle = '#20ff00';
			var lineStyle = '#1de600';

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