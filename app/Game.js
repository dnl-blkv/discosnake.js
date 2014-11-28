define([
		'./GameGraphics',
		'./Manipulator',
		'./SnakePart',
		'./timeUtils'
	],
	function (
		GameGraphics,
		Manipulator,
		SnakePart,
		timeUtils
		) {

		// Get the required method
		var requestAnimationFrame = timeUtils.requestAnimationFrame;
		var timeNow = timeUtils.timeNow;

		function Game(cellSize, cellsWidth, cellsHeight) {

			// Set the default parameters
			this.cellSize = cellSize;
			this.cellsWidth = cellsWidth;
			this.cellsHeight = cellsHeight;
			this.timeThen = timeNow();

			// Initialize the graphics
			var width = cellsWidth * cellSize;
			var height = cellsHeight * cellSize;
			this.graphics = new GameGraphics(width, height);

			this.DIRECTIONS = {
				LEFT: 0,
				UP: 1,
				RIGHT: 2,
				DOWN: 3
			}

			this.currentDirection = this.DIRECTIONS.LEFT;

			this.manipulator = new Manipulator();

			// Initialize the snake
			this.snake = [];
			this.addSnakePart();
			this.addSnakePart();
			this.addSnakePart();
			this.addSnakePart();
			this.addSnakePart();
		}

		function getSnakePart (game, snakePartIndex) {
			return game.snake[snakePartIndex];
		}

		function getSnakeHead (game) {
			return game.snake[0];
		}

		function getSnakeTail (game) {
			return game.snake[game.snake.length - 1];
		}

		function update (game) {

			// Loop around the snake array from tail to head excluding it
			for (var i = game.snake.length - 1; i > 0; i --) {
				var currentPart = getSnakePart(game, i);
				var nextPart = getSnakePart(game, i - 1);

				currentPart.setCellX(nextPart.getCellX());
				currentPart.setCellY(nextPart.getCellY());
			}

			applyControl(game);
			
			moveHead(game);
		}

		function moveHead (game) {
			// Move the head in the required direction
			var head = getSnakeHead(game);

			switch (game.currentDirection) {
				case game.DIRECTIONS.LEFT:
					head.decrementCellX(game.cellsWidth);
					break;
				case game.DIRECTIONS.UP:
					head.decrementCellY(game.cellsHeight);
					break;
				case game.DIRECTIONS.RIGHT:
					head.incrementCellX(game.cellsWidth);
					break;
				case game.DIRECTIONS.DOWN:
					head.incrementCellY(game.cellsHeight);
					break;
				default: break;
			}
		}

		function applyControl (game) {
			var lastKeyPressed = game.manipulator.getLastKeyPressed();

			var KEY_CODE = game.manipulator.KEY_CODE;

			switch (lastKeyPressed) {
				case KEY_CODE.LEFT:
					game.currentDirection = game.DIRECTIONS.LEFT;
					break;
				case KEY_CODE.UP:
					game.currentDirection = game.DIRECTIONS.UP;
					break;
				case KEY_CODE.RIGHT:
					game.currentDirection = game.DIRECTIONS.RIGHT;
					break;
				case KEY_CODE.DOWN:
					game.currentDirection = game.DIRECTIONS.DOWN;
					break;
				default: break;
			}
			
		}
		
		function render (game) {
			game.graphics.reset();

			for (var i = 0; i < game.snake.length; i ++) {
				game.snake[i].fillRandomly();
				game.graphics.drawTile(game.snake[i]);
			}

		}

		Game.prototype.run = function () {
			var run = this.run.bind(this);
			var delay = timeNow() - this.timeThen;
			var game = this;
			setTimeout(function() {
				requestAnimationFrame(run);
				update(game);
				render(game);
			}, 1000 / 20);
		}

		Game.prototype.addSnakePart = function () {

			var newSnakePart;

			if (this.snake.length > 0) {
				var lastSnakePart = getSnakeTail(this);

				newSnakePart = new SnakePart(this.cellSize, lastSnakePart.getCellX(), lastSnakePart.getCellY());
			} else {
				var midWidthPosition = Math.round(this.cellsWidth / 2);
				var midHeightPosition = Math.round(this.cellsHeight / 2);
				newSnakePart = new SnakePart(this.cellSize, midWidthPosition, midHeightPosition);
			}

			this.snake.push(newSnakePart);
		}

		return Game;
	});