define([
		'./Apple',
		'./CommandCode',
		'./Direction',
		'./Graphics',
		'./InputEvent',
		'./KeyCode',
		'./Manipulator',
		'./ScoreBoard',
		'./SnakePart',
		'./TextObject',
		'./timeUtils',
		'font!custom,families:[Wendy],urls:[style/style.css]'
	],
	function (
		Apple,
		CommandCode,
		Direction,
		Graphics,
		InputEvent,
		KeyCode,
		Manipulator,
		ScoreBoard,
		SnakePart,
		TextObject,
		timeUtils
		) {

		// Get the animation methods
		var requestAnimationFrame = timeUtils.requestAnimationFrame;
		var cancelAnimationFrame = timeUtils.cancelAnimationFrame;

		// Get the current time utility
		var timeNow = timeUtils.timeNow;

		function Game (cellSize, cellsWidth, cellsHeight) {

			this.then = timeNow();

			// Set the size parameters
			this.cellSize = cellSize;
			this.cellsWidth = cellsWidth;
			this.cellsHeight = cellsHeight;

			// Set the FPS rate
			this.fps = 20;
			this.defaultSnakeLength = 4;
			this.lastRequestId = 0;

			// Set the default properties
			this.stopped = false;
			this.lastRequestId = 0;
			this.scoreBoard = new ScoreBoard();

			// Initialize an apple
			this.apple = null;

			// Initialize the graphics
			var width = cellsWidth * cellSize + 1;
			var height = cellsHeight * cellSize + 1;
			this.graphics = new Graphics(width, height);

			// Create the control module
			this.manipulator = new Manipulator();

			// Set the command listener
			this.manipulator.setCommandListener(executeCommand, this);

			setUpGameControls(this);

			// TODO: Dirty, DIRTY solution; Fix
			var game = this;

			this.graphics.canvas.addEventListener(InputEvent.TOUCH_START, function (event) {
				processTouch(game, event);
			});

			reset(this);
		}

		function setUpGameControls (game) {
			// Set up the controls
			game.manipulator.bindKeyDown(KeyCode.LEFT, CommandCode.TURN_SNAKE_LEFT);
			game.manipulator.bindKeyDown(KeyCode.UP, CommandCode.TURN_SNAKE_UP);
			game.manipulator.bindKeyDown(KeyCode.RIGHT, CommandCode.TURN_SNAKE_RIGHT);
			game.manipulator.bindKeyDown(KeyCode.DOWN, CommandCode.TURN_SNAKE_DOWN);
			game.manipulator.bindKeyDown(KeyCode.SPACE, CommandCode.TOGGLE_PAUSE);
			game.manipulator.bindKeyDown(KeyCode.R, CommandCode.RESET_GAME);
		}

		function reset (game) {
			game.then = timeNow();

			game.currentDirection = Direction.RIGHT;

			// Initialize the snake
			game.snake = [];
			addSnakeParts(game, game.defaultSnakeLength);

			dropApple(game);

			render(game);
		}

		function executeCommand (game, commandCode) {

			// Pause keys
			switch (commandCode) {
				case CommandCode.TOGGLE_PAUSE:
					togglePause(game);
					break;

				case CommandCode.RESET_GAME:
					reset(game);
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

		// TODO: Move to a helper
		function relTouchCoords (element, event) {
			var absoluteX = event.touches[0].clientX;
			var absoluteY = event.touches[0].clientY;

			return relCoords(element, absoluteX, absoluteY);
		}

		// TODO: Move to a helper
		function relMouseCoords (element, event) {
			var absoluteX = event.pageX;
			var absoluteY = event.pageY;

			return relCoords(element, absoluteX, absoluteY);
		}

		// TODO: Move to a helper
		function relCoords(element, absoluteX, absoluteY){
			var totalOffsetX = 0;
			var totalOffsetY = 0;
			var canvasX = 0;
			var canvasY = 0;
			var currentElement = element;

			do{
				totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
				totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
			}
			while(currentElement = currentElement.offsetParent)

			canvasX = absoluteX - totalOffsetX;
			canvasY = absoluteY - totalOffsetY;

			return {
				x: canvasX,
				y: canvasY
			}
		}

		function processTouch (game, event) {
			var coordinates = relTouchCoords(game.graphics.canvas, event);
			var width = game.graphics.width;
			var height = game.graphics.height;
			var canvasHalfWidth =  width / 2;
			var canvasHalfHeight =  height / 2;
			var ratioWH = width / height;
			var relX = coordinates.x - canvasHalfWidth;
			var relY = (- coordinates.y + canvasHalfHeight) * ratioWH;

			// Turn snake in the required direction
			if (event.touches.length > 1) {
				togglePause(game);
			} else if ((- relX <= relY) && (relX <= relY)) {
				game.currentDirection = Direction.UP;
			} else if ((- relX < relY) && (relX > relY)) {
				game.currentDirection = Direction.RIGHT;
			} else if ((- relX >= relY) && (relX >= relY)) {
				game.currentDirection = Direction.DOWN;
			} else {
				game.currentDirection = Direction.LEFT;
			}
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
			game.scoreBoard.draw(game.graphics);

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
				game.scoreBoard.incrementScore();
			}
		}

		function togglePause (game) {
			if(game.isStopped()) {
				game.start();
			} else {
				game.pause();
			}
		}

		Game.prototype.pause = function () {
			var requestId = this.lastRequestId;

			if (requestId) {
				cancelAnimationFrame(requestId);
			}

			this.lastRequestId = 0;

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
			var delay = Math.abs(timeNow() - game.then) % this.fps;

			if (!game.isStopped()) {
				setTimeout(function () {
					game.then = timeNow();
					game.lastRequestId = requestAnimationFrame(run);
					update(game);
					render(game);
				}, ((1000 / this.fps) - delay));
			}
		}

		function addSnakeParts (game, partsCount) {
			for (var i = 0; i < partsCount; i ++) {
				addSnakePart(game);
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