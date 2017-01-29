define([
        './AppleSubstance',
        'game/commands/CommandCode',
        './Direction',
        './SnakePart'
    ],
    function (
        AppleSubstance,
        CommandCode,
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

            this.bonusAppleEatenListener = null;

            this.drunkness = 0;

        }

        Snake.prototype.getDrunkness = function () {
            return this.drunkness;
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

        Snake.prototype.draw = function (gameGraphics, drunkness) {

            // Update the snake parts' colors
            var currentPart = this.getHead();

            do {
                currentPart.updateColor(gameGraphics);
                currentPart = currentPart.getNextPart();
            } while (currentPart !== null);

            // Draw additional effects for the snake
            if (drunkness > 0) {
                currentPart = this.getTail();

                do {
                    currentPart.drawDrunkEffect(gameGraphics, drunkness);
                    currentPart = currentPart.getPreviousPart();
                } while (currentPart !== null);
            }

            // Draw the snake itself
            currentPart = this.getHead();

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

        Snake.prototype.setBonusAppleEatenListener = function (bonusAppleEatenListener) {
            this.bonusAppleEatenListener = bonusAppleEatenListener;
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
            var direction = this.getDirection();

            switch (direction) {
                case Direction.LEFT:
                    this.moveLeft(game);
                    break;
                case Direction.UP:
                    this.moveUp(game);
                    break;
                case Direction.RIGHT:
                    this.moveRight(game);
                    break;
                case Direction.DOWN:
                    this.moveDown(game);
                    break;
                default: break;
            }

            var apple = game.getApple();
            var appleEaten = this.isAppleEaten(apple);
            var appleEatenListener = this.appleEatenListener;

            var bonusApple = game.getBonusApple();
            var bonusAppleEaten = this.isAppleEaten(bonusApple);
            var bonusAppleEatenListener = this.bonusAppleEatenListener;

            if (appleEaten || bonusAppleEaten) {
                this.addPart();

                if (bonusAppleEaten) {
                    // Apply appropriate effects to the snake
                    applyBonusAppleEffects(this, bonusApple);
                    bonusAppleEatenListener.call(bonusAppleEatenListener, game);
                } else {
                    // Decrease effects level
                    if (this.drunkness > 0) {
                        this.drunkness --;
                        console.log(this.drunkness);
                    }

                    appleEatenListener.call(appleEatenListener, game);
                }
            }

        }

        Snake.prototype.executeCommand = function (commandCode) {
            switch (commandCode) {
                case CommandCode.DIRECT_SNAKE_LEFT:
                    this.setDirection(Direction.LEFT);
                    break;

                case CommandCode.DIRECT_SNAKE_UP:
                    this.setDirection(Direction.UP);
                    break;

                case CommandCode.DIRECT_SNAKE_RIGHT:
                    this.setDirection(Direction.RIGHT);
                    break;

                case CommandCode.DIRECT_SNAKE_DOWN:
                    this.setDirection(Direction.DOWN);
                    break;

                default:
                    break;
            }
        }

        function applyBonusAppleEffects (snake, bonusApple) {
            var substance = bonusApple.getSubstance();

            switch (substance) {
                case AppleSubstance.ALCOHOL:
                    snake.drunkness += 4;

                    if (snake.drunkness > 8) {
                        snake.drunkness = 8;
                    }
                    break;

                default:
                    break;
            }
        }

        return Snake;
    });