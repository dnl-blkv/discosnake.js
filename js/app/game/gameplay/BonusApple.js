define([
        './Apple',
        './AppleSubstance'
    ],
    function(
        Apple,
        AppleSubstance
    ) {
        'use strict';

        function BonusApple(size, cellX, cellY) {
            Apple.call(this, size, cellX, cellY);
            this.substance = AppleSubstance.ALCOHOL;
            this.fillStyle = '#2000ff';
            this.lineStyle = '#1d00e6';

            this.framesLeft = 0;
        }

        BonusApple.prototype = Object.create(Apple.prototype);
        BonusApple.prototype.constructor = BonusApple;

        BonusApple.prototype.update = function(game) {
            this.framesLeft -= 1;

            if (this.framesLeft <= 0) {
                this.placeRandomly(game);
            }
        };

        function calculateFramesLeft(game) {
            var gameCellsWidth = game.getCellsWidth();
            var gameCellsHeight = game.getCellsHeight();
            var maxDimension = ((gameCellsWidth > gameCellsHeight) ? gameCellsWidth : gameCellsHeight);

            return 1.5 * maxDimension;
        }

        BonusApple.prototype.placeRandomly = function(game) {
            this.framesLeft = calculateFramesLeft(game);

            Apple.prototype.placeRandomly.call(this, game);

            if (game.isAppleMisplaced(this)) {
                this.placeRandomly(game);
            }
        };

        BonusApple.prototype.getSubstance = function() {
            return this.substance;
        };

        return BonusApple;
    });