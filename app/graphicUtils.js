define([
		'./Color'
	],
	function (
		Color
		) {

		function getRandomCssColor () {
			var color = Color.getRandomColor();

			return color.getHexString();
		}

		function getRandomPsychedelicCssColor () {
			var color = Color.getRandomPsychedelicColor();

			return color.getHexString();
		}

		function getWindowSize () {
			return {
				width: window.innerWidth || document.body.clientWidth,
				height: window.innerHeight || document.body.clientHeight
			}
		}

		return {
			getRandomCssColor: getRandomCssColor,
			getRandomPsychedelicCssColor: getRandomPsychedelicCssColor,
			getWindowsSize: getWindowSize
		};
	});