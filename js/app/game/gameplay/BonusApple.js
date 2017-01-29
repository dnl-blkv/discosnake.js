define([
        './Apple',
        './AppleSubstance',
        'engine'
    ],
    function(
        Apple,
        AppleSubstance,
        engine
    ) {
        'use strict';

        var numberUtils = engine.utils.numberUtils;

        var getRandomInteger = numberUtils.getRandomInteger;

        function BonusApple(size, cellX, cellY) {

            // Call the super constructor
            Apple.call(this, size, cellX, cellY);

            // Fill the apple with alcohol
            this.substance = AppleSubstance.ALCOHOL;
            this.fillStyle = '#2000ff';
            this.lineStyle = '#1d00e6';

            // Declare the frames left counter
            this.framesLeft = 0;
        }

        BonusApple.prototype = Object.create(Apple.prototype);
        BonusApple.prototype.constructor = BonusApple;

        BonusApple.prototype.update = function(game) {
            this.framesLeft --;

            if (this.framesLeft <= 0) {
                this.placeRandomly(game);
            }
        }

        function calculateFramesLeft(game) {
            var gameCellsWidth = game.getCellsWidth();
            var gameCellsHeight = game.getCellsHeight();
            var maxDimension = ((gameCellsWidth > gameCellsHeight) ? gameCellsWidth : gameCellsHeight);

            return 1.5 * maxDimension;
        }

        BonusApple.prototype.placeRandomly = function(game) {
            this.framesLeft = calculateFramesLeft(game);

            Apple.prototype.placeRandomly.call(this, game);

            if (game.appleMisplaced(this)) {
                this.placeRandomly(game);
            }
        }

        BonusApple.prototype.getSubstance = function() {
            return this.substance;
        }

        return BonusApple;
    });