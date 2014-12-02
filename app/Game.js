define([
		'./CommandCode',
		'./Direction',
		'./GameGraphics',
		'./KeyCode',
		'./Manipulator',
		'./SnakePart',
		'./timeUtils'
	],
	function (
		CommandCode,
		Direction,
		GameGraphics,
		KeyCode,
		Manipulator,
		SnakePart,
		timeUtils
		) {

		// Get the required method
		var requestAnimationFrame = timeUtils.requestAnimationFrame;
		var cancelAnimationFrame = timeUtils.cancelAnimationFrame;

		var timeNow = timeUtils.timeNow;

		function Game(cellSize, cellsWidth, cellsHeight) {

			// Set the default parameters
			this.cellSize = cellSize;
			this.cellsWidth = cellsWidth;
			this.cellsHeight = cellsHeight;
			this.stopped = true;
			this.lastRequestId = 0;

			// Initialize the graphics
			var width = cellsWidth * cellSize;
			var height = cellsHeight * cellSize;
			this.graphics = new GameGraphics(width, height);

			this.currentDirection = Direction.LEFT;

			// Create the control module
			this.manipulator = new Manipulator();

			// Set the command listener
			this.manipulator.setCommandListener(executeCommand, this);

			// Set up the controls
			this.manipulator.bindKeyDown(KeyCode.LEFT, CommandCode.TURN_SNAKE_LEFT);
			this.manipulator.bindKeyDown(KeyCode.UP, CommandCode.TURN_SNAKE_UP);
			this.manipulator.bindKeyDown(KeyCode.RIGHT, CommandCode.TURN_SNAKE_RIGHT);
			this.manipulator.bindKeyDown(KeyCode.DOWN, CommandCode.TURN_SNAKE_DOWN);
			this.manipulator.bindKeyDown(KeyCode.SPACE, CommandCode.TOGGLE_PAUSE);

			// Initialize the snake
			this.snake = [];
			this.addSnakePart();
			this.addSnakePart();
			this.addSnakePart();
			this.addSnakePart();

			// Initialize an apple

		}

		function dropApple (game) {

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

				// Drug current snake part to the next one
				currentPart.dragTo(nextPart);
			}
			
			moveHead(game);
		}

		function moveHead (game) {
			// Move the head in the required direction
			var head = getSnakeHead(game);

			switch (game.currentDirection) {
				case Direction.LEFT:
					head.decrementCellX(game.cellsWidth);
					break;
				case Direction.UP:
					head.decrementCellY(game.cellsHeight);
					break;
				case Direction.RIGHT:
					head.incrementCellX(game.cellsWidth);
					break;
				case Direction.DOWN:
					head.incrementCellY(game.cellsHeight);
					break;
				default: break;
			}
		}

		function executeCommand (game, commandCode) {

			// Pause keys
			switch (commandCode) {
				case CommandCode.TOGGLE_PAUSE:
					if(game.isStopped()) {
						game.start();
					} else {
						game.pause();
					}
					break;
				default: break;
			}

			// Non-pause keys
			if(!game.isStopped()) {
				switch (commandCode) {
					case CommandCode.TURN_SNAKE_LEFT:
						game.currentDirection = Direction.LEFT;
						break;
					case CommandCode.TURN_SNAKE_UP:
						game.currentDirection = Direction.UP;
						break;
					case CommandCode.TURN_SNAKE_RIGHT:
						game.currentDirection = Direction.RIGHT;
						break;
					case CommandCode.TURN_SNAKE_DOWN:
						game.currentDirection = Direction.DOWN;
						break;
					default:
						break;
				}
			}
		}
		
		function render (game) {
			game.graphics.reset();

			for (var i = 0; i < game.snake.length; i ++) {
				game.snake[i].draw(game.graphics);
			}

		}

		Game.prototype.pause = function () {
			var requestId = this.lastRequestId;

			if (requestId) {
				cancelAnimationFrame(requestId);
			}

			this.stopped = true;
		}

		Game.prototype.isStopped = function () {
			return this.stopped;
		}

		Game.prototype.start = function () {
			this.stopped = false;
			this.run();
		}

		// TODO: RUN THE FUCKING GAME
		Game.prototype.run = function () {

			var run = this.run.bind(this);
			var game = this;

			if (!game.isStopped()) {
				setTimeout(function () {
					game.lastRequestId = requestAnimationFrame(run);
					update(game);
					render(game);
				}, 1000 / 20);
			}
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