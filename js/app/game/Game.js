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

        var Graphics = engine.graphics.Graphics;
        var Manipulator = engine.input.Manipulator;
        var Menu = engine.ui.Menu;
        var TimeUtils = engine.utils.TimeUtils;
        var HtmlUtils = engine.utils.HtmlUtils;
        var cancelAnimationFrame = TimeUtils.cancelAnimationFrame;
        var requestAnimationFrame = TimeUtils.requestAnimationFrame;
        var timeNow = TimeUtils.timeNow;
        var getBody = HtmlUtils.getBody;

        var SNAKE_LENGTH_DEFAULT = 4;
        var SILENT_MODE = true;

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
            this.scoreBoard = new ScoreBoard();

            this.audio = new Audio("audio/scooter-last-minute.mp3");
            var game = this;
            this.audio.addEventListener("ended", function() {
                resetAudio(game);
                game.audio.play();
            }, false);

            var width = cellsWidth * cellSize + 1;
            var height = cellsHeight * cellSize + 1;
            var backgroundColor = "#000000";
            this.graphics = new Graphics(width, height, backgroundColor);
            this.snake = null;
            this.apple = null;
            this.bonusApple = null;

            // TODO: Dirty way of appending of the score screen to canvas, centralize
            // TODO: Fix the positioning (dirty way)
            var scoreScreenHTML = this.scoreBoard.getHtml();
            var body = getBody();
            body.appendChild(scoreScreenHTML);

            this.menu = null;
            this.pausedGameMenu = null;
            buildMenus(this);
            body.appendChild(this.menu.getHtml());
            this.menu.center();

            this.manipulator = new Manipulator();
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
            // TODO: Centralize menu's style
            var menuFontSize = 48;
            var menuFontFace = "Wendy";
            var menuDefaultFontColor = "#FFFFFF";
            var newGameMenu = new Menu(game.graphics);

            newGameMenu.addItem(new DiscoSnakeMenuItem(CommandCode.CONTINUE_GAME,
                "START GAME", menuFontSize, menuFontFace, menuDefaultFontColor, 600));
            newGameMenu.setItemSelectedListener(executeCommand, game);
            getBody().appendChild(newGameMenu.getHtml());
            newGameMenu.center();
            newGameMenu.reveal();
            game.menu = newGameMenu;
        }

        // Build the paused game menu
        function buildPausedGameMenu(game) {
            // TODO: Centralize menu's style [2]
            var menuFontSize = 48;
            var menuFontFace = "Wendy";
            var menuDefaultFontColor = "#FFFFFF";
            var pausedGameMenu = new Menu(game.graphics);

            pausedGameMenu.addItem(new DiscoSnakeMenuItem(CommandCode.CONTINUE_GAME,
                "CONTINUE", menuFontSize, menuFontFace, menuDefaultFontColor, 600));
            pausedGameMenu.addItem(new DiscoSnakeMenuItem(CommandCode.NEW_GAME,
                "NEW GAME", menuFontSize, menuFontFace, menuDefaultFontColor, 600));
            pausedGameMenu.setItemSelectedListener(executeCommand, game);
            getBody().appendChild(pausedGameMenu.getHtml());
            pausedGameMenu.center();
            game.pausedGameMenu = pausedGameMenu;
        }

        function buildMenus(game) {
            buildNewGameMenu(game);
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
            var drunkBonus = Math.ceil(Math.pow(game.snake.getDrunkness() / 80, 2));
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
            var snakeDrunkness = snake.getDrunkness();

            graphics.reset();

            if (!game.isStopped()) {
                game.apple.draw(graphics);
                game.bonusApple.draw(graphics);
            }

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

            if (!SILENT_MODE) {
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
            cancelAnimationFrame(game.lastRequestId);
            game.lastRequestId = 0;
        }

        function requestNextFrame(game, runner) {
            game.lastRequestId = requestAnimationFrame(runner);
            game.frameNumber += 1;
        }

        // Run the game repeatedly and continuously. NICE SHOT MAN.
        Game.prototype.run = function() {
            var run = this.run.bind(this);
            var game = this;

            var processFrame = function() {
                updateThenTimestamp(game);
                requestNextFrame(game, run);
                update(game);
                render(game);
            };

            var delay = 0;
            var currentFrameDuration = (1000 / this.fpsRate);

            if (!this.isStopped()) {
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