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

		SnakePart.prototype.incrementCellX = function (game) {
			this.setCellX(game, this.cellX + 1);
		}

		SnakePart.prototype.decrementCellX = function (game) {
			this.setCellX(game, this.cellX - 1);
		}

		SnakePart.prototype.incrementCellY = function (game) {
			this.setCellY(game, this.cellY + 1);
		}

		SnakePart.prototype.decrementCellY = function (game) {
			this.setCellY(game, this.cellY - 1);
		}

		SnakePart.prototype.dragTo = function (game, otherSnakePart) {
			this.setCellX(game, otherSnakePart.getCellX());
			this.setCellY(game, otherSnakePart.getCellY());
		}

		SnakePart.prototype.draw = function (gameGraphics) {
			// Convert the basic properties
			var randomColor = getRandomColor();
			this.setFillStyle(randomColor);

			Tile.prototype.draw.call(this, gameGraphics);
		}

		return SnakePart;
	});