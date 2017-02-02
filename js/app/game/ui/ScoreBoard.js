define([
        'engine'
    ],
    function(
        engine
    ) {
        'use strict';
        var TextObject = engine.graphics.TextObject;

        /**
         * @constructor
         */
        function ScoreBoard() {
            this.score = 0;
            this.scoreScreen = createScoreScreen(this.score);
            this.updateHtmlStyle();
        }

        /**
         * @param scoreCount
         *
         * @returns {engine.graphics.TextObject}
         */
        function createScoreScreen(scoreCount) {
            var scoreFontSize = 72;
            var scoreX = 20;
            var scoreY = scoreFontSize / 2;
            var scoreColor = '#999999';
            var scoreFontFamily = 'Wendy';
            var scoreScreen = new TextObject('' + scoreCount, scoreFontSize, scoreFontFamily, scoreColor);
            scoreScreen.setX(scoreX);
            scoreScreen.setY(scoreY);

            return scoreScreen;
        }

        /**
         * @param {ScoreBoard} scoreBoard
         */
        function updateScore(scoreBoard) {
            var scoreScreen = scoreBoard.scoreScreen;
            var scoreText = '' + scoreBoard.score;

            scoreScreen.setText(scoreText);
        }

        /**
         */
        ScoreBoard.prototype.reset = function() {
            this.score = 0;
            updateScore(this);
        };

        /**
         * @returns {number}
         */
        ScoreBoard.prototype.getScore = function() {
            return this.score;
        };

        /**
         * @param {number} difference
         */
        ScoreBoard.prototype.changeScore = function(difference) {
            this.score += difference;
            updateScore(this);
        };

        /**
         */
        ScoreBoard.prototype.incrementScore = function() {
            this.changeScore(1);

        };

        /**
         */
        ScoreBoard.prototype.decrementScore = function() {
            this.changeScore(-1);
        };

        /**
         * @param {Graphics} gameGraphics
         */
        ScoreBoard.prototype.draw = function(gameGraphics) {
            this.scoreScreen.draw(gameGraphics);
        };

        /**
         * @returns {HTMLElement}
         */
        ScoreBoard.prototype.getHtml = function() {
            return this.scoreScreen.getHtml();
        };

        /**
         */
        ScoreBoard.prototype.updateHtmlStyle = function() {
            this.getHtml().style.left = '24px';
        };

        return ScoreBoard;
    });