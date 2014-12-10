define([
		'./SnakePart'
	],
	function (
		SnakePart
		) {

		function Snake (cellSize, defaultCellX, defaultCellY, defaultLength) {

			this.cellSize = cellSize;

			this.length = 1;

			this.head = new SnakePart(cellSize, defaultCellX, defaultCellY);

			this.addParts(defaultLength - 1);

		}

		Snake.prototype.isAppleEaten = function (apple) {
			var head = this.getHead();
			var appleEaten = head.doesCollideWith(apple);

			return appleEaten;
		}

		Snake.prototype.moveRight = function (game) {
			moveBody(this, game);
			this.head.moveRight(game);
		}

		Snake.prototype.moveLeft = function (game) {
			moveBody(this, game);
			this.head.moveLeft(game);
		}

		Snake.prototype.moveDown = function (game) {
			moveBody(this, game);
			this.head.moveDown(game);
		}

		Snake.prototype.moveUp = function (game) {
			moveBody(this, game);
			this.head.moveUp(game);
		}

		function moveBody (snake, game) {
			var currentPart = snake.getTail();
			var previousPart = currentPart.getPreviousPart();

			// Loop around the snake array from tail to head excluding it
			while (previousPart !== null) {
				// Drug each part to the previous one
				currentPart.dragTo(game, previousPart);

				currentPart = previousPart;

				previousPart = previousPart.getPreviousPart();
			}
		}

		Snake.prototype.draw = function (gameGraphics) {
			var currentPart = this.getHead();

			do {
				currentPart.draw(gameGraphics);
				currentPart = currentPart.getNextPart();
			} while (currentPart !== null);
		}

		Snake.prototype.getHead = function () {
			return this.head;
		}

		Snake.prototype.getTail = function () {
			var tail = this.getHead();
			var nextPart = tail.getNextPart();

			while (nextPart !== null) {
				tail = nextPart;

				nextPart = tail.getNextPart();
			}

			return tail;
		}

		Snake.prototype.getLength = function () {
			return this.length;
		}

		// [Next][Current][Previous][Head] ->
		Snake.prototype.addPart = function () {

			var tail = this.getTail();

			var newSnakePart = new SnakePart(this.cellSize, tail.getCellX(), tail.getCellY());

			tail.setNextPart(newSnakePart);

			newSnakePart.setPreviousPart(tail);

			this.length ++;
		}

		Snake.prototype.addParts = function (partsCount) {
			for (var i = 0; i < partsCount; i ++) {
				this.addPart();
			}
		}

		return Snake;
	});