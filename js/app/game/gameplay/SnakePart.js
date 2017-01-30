define([
        'engine'
    ],
    function(
        engine
        ) {
        'use strict';

        var Tile = engine.graphics.Tile;
        var Color = engine.graphics.Color;
        var colorUtils = engine.utils.colorUtils;

        // Access the required methods
        var getRandomPsychedelicColor = colorUtils.pickRandomPsychedelicColor;

        function SnakePart(size, cellX, cellY) {
            // Convert the basic properties
            this.color = getRandomPsychedelicColor();
            this.previousPart = null;
            this.nextPart = null;

            var fillStyle = this.color.generateHexString();
            var lineStyle = '#ffffff';

            // Call the super constructor
            Tile.call(this, size, cellX, cellY, fillStyle, lineStyle);
        }

        SnakePart.prototype = Object.create(Tile.prototype);
        SnakePart.prototype.constructor = SnakePart;

        SnakePart.prototype.setPreviousPart = function(previousPart) {
            this.previousPart = previousPart;
        };

        SnakePart.prototype.getPreviousPart = function() {
            return this.previousPart;
        };

        SnakePart.prototype.setNextPart = function(nextPart) {
            this.nextPart = nextPart;
        };

        SnakePart.prototype.getNextPart = function() {
            return this.nextPart;
        };

        SnakePart.prototype.getColor = function() {
            return this.color;
        };

        SnakePart.prototype.moveRight = function(game) {
            this.setCellX(this.cellX + 1, game.getCellsWidth());
        };

        SnakePart.prototype.moveLeft = function(game) {
            this.setCellX(this.cellX - 1, game.getCellsWidth());
        };

        SnakePart.prototype.moveDown = function(game) {
            this.setCellY(this.cellY + 1, game.getCellsHeight());
        };

        SnakePart.prototype.moveUp = function(game) {
            this.setCellY(this.cellY - 1, game.getCellsHeight());
        };

        SnakePart.prototype.dragTo = function(game, otherSnakePart) {
            this.setCellX(otherSnakePart.getCellX(), game.getCellsWidth());
            this.setCellY(otherSnakePart.getCellY(), game.getCellsHeight());
        };

        SnakePart.prototype.updateColor = function() {
            var randomColor = getRandomPsychedelicColor();

            this.setFillStyle(randomColor.generateHexString());
        };

        SnakePart.prototype.draw = function(gameGraphics) {
            Tile.prototype.draw.call(this, gameGraphics);
        };

        SnakePart.prototype.drawDrunkEffect = function(gameGraphics, drunkness) {
            var xPosition = this.getX() - this.getSize();
            var yPosition = this.getY() - this.getSize();
            var size = this.getSize() * 3;

            // Set the effect transparency
            var alpha = drunkness / 300;
            var effectFillStyle = Color.createFromHexString(this.getFillStyle()).generateRGBAString(alpha);

            gameGraphics.drawRect(xPosition, yPosition, size, size, effectFillStyle, effectFillStyle);
        };

        return SnakePart;
    });