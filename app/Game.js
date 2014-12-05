define([
		'./Apple',
		'./CommandCode',
		'./Direction',
		'./GameGraphics',
		'./KeyCode',
		'./Manipulator',
		'./SnakePart',
		'./TextObject',
		'./timeUtils',
		'font!custom,families:[Wendy],urls:[style/style.css]'
	],
	function (
		Apple,
		CommandCode,
		Direction,
		GameGraphics,
		KeyCode,
		Manipulator,
		SnakePart,
		TextObject,
		timeUtils
		) {

		// Get the required method
		var requestAnimationFrame = timeUtils.requestAnimationFrame;
		var cancelAnimationFrame = timeUtils.cancelAnimationFrame;

		var timeNow = timeUtils.timeNow;

		function Game (cellSize, cellsWidth, cellsHeight) {

			// Set the size parameters
			this.cellSize = cellSize;
			this.cellsWidth = cellsWidth;
			this.cellsHeight = cellsHeight;

			// Set the default properties
			this.stopped = true;
			this.lastRequestId = 0;
			this.then = timeNow();

			// Initialize the graphics
			var width = cellsWidth * cellSize + 1;
			var height = cellsHeight * cellSize + 1;
			this.graphics = new GameGraphics(width, height);

			// TODO: Create a separate class
			this.score = 0;

			var scoreFontSize = 72;
			var scoreX = 20;
			var scoreY = scoreFontSize / 2 + 20;
			var scoreText = '' + this.score;
			var scoreColor = '#999999';
			var scoreFontFamily = 'Wendy';

			this.scoreScreen = new TextObject(scoreX, scoreY, scoreText, scoreFontSize, scoreFontFamily, scoreColor);

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
			addSnakePart(this);
			addSnakePart(this);
			addSnakePart(this);
			addSnakePart(this);

			// Initialize an apple
			this.apple = null;
			dropApple(this);
		}

		function incrementScore (game) {
			game.score ++;
			game.scoreScreen.text = '' + game.score;
		}

		function dropApple (game) {
			game.apple = new Apple(game.cellSize, -1, -1);
			game.apple.placeRandomly(game);
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
				currentPart.dragTo(game, nextPart);
			}
			
			moveHead(game);
		}

		function render (game) {
			// Start from the clean sheet
			game.graphics.reset();

			// Render the score
			game.scoreScreen.draw(game.graphics);

			// Draw an apple
			game.apple.draw(game.graphics);

			// Draw the snake
			for (var i = 0; i < game.snake.length; i ++) {
				var currentSnakePart = game.snake[i];

				currentSnakePart.draw(game.graphics);
			}
		}

		function moveHead (game) {
			// Move the head in the required direction
			var head = getSnakeHead(game);

			switch (game.currentDirection) {
				case Direction.LEFT:
					head.decrementCellX(game);
					break;
				case Direction.UP:
					head.decrementCellY(game);
					break;
				case Direction.RIGHT:
					head.incrementCellX(game);
					break;
				case Direction.DOWN:
					head.incrementCellY(game);
					break;
				default: break;
			}

			// Check if an apple was eaten
			var appleEaten = head.doesCollideWith(game.apple);

			if (appleEaten) {
				addSnakePart(game);
				dropApple(game);
				incrementScore(game);
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
			this.then = timeNow();
			this.run();
		}

		// TODO: RUN THE FUCKING GAME
		Game.prototype.run = function () {

			var run = this.run.bind(this);
			var game = this;
			var delay = timeNow() - game.then;

			if (!game.isStopped()) {
				setTimeout(function () {
					game.then = timeNow();
					game.lastRequestId = requestAnimationFrame(run);
					update(game);
					render(game);
				}, ((1000 / 20) - delay));
			}
		}

		function addSnakePart (game) {

			var newSnakePart;

			if (game.snake.length > 0) {
				var lastSnakePart = getSnakeTail(game);

				newSnakePart = new SnakePart(game.cellSize, lastSnakePart.getCellX(), lastSnakePart.getCellY());
			} else {
				var midWidthPosition = Math.round(game.cellsWidth / 2);
				var midHeightPosition = Math.round(game.cellsHeight / 2);
				newSnakePart = new SnakePart(game.cellSize, midWidthPosition, midHeightPosition);
			}

			game.snake.push(newSnakePart);
		}

		Game.prototype.getCellsWidth = function () {
			return this.cellsWidth;
		}

		Game.prototype.getCellsHeight = function () {
			return this.cellsHeight;
		}

		return Game;
	});