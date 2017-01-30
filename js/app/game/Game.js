define([
        "./gameplay/Apple",
        "./gameplay/BonusApple",
        "./commands/CommandCode",
        "./controls/defaultGameControls",
        "./gameplay/Direction",
        "./ui/DiscoSnakeMenuItem",
        "engine",
        "./controls/invertedGameControls",
        "./controls/menuControls",
        "./ui/ScoreBoard",
        "./gameplay/Snake"
    ],
    function(
        Apple,
        BonusApple,
        CommandCode,
        defaultGameControls,
        Direction,
        DiscoSnakeMenuItem,
        engine,
        invertedControls,
        menuControls,
        ScoreBoard,
        Snake
    ) {
        "use strict";

        // Classes
        var Graphics = engine.graphics.Graphics;
        var Manipulator = engine.input.Manipulator;
        var Menu = engine.ui.Menu;
        var TimeUtils = engine.utils.TimeUtils;
        var HtmlUtils = engine.utils.HtmlUtils;

        // Methods
        var cancelAnimationFrame = TimeUtils.cancelAnimationFrame;
        var requestAnimationFrame = TimeUtils.requestAnimationFrame;
        var timeNow = TimeUtils.timeNow;
        var getBody = HtmlUtils.getBody;

        var SNAKE_LENGTH_DEFAULT = 4;
        var ANGRY_STACY_MODE = true;

        function Game(cellSize, cellsWidth, cellsHeight) {
            this.cellSize = cellSize;
            this.cellsWidth = cellsWidth;
            this.cellsHeight = cellsHeight;

            this.then = 0;
            updateThen(this);

            this.frameNumber = 0;
            this.fpsRate = 21;
            this.stopped = true;
            this.lastRequestId = 0;

            // Initialize the scoreboard
            this.scoreBoard = new ScoreBoard();

            // Initialize the audio player
            // TODO: dirty way, refactor
            this.audio = new Audio("audio/scooter-last-minute.mp3");
            var game = this;
            this.audio.addEventListener("ended", function() {
                resetAudio(game);
                game.audio.play();
            }, false);

            // Initialize the game graphics
            var width = cellsWidth * cellSize + 1;
            var height = cellsHeight * cellSize + 1;
            var backgroundColor = "#000000";
            this.graphics = new Graphics(width, height, backgroundColor);

            // Declare the snake
            this.snake = null;

            // Declare an apple
            this.apple = null;

            // Declare a bonus apple
            this.bonusApple = null;

            // TODO: Dirty way of appending of the score screen to canvas, centralize
            // TODO: Fix the positioning (dirty way)
            var scoreScreenHTML = this.scoreBoard.getHtml();
            var body = getBody();
            body.appendChild(scoreScreenHTML);

            // Create and build the menus
            this.menu = null;
            this.pausedGameMenu = null;
            buildMenus(this);
            body.appendChild(this.menu.getHtml());

            // Center the menu
            this.menu.center();

            // Create the control module
            this.manipulator = new Manipulator();

            // Set the command listener
            this.manipulator.setCommandListener(executeCommand, this);
            this.manipulator.setControls(menuControls);

            reset(this);
        }

        function updateThen(game) {
            game.then = timeNow();
        }

        /**
         * @param {Game} game
         */
        function buildNewGameMenu(game) {
            var newGameMenu = new Menu(game.graphics);

            // TODO: Centralize menu's style
            var menuFontSize = 48;
            var menuFontFace = "Wendy";
            var menuDefaultFontColor = "#FFFFFF";

            newGameMenu.addItem(new DiscoSnakeMenuItem(CommandCode.CONTINUE_GAME,
                "START GAME", menuFontSize, menuFontFace, menuDefaultFontColor, 600));
            newGameMenu.setItemSelectedListener(executeCommand, game);

            // Set menu to the new game menu by default since no game has been started
            game.menu = newGameMenu;
            var body = getBody();
            body.appendChild(newGameMenu.getHtml());

            newGameMenu.reveal();
            newGameMenu.center();
        }

        // Build the paused game menu
        function buildPausedGameMenu(game) {
            var pausedGameMenu = new Menu(game.graphics);

            // TODO: Centralize menu's style [2]
            var menuFontSize = 48;
            var menuFontFace = "Wendy";
            var menuDefaultFontColor = "#FFFFFF";

            pausedGameMenu.addItem(new DiscoSnakeMenuItem(CommandCode.CONTINUE_GAME,
                "CONTINUE", menuFontSize, menuFontFace, menuDefaultFontColor, 600));
            pausedGameMenu.addItem(new DiscoSnakeMenuItem(CommandCode.NEW_GAME,
                "NEW GAME", menuFontSize, menuFontFace, menuDefaultFontColor, 600));
            pausedGameMenu.setItemSelectedListener(executeCommand, game);

            game.pausedGameMenu = pausedGameMenu;

            var body = getBody();

            body.appendChild(pausedGameMenu.getHtml());

            pausedGameMenu.center();
        }

        // Build all the menus
        function buildMenus(game) {

            // Build the new game menu
            buildNewGameMenu(game);

            // Build the paused game menu
            buildPausedGameMenu(game);

        }

        function incrementScore(game) {
            game.scoreBoard.incrementScore();
        }

        function changeScore(game, difference) {
            game.scoreBoard.changeScore(difference);
        }

        function resetScore(game) {
            game.scoreBoard.reset();
        }

        function updateThenTimestamp(game) {
            game.then = timeNow();
        }

        function resetSnake(game) {
            var midWidthPosition = Math.round(game.cellsWidth / 2);
            var midHeightPosition = Math.round(game.cellsHeight / 2);

            // Initialize the snake
            game.snake = new Snake(game.cellSize, midWidthPosition, midHeightPosition, SNAKE_LENGTH_DEFAULT);
            game.snake.setAppleEatenListener(appleEatenListener);
            game.snake.setBonusAppleEatenListener(bonusAppleEatenListener);
        }

        function resetAudio(game) {
            game.audio.currentTime = 0;
        }

        function reset(game) {
            updateThenTimestamp(game);
            resetScore(game);
            resetSnake(game);
            dropApple(game);
            dropBonusApple(game);
            resetAudio(game);
        }

        function executeCommand(game, commandCode) {

            var menu = game.menu;

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

            var snake = game.snake;

            snake.executeCommand(commandCode);
        }

        function dropApple(game) {
            game.apple = new Apple(game.cellSize, -1, -1);
            game.apple.placeRandomly(game);
        }

        function appleEatenListener(game) {
            var drunkBonus = Math.ceil(game.snake.getDrunkness() / 5);
            var scoreIncrease = 1 + drunkBonus;
            changeScore(game, scoreIncrease);
            dropApple(game);
        }

        function dropBonusApple(game) {
            game.bonusApple = new BonusApple(game.cellSize, -1, -1);
            game.bonusApple.placeRandomly(game);
        }

        function bonusAppleEatenListener(game) {

            incrementScore(game);
            dropBonusApple(game);
        }

        function moveSnake(game) {
            game.snake.move(game);
        }

        function updateBonusApple(game) {
            game.bonusApple.update(game);
        }

        function update(game) {
            moveSnake(game);

            updateBonusApple(game);
        }

        function render(game) {
            var graphics = game.graphics;
            var snake = game.snake;

            // TODO: Separate the implementation of effects of substances
            // Act according to the substances
            var snakeDrunkness = snake.getDrunkness();

            graphics.reset();

            // Draw the apples
            if (!game.isStopped()) {
                game.apple.draw(graphics);
                game.bonusApple.draw(graphics);
            }

            // Draw the snake
            game.snake.draw(graphics, snakeDrunkness);
        }

        // Toggle the pause state (pause / unpause)
        function togglePause(game) {
            if (game.isStopped()) {
                game.start();
            } else {
                game.pause();
            }
        }

        Game.prototype.start = function() {
            this.stopped = false;
            this.manipulator.setControls(defaultGameControls);

            // Set up the menu
            if (this.menu !== this.pausedGameMenu) {
                this.menu.hide();
                this.menu = this.pausedGameMenu;
            }

            this.menu.focusFirstItem();

            this.menu.hide();

            if (!ANGRY_STACY_MODE) {
                this.audio.play();
            }

            updateThen(this);

            this.run();
        };

        // TODO: implement modes for switching the controls etc
        Game.prototype.pause = function() {

            cancelNextFrame(this);

            this.manipulator.setControls(menuControls);

            this.audio.pause();

            this.menu.reveal();

            this.stopped = true;
        };

        Game.prototype.isStopped = function() {
            return this.stopped;
        };

        function cancelNextFrame(game) {
            var lastRequestId = game.lastRequestId;

            cancelAnimationFrame(lastRequestId);

            game.lastRequestId = 0;
        }

        function requestNextFrame(game, runner) {
            game.lastRequestId = requestAnimationFrame(runner);
            game.frameNumber++;
        }

        // Run the game repeatedly and continuously. NICE SHOT MAN.
        Game.prototype.run = function() {

            // Bind this
            var run = this.run.bind(this);

            // Prepare the frame processing method
            var game = this;

            var processFrame = function() {
                updateThenTimestamp(game);
                requestNextFrame(game, run);
                update(game);
                render(game);
            };

            // Calculate the delay for previous frame processing
            var delay = 0;
            var currentFrameDuration = (1000 / this.fpsRate);

            // If the game is running, process frame
            var gameStopped = this.isStopped();
            if (!gameStopped) {
                delay = timeNow() - this.then;
                currentFrameDuration -= delay;
                setTimeout(processFrame, currentFrameDuration);
            }
        };

        Game.prototype.getCellsWidth = function() {
            return this.cellsWidth;
        };

        Game.prototype.getCellsHeight = function() {
            return this.cellsHeight;
        };

        Game.prototype.getFps = function() {
            return this.fpsRate;
        };

        Game.prototype.getApple = function() {
            return this.apple;
        };

        Game.prototype.getBonusApple = function() {
            return this.bonusApple;
        };

        Game.prototype.appleMisplaced = function(newApple) {
            return (newApple.doesCollideWith(this.apple) || newApple.doesCollideWith(this.bonusApple));
        };

        return Game;
    });