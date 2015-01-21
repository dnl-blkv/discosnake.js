define([
		'graphics/DisplayObject'
	],
	function (
		DisplayObject
		) {
		'use strict';

		function Tile (size, cellX, cellY, fillStyle, lineStyle) {
			// Modify the input parameters
			this.cellSize = size;
			this.cellX = cellX;
			this.cellY = cellY;
			this.fillStyle = fillStyle;
			this.lineStyle = lineStyle;
		}

		Tile.prototype = Object.create(DisplayObject.prototype);
		Tile.prototype.constructor = Tile;

		Tile.prototype.draw = function (gameGraphics) {

			var xPosition = this.getX();
			var yPosition = this.getY();
			var size = this.getSize();
			var fillStyle = this.getFillStyle();
			var lineStyle = this.getLineStyle();

			gameGraphics.drawRect(xPosition, yPosition, size, size, fillStyle, lineStyle);
		}

		Tile.prototype.getSize = function () {
			return this.cellSize;
		}

		Tile.prototype.getCellX = function () {
			return this.cellX;
		}

		Tile.prototype.setCellX = function (game, cellX) {
			var cellsWidth = game.getCellsWidth();

			this.cellX = (cellX + cellsWidth) % cellsWidth;

			this.setX(this.cellX * this.cellSize);
		}

		Tile.prototype.getCellY = function () {
			return this.cellY;
		}

		Tile.prototype.setCellY = function (game, cellY) {
			var cellsHeight = game.getCellsHeight();

			this.cellY = (cellY + cellsHeight) % cellsHeight;

			this.setY(this.cellY * this.cellSize);
		}

		Tile.prototype.setFillStyle = function (fillStyle) {
			this.fillStyle = fillStyle;
		}

		Tile.prototype.getFillStyle = function () {
			return this.fillStyle;
		}

		Tile.prototype.setLineStyle = function (lineStyle) {
			this.lineStyle = lineStyle;
		}

		Tile.prototype.getLineStyle = function () {
			return this.lineStyle;
		}

		Tile.prototype.doesCollideWith = function (anotherTile) {
			var xPositionMatches = (this.cellX === anotherTile.cellX);
			var yPositionMatches = (this.cellY === anotherTile.cellY);

			return (xPositionMatches && yPositionMatches);
		}

		return Tile;
	});