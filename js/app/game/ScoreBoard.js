define([
		'engine'
	],
	function (
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
		}

		function updateScore(scoreBoard) {
			var scoreScreen = scoreBoard.scoreScreen;

			scoreScreen.text = '' + scoreBoard.score;
		}

		ScoreBoard.prototype.getScore = function () {
			return this.score;
		}
		
		ScoreBoard.prototype.incrementScore = function () {
			this.score ++;
			updateScore(this);

		}

		ScoreBoard.prototype.decrementScore = function () {
			this.score --;
			updateScore(this);
		}

		ScoreBoard.prototype.draw = function (gameGraphics) {
			this.scoreScreen.draw(gameGraphics);
		}

		return ScoreBoard;
	});