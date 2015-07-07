define([
		'./AppleSubstance',
		'engine'
	],
	function (
		AppleSubstance,
		engine
		) {
		'use strict';

		var Tile = engine.graphics.Tile;
		var numberUtils = engine.utils.numberUtils;

		var getRandomInteger = numberUtils.getRandomInteger;

		function Apple (size, cellX, cellY) {

			// TODO: consider separate apple style-substance presets

			// NO_SUBSTANCE APPLE
			var substance = AppleSubstance.NO_SUBSTANCE;
			var fillStyle = '#20ff00';
			var lineStyle = '#1de600';

			// ALCOHOL-FILLED APPLE
			var alcoholChance = 7;
			var alcoholIndicator = getRandomInteger(0, alcoholChance);

			if (alcoholIndicator === (alcoholChance - 1)) {
				substance = AppleSubstance.ALCOHOL;
				fillStyle = '#2000ff';
				lineStyle = '#1d00e6';
			}

			this.substance = substance;

			// Call the super constructor
			Tile.call(this, size, cellX, cellY, fillStyle, lineStyle);
		}

		Apple.prototype = Object.create(Tile.prototype);
		Apple.prototype.constructor = Apple;

		Apple.prototype.getSubstance = function () {
			return this.substance;
		}

		Apple.prototype.placeRandomly = function (game) {
			var cellsWidth = game.getCellsWidth();
			var cellsHeight = game.getCellsHeight();

			this.setCellX(getRandomInteger(0, cellsWidth), game.getCellsWidth());
			this.setCellY(getRandomInteger(0, cellsHeight), game.getCellsHeight());
		}

		return Apple;
	});