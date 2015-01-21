define([
		'engine/graphics/Tile',
		'engine/utils/graphicUtils'
	],
	function (
		Tile,
		graphicUtils
		) {
		'use strict';

		// Access the required methods
		var getRandomPsychedelicColor = graphicUtils.getRandomPsychedelicColor;

		function SnakePart (size, cellX, cellY) {
			// Convert the basic properties
			this.color = getRandomPsychedelicColor();
			this.previousPart = null;
			this.nextPart = null;

			var fillStyle = this.color.getHexString();
			var lineStyle = '#ffffff';

			// Call the super constructor
			Tile.call(this, size, cellX, cellY, fillStyle, lineStyle);
		}

		SnakePart.prototype = Object.create(Tile.prototype);
		SnakePart.prototype.constructor = SnakePart;

		SnakePart.prototype.setPreviousPart = function (previousPart) {
			this.previousPart = previousPart;
		}

		SnakePart.prototype.getPreviousPart = function () {
			return this.previousPart;
		}

		SnakePart.prototype.setNextPart = function (nextPart) {
			this.nextPart = nextPart;
		}

		SnakePart.prototype.getNextPart = function () {
			return this.nextPart;
		}

		SnakePart.prototype.moveRight = function (game) {
			this.setCellX(game, this.cellX + 1);
		}

		SnakePart.prototype.moveLeft = function (game) {
			this.setCellX(game, this.cellX - 1);
		}

		SnakePart.prototype.moveDown = function (game) {
			this.setCellY(game, this.cellY + 1);
		}

		SnakePart.prototype.moveUp = function (game) {
			this.setCellY(game, this.cellY - 1);
		}

		SnakePart.prototype.dragTo = function (game, otherSnakePart) {
			this.setCellX(game, otherSnakePart.getCellX());
			this.setCellY(game, otherSnakePart.getCellY());
		}

		SnakePart.prototype.draw = function (gameGraphics) {
			// Convert the basic properties
			var randomColor = getRandomPsychedelicColor();

			this.setFillStyle(randomColor.getHexString());

			Tile.prototype.draw.call(this, gameGraphics);
		}

		return SnakePart;
	});