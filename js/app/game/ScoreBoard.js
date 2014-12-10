define([
		'./TextObject',
		'utils/graphicUtils'
	],
	function (
		TextObject,
		graphicUtils
		) {
		// Access the required methods
		var getRandomPsychedelicCssColor = graphicUtils.getRandomPsychedelicCssColor;

		function ScoreBoard() {
			this.score = 0;

			var scoreFontSize = 72;
			var scoreX = 20;
			var scoreY = scoreFontSize / 2 + 20;
			var scoreText = '' + this.score;
			var scoreColor = '#999999';
			var scoreFontFamily = 'Wendy';

			this.scoreScreen = new TextObject(scoreX, scoreY, scoreText, scoreFontSize, scoreFontFamily, scoreColor);
		}

		function updateScore(scoreBoard) {
			var scoreScreen = scoreBoard.scoreScreen;

			scoreScreen.text = '' + scoreBoard.score;
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