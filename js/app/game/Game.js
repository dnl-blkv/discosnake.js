define([
		'./Apple',
		'./CommandCode',
		'./Direction',
		'graphics/Graphics',
		'input/InputEvent',
		'input/KeyCode',
		'input/Manipulator',
		'./ScoreBoard',
		'./Snake',
		'./TextObject',
		'utils/timeUtils',
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
		Snake,
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

			var midWidthPosition = Math.round(game.cellsWidth / 2);
			var midHeightPosition = Math.round(game.cellsHeight / 2);

			// Initialize the snake
			game.snake = new Snake(game.cellSize, midWidthPosition, midHeightPosition, game.defaultSnakeLength);

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

		function update (game) {
			moveSnake(game);
		}

		function render (game) {
			// Start from the clean sheet
			game.graphics.reset();

			// Render the score
			game.scoreBoard.draw(game.graphics);

			// Draw an apple
			game.apple.draw(game.graphics);

			// Draw the snake
			game.snake.draw(game.graphics);
		}

		function moveSnake (game) {
			var snake = game.snake;

			switch (game.currentDirection) {
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

			// Check if an apple was eaten
			var apple = game.apple;
			var appleEaten = snake.isAppleEaten(apple);

			if (appleEaten) {
				snake.addPart();
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

			// Bind this
			var run = this.run.bind(this);

			// Prepare the frame processing method
			var game = this;
			var processFrame = function () {
				game.then = timeNow();
				game.lastRequestId = requestAnimationFrame(run);
				update(game);
				render(game);
			};

			// Calculate the delay for previous frame processing
			var delay = 0;
			var currentFrameDuration = (1000 / this.fps);

			// If the game is running, process frame
			var gameStopped = this.isStopped();
			if (!gameStopped) {
				delay = timeNow() - this.then;
				currentFrameDuration -= delay;
				setTimeout(processFrame, currentFrameDuration);
			}
		}

		Game.prototype.getCellsWidth = function () {
			return this.cellsWidth;
		}

		Game.prototype.getCellsHeight = function () {
			return this.cellsHeight;
		}

		return Game;
	});