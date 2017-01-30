define([
        'engine'
    ],
    function(
        engine
        ) {
        'use strict';
        var TextObject = engine.graphics.TextObject;

        function ScoreBoard() {
            this.score = 0;

            var scoreFontSize = 72;
            var scoreX = 20;
            var scoreY = scoreFontSize / 2;
            var scoreText = '' + this.score;
            var scoreColor = '#999999';
            var scoreFontFamily = 'Wendy';

            var scoreScreen = new TextObject(scoreText, scoreFontSize, scoreFontFamily, scoreColor);
            scoreScreen.setX(scoreX);
            scoreScreen.setY(scoreY);

            this.scoreScreen = scoreScreen;
            this.updateHtmlStyle();
        }

        function updateScore(scoreBoard) {
            var scoreScreen = scoreBoard.scoreScreen;
            var scoreText = '' + scoreBoard.score;

            scoreScreen.setText(scoreText);
        }

        ScoreBoard.prototype.reset = function() {
            this.score = 0;
            updateScore(this);
        }

        ScoreBoard.prototype.getScore = function() {
            return this.score;
        }

        ScoreBoard.prototype.changeScore = function(difference) {
            this.score += difference;
            updateScore(this);
        }

        ScoreBoard.prototype.incrementScore = function() {
            this.changeScore(1);

        }

        ScoreBoard.prototype.decrementScore = function() {
            this.changeScore(-1);
        }

        ScoreBoard.prototype.draw = function(gameGraphics) {
            this.scoreScreen.draw(gameGraphics);
        }

        ScoreBoard.prototype.getHtml = function() {
            return this.scoreScreen.getHtml();
        }

        ScoreBoard.prototype.updateHtmlStyle = function() {
            var html = this.getHtml();

            html.style.left = '24px';
        }

        return ScoreBoard;
    });