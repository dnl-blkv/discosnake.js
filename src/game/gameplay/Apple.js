define([
        './AppleSubstance',
        'engine/graphics/Tile',
        'engine/utils/NumberUtils'
    ],
    function(
        AppleSubstance,
        Tile,
        NumberUtils
    ) {
        'use strict';

        /**
         *
         * @param size
         * @param cellX
         * @param cellY
         *
         * @constructor
         * @extends Tile
         */
        function Apple(size, cellX, cellY) {
            var fillStyle = '#20ff00';
            var lineStyle = '#1de600';

            Tile.call(this, size, cellX, cellY, fillStyle, lineStyle);
        }

        Apple.prototype = Object.create(Tile.prototype);
        Apple.prototype.constructor = Apple;

        Apple.prototype.placeRandomly = function(game) {
            var cellsWidth = game.getCellsWidth();
            var cellsHeight = game.getCellsHeight();

            this.setCellX(NumberUtils.getRandomInteger(0, cellsWidth), game.getCellsWidth());
            this.setCellY(NumberUtils.getRandomInteger(0, cellsHeight), game.getCellsHeight());

            if (game.isAppleMisplaced(this)) {
                this.placeRandomly(game);
            }
        };

        return Apple;
    });