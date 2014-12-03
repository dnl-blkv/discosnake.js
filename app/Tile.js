define([
		'./Tile'
	],
	function (
		Tile
		) {

		function Tile(size, cellX, cellY, fillStyle, lineStyle) {
			// Modify the input parameters
			this.size = size;
			this.cellX = cellX;
			this.cellY = cellY;
			this.fillStyle = fillStyle;
			this.lineStyle = lineStyle;
		}

		Tile.prototype.draw = function (gameGraphics) {

			var xPosition = this.getX();
			var yPosition = this.getY();
			var size = this.getSize();
			var fillStyle = this.getFillStyle();
			var lineStyle = this.getLineStyle();

			gameGraphics.drawRect(xPosition, yPosition, size, size, fillStyle, lineStyle);
		}

		Tile.prototype.getSize = function () {
			return this.size;
		}

		Tile.prototype.getX = function () {
			return this.cellX * this.size;
		}

		Tile.prototype.getY = function () {
			return this.cellY * this.size;
		}

		Tile.prototype.getCellX = function () {
			return this.cellX;
		}

		Tile.prototype.setCellX = function (cellX) {
			this.cellX = cellX;
		}

		Tile.prototype.getCellY = function () {
			return this.cellY;
		}

		Tile.prototype.setCellY = function (cellY) {
			this.cellY = cellY;
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