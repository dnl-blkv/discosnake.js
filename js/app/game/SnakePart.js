define([
		'engine'
	],
	function (
		engine
		) {
		'use strict';

		var Tile = engine.graphics.Tile;
		var graphicUtils = engine.utils.graphicUtils;

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
			this.setCellX(this.cellX + 1, game.getCellsWidth());
		}

		SnakePart.prototype.moveLeft = function (game) {
			this.setCellX(this.cellX - 1, game.getCellsWidth());
		}

		SnakePart.prototype.moveDown = function (game) {
			this.setCellY(this.cellY + 1, game.getCellsHeight());
		}

		SnakePart.prototype.moveUp = function (game) {
			this.setCellY(this.cellY - 1, game.getCellsHeight());
		}

		SnakePart.prototype.dragTo = function (game, otherSnakePart) {
			this.setCellX(otherSnakePart.getCellX(), game.getCellsWidth());
			this.setCellY(otherSnakePart.getCellY(), game.getCellsHeight());
		}

		SnakePart.prototype.draw = function (gameGraphics) {
			// Convert the basic properties
			var randomColor = getRandomPsychedelicColor();

			this.setFillStyle(randomColor.getHexString());

			Tile.prototype.draw.call(this, gameGraphics);
		}

		return SnakePart;
	});