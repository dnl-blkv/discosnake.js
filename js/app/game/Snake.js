define([
		'./Direction',
		'./SnakePart'
	],
	function (
		Direction,
		SnakePart
		) {
		'use strict';

		function Snake (cellSize, defaultCellX, defaultCellY, defaultLength) {

			this.cellSize = cellSize;

			this.length = 1;

			this.head = new SnakePart(cellSize, defaultCellX, defaultCellY);

			this.addParts(defaultLength - 1);

			this.direction = Direction.RIGHT;

			this.appleEatenListener = null;

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

		Snake.prototype.setDirection = function (direction) {
			this.direction = direction;
		}

		Snake.prototype.getDirection = function () {
			return this.direction;
		}

		Snake.prototype.setAppleEatenListener = function (appleEatenListener) {
			this.appleEatenListener = appleEatenListener;
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

		Snake.prototype.move = function (game) {
			var snake = game.snake;
			var direction = snake.getDirection();

			switch (direction) {
				case Direction.LEFT:
					snake.moveLeft(game);
					break;
				case Direction.UP:
					snake.moveUp(game);
					break;
				case Direction.RIGHT:
					snake.moveRight(game);
					break;
				case Direction.DOWN:
					snake.moveDown(game);
					break;
				default: break;
			}

			var apple = game.apple;
			var appleEaten = snake.isAppleEaten(apple);
			var appleEatenListener = this.appleEatenListener;

			if (appleEaten) {
				snake.addPart();
				appleEatenListener.call(appleEatenListener, game);
			}
		}

		return Snake;
	});