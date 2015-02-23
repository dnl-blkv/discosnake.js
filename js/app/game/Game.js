define([
		'./gameplay/Apple',
		'./commands/CommandCode',
		'./controls/defaultGameControls',
		'./controls/invertedGameControls',
		'./controls/menuControls',
		'./gameplay/Direction',
		'./ui/DiscoSnakeMenuItem',
		'engine',
		'./ui/ScoreBoard',
		'./gameplay/Snake'
	],
	function (
		Apple,
		CommandCode,
		defaultGameControls,
		invertedControls,
		menuControls,
		Direction,
		DiscoSnakeMenuItem,
		engine,
		ScoreBoard,
		Snake
		) {
		'use strict';

		// Classes
		var Graphics = engine.graphics.Graphics;
		var Manipulator = engine.input.Manipulator;
		var Menu = engine.ui.Menu;
		var timeUtils = engine.utils.timeUtils;
		var htmlUtils = engine.utils.htmlUtils;

		// Methods
		// Get the animation methods
		var cancelAnimationFrame = timeUtils.cancelAnimationFrame;
		var requestAnimationFrame = timeUtils.requestAnimationFrame;

		// Get the current time utility
		var timeNow = timeUtils.timeNow;

		// Get the html methods
		var getBody = htmlUtils.getBody;

		function Game (cellSize, cellsWidth, cellsHeight) {

			this.frameNumber = 0;
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
			this.stopped = true;
			this.lastRequestId = 0;
			this.scoreBoard = new ScoreBoard();

			// Initialize an apple
			this.apple = null;

			// Initialize the graphics
			var width = cellsWidth * cellSize + 1;
			var height = cellsHeight * cellSize + 1;
			var backgroundColor = '#000000';
			this.graphics = new Graphics(width, height, backgroundColor);

			// TODO: Dirty way of appending of the score screen to canvas, centralize
			// TODO: Fix the positioning (dirty way)
			var scoreScreenHTML = this.scoreBoard.getHTML();
			var body = getBody();
			body.appendChild(scoreScreenHTML);

			// Create and build the menus
			this.menu = null;
			this.pausedGameMenu = null;
			buildMenus(this);
			body.appendChild(this.menu.getHTML());

			// Center the menu
			this.menu.center();

			// Create the control module
			this.manipulator = new Manipulator();

			// Set the command listener
			this.manipulator.setCommandListener(executeCommand, this);
			this.manipulator.setControls(menuControls);

			reset(this);
		}

		function buildMenus (game) {
			var newGameMenu = new Menu();

			var menuFontSize = 48;
			var menuFontFace = 'Wendy';
			var menuDefaultFontColor = '#FFFFFF';

			newGameMenu.addItem(new DiscoSnakeMenuItem(CommandCode.CONTINUE_GAME, 'START GAME', menuFontSize, menuFontFace, menuDefaultFontColor, 600));
			newGameMenu.setItemSelectedListener(executeCommand, game);

			// Set menu to the new game menu by default since no game has been started
			game.menu = newGameMenu;
			var body = getBody();
			body.appendChild(newGameMenu.getHTML());
			newGameMenu.reveal();
			newGameMenu.center();

			var pausedGameMenu = new Menu();

			pausedGameMenu.addItem(new DiscoSnakeMenuItem(CommandCode.CONTINUE_GAME, 'CONTINUE', menuFontSize, menuFontFace, menuDefaultFontColor, 600));
			pausedGameMenu.addItem(new DiscoSnakeMenuItem(CommandCode.NEW_GAME, 'NEW GAME', menuFontSize, menuFontFace, menuDefaultFontColor, 600));
			pausedGameMenu.setItemSelectedListener(executeCommand, game);

			game.pausedGameMenu = pausedGameMenu;
			body.appendChild(pausedGameMenu.getHTML());
			pausedGameMenu.center();
		}

		function reset (game) {
			game.then = timeNow();

			var midWidthPosition = Math.round(game.cellsWidth / 2);
			var midHeightPosition = Math.round(game.cellsHeight / 2);

			// Reset the scoreboard
			game.scoreBoard.reset();

			// Initialize the snake
			game.snake = new Snake(game.cellSize, midWidthPosition, midHeightPosition, game.defaultSnakeLength);
			game.snake.setAppleEatenListener(appleEatenListener);

			dropApple(game);

			render(game);
		}

		function executeCommand (game, commandCode) {

			var menu = game.menu;
			var snake = game.snake;

			switch (commandCode) {
				case CommandCode.TOGGLE_PAUSE:
					togglePause(game);
					break;

				case CommandCode.PREVIOUS_MENU_ITEM:
					menu.focusPreviousItem();
					render(game);
					break;

				case CommandCode.NEXT_MENU_ITEM:
					menu.focusNextItem();
					render(game);
					break;

				case CommandCode.SELECT_MENU_ITEM:
					menu.selectCurrentItem();
					render(game);
					break;

				case CommandCode.TURN_SNAKE_LEFT:
					snake.setDirection(Direction.LEFT);
					break;

				case CommandCode.TURN_SNAKE_UP:
					snake.setDirection(Direction.UP);
					break;

				case CommandCode.TURN_SNAKE_RIGHT:
					snake.setDirection(Direction.RIGHT);
					break;

				case CommandCode.TURN_SNAKE_DOWN:
					snake.setDirection(Direction.DOWN);
					break;

				case CommandCode.NEW_GAME:
					reset(game);
					game.start();
					break;

				case CommandCode.CONTINUE_GAME:
					game.start();
					break;

				default:
					break;
			}
		}

		function appleEatenListener (game) {
			dropApple(game);
			game.scoreBoard.incrementScore();
		}

		function dropApple (game) {
			game.apple = new Apple (game.cellSize, -1, -1);
			game.apple.placeRandomly(game);
		}

		function moveSnake (game) {
			// Check if an apple was eaten
			var snake = game.snake;
			snake.move(game);
		}

		function update (game) {
			moveSnake(game);
		}

		function render (game) {
			var graphics = game.graphics;
			var snake = game.snake;
			var snakeDrunkness = snake.getDrunkness();
			var frameNumber = game.frameNumber;

			// Start from the clean sheet
			if (frameNumber % (snakeDrunkness + 1) === 0) {
				graphics.reset();
			}

			// Draw an apple
			if (!game.isStopped()) {
				game.apple.draw(graphics);
			}

			// Draw the snake
			game.snake.draw(graphics);
		}

		function togglePause (game) {
			if(game.isStopped()) {
				game.start();
			} else {
				game.pause();
			}
		}

		Game.prototype.start = function () {
			this.stopped = false;
			this.manipulator.setControls(defaultGameControls);

			// Set up the menu
			if (this.menu !== this.pausedGameMenu) {
				this.menu.hide();
				this.menu = this.pausedGameMenu;
			}

			this.menu.focusFirstItem();

			this.menu.hide();

			this.then = timeNow();
			this.run();
		}

		Game.prototype.pause = function () {
			var requestId = this.lastRequestId;

			if (requestId) {
				this.manipulator.setControls(menuControls);
				cancelAnimationFrame(requestId);
			}

			this.lastRequestId = 0;

			this.menu.reveal();

			this.stopped = true;
		}

		Game.prototype.isStopped = function () {
			return this.stopped;
		}

		// Run the game repeatedly and continuously. NICE SHOT MAN.
		Game.prototype.run = function () {

			// Bind this
			var run = this.run.bind(this);

			// Prepare the frame processing method
			var game = this;
			var processFrame = function () {
				game.then = timeNow();
				game.lastRequestId = requestAnimationFrame(run);
				game.frameNumber ++;
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