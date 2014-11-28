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

		return Tile;
	});