define([
		'./graphicUtils',
		'./Tile'
	],
	function (
		graphicUtils,
		Tile
		) {
		// Access the required methods
		var getRandomColor = graphicUtils.getRandomColor;

		function SnakePart(size, cellX, cellY) {
			// Convert the basic properties
			var fillStyle = getRandomColor();
			var lineStyle = '#fff';

			// Call the super constructor
			Tile.call(this, size, cellX, cellY, fillStyle, lineStyle);
		}

		SnakePart.prototype = Object.create(Tile.prototype);
		SnakePart.prototype.constructor = SnakePart;

		SnakePart.prototype.incrementCellX = function (cellsWidth) {
			this.cellX = (this.cellX + 1 + cellsWidth) % cellsWidth;
		}

		SnakePart.prototype.decrementCellX = function (cellsWidth) {
			this.cellX = (this.cellX - 1 + cellsWidth) % cellsWidth;
		}

		SnakePart.prototype.incrementCellY = function (cellsHeight) {
			this.cellY = (this.cellY + 1 + cellsHeight) % cellsHeight;
		}

		SnakePart.prototype.decrementCellY = function (cellsHeight) {
			this.cellY = (this.cellY - 1 + cellsHeight) % cellsHeight;
		}

		SnakePart.prototype.dragTo = function (otherSnakePart) {
			this.setCellX(otherSnakePart.getCellX());
			this.setCellY(otherSnakePart.getCellY());
		}

		SnakePart.prototype.draw = function (gameGraphics) {
			// Convert the basic properties
			var randomColor = getRandomColor();
			this.setFillStyle(randomColor);

			Tile.prototype.draw.call(this, gameGraphics);
		}

		return SnakePart;
	});