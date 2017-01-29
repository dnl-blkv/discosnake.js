define([
        'engine/graphics/DisplayObject'
    ],
    function(
        DisplayObject
        ) {
        'use strict';

        function Tile(size, cellX, cellY, fillStyle, lineStyle) {
            DisplayObject.call(this, 0, 0, 0, 0);

            // Modify the input parameters
            this.setSize(size);
            this.setCellX(cellX);
            this.setCellY(cellY);
            this.fillStyle = fillStyle;
            this.lineStyle = lineStyle;
        }

        // Derive from the DisplayObject
        Tile.prototype = Object.create(DisplayObject.prototype);
        Tile.prototype.constructor = Tile;

        /** Draw the a tile on a graphics */
        Tile.prototype.draw = function(graphics) {

            var xPosition = this.getX();
            var yPosition = this.getY();
            var size = this.getSize();
            var fillStyle = this.getFillStyle();
            var lineStyle = this.getLineStyle();

            graphics.drawRect(xPosition, yPosition, size, size, fillStyle, lineStyle);
        };

        /** Set tile's size */
        Tile.prototype.setSize = function(size) {
            this.size = size;

            // Set the basic parameters
            this.setWidth(size);
            this.setHeight(size);
        };

        Tile.prototype.getSize = function() {
            return this.size;
        };

        Tile.prototype.setCellX = function(cellX, gridWidth) {
            // If grid width is defined, control overflow
            // Otherwise, assume the grid is unlimited
            if (gridWidth !== undefined) {
                this.cellX = (cellX + gridWidth) % gridWidth;
            } else {
                this.cellX = cellX;
            }

            this.setX(this.cellX * this.size);
        };

        Tile.prototype.getCellX = function() {
            return this.cellX;
        };

        Tile.prototype.setCellY = function(cellY, gridHeight) {
            // If grid height is defined, control overflow
            // Otherwise, assume the grid is unlimited
            if (gridHeight !== undefined) {
                this.cellY = (cellY + gridHeight) % gridHeight;
            } else {
                this.cellY = cellY;
            }

            this.setY(this.cellY * this.size);
        };

        Tile.prototype.getCellY = function() {
            return this.cellY;
        };

        Tile.prototype.setFillStyle = function(fillStyle) {
            this.fillStyle = fillStyle;
        };

        Tile.prototype.getFillStyle = function() {
            return this.fillStyle;
        };

        Tile.prototype.setLineStyle = function(lineStyle) {
            this.lineStyle = lineStyle;
        };

        Tile.prototype.getLineStyle = function() {
            return this.lineStyle;
        };

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