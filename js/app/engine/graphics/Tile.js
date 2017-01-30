define([
        'engine/graphics/DisplayObject'
    ],
    function(
        DisplayObject
    ) {
        'use strict';

        /**
         * @param {Number} size
         * @param {Number} cellX
         * @param {Number} cellY
         * @param {string} fillStyle
         * @param {string} lineStyle
         *
         * @constructor
         */
        function Tile(size, cellX, cellY, fillStyle, lineStyle) {
            DisplayObject.call(this, 0, 0, 0, 0);
            this.setSize(size);
            this.setCellX(cellX);
            this.setCellY(cellY);
            this.fillStyle = fillStyle;
            this.lineStyle = lineStyle;
        }

        Tile.prototype = Object.create(DisplayObject.prototype);
        Tile.prototype.constructor = Tile;

        /**
         * @param {Graphics} graphics
         */
        Tile.prototype.draw = function(graphics) {
            var size = this.getSize();
            var xPosition = this.getX();
            var yPosition = this.getY();
            var fillStyle = this.getFillStyle();
            var lineStyle = this.getLineStyle();

            graphics.drawRect(xPosition, yPosition, size, size, fillStyle, lineStyle);
        };

        /**
         * @param {Number} size
         */
        Tile.prototype.setSize = function(size) {
            this.size = size;
            this.setWidth(size);
            this.setHeight(size);
        };

        /**
         * @returns {Number}
         */
        Tile.prototype.getSize = function() {
            return this.size;
        };

        /**
         * @param {Number} cellX
         * @param {number=} gridWidth
         */
        Tile.prototype.setCellX = function(cellX, gridWidth) {
            // TODO: Tile should be assigned to a grid, or should be provided with a grid object
            if (gridWidth !== undefined) {
                this.cellX = (cellX + gridWidth) % gridWidth;
            } else {
                this.cellX = cellX;
            }

            this.setX(this.cellX * this.size);
        };

        /**
         * @returns {Number}
         */
        Tile.prototype.getCellX = function() {
            return this.cellX;
        };

        /**
         * @param {Number} cellY
         * @param {number=} gridHeight
         */
        Tile.prototype.setCellY = function(cellY, gridHeight) {
            // TODO: Tile should be assigned to a grid, or should be provided with a grid object
            if (gridHeight !== undefined) {
                this.cellY = (cellY + gridHeight) % gridHeight;
            } else {
                this.cellY = cellY;
            }

            this.setY(this.cellY * this.size);
        };

        /**
         * @returns {Number}
         */
        Tile.prototype.getCellY = function() {
            return this.cellY;
        };

        /**
         * @param {string} fillStyle
         */
        Tile.prototype.setFillStyle = function(fillStyle) {
            this.fillStyle = fillStyle;
        };

        /**
         * @returns {string}
         */
        Tile.prototype.getFillStyle = function() {
            return this.fillStyle;
        };

        /**
         * @param {string} lineStyle
         */
        Tile.prototype.setLineStyle = function(lineStyle) {
            this.lineStyle = lineStyle;
        };

        /**
         * @returns {string}
         */
        Tile.prototype.getLineStyle = function() {
            return this.lineStyle;
        };

        /**
         * @param {Tile} anotherTile
         *
         * @returns {boolean}
         */
        Tile.prototype.doesCollideWith = function(anotherTile) {
            var anotherTilePassed = (this !== anotherTile);
            var xPositionMatches = false;
            var yPositionMatches = false;

            try {
                xPositionMatches = (this.cellX === anotherTile.cellX);
                yPositionMatches = (this.cellY === anotherTile.cellY);
            } catch (e) {
                console.log('A null tile reference passed to doesCollideWith method.');
            }

            return (anotherTilePassed && xPositionMatches && yPositionMatches);
        };

        return Tile;
    });