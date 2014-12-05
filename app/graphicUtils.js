define([
		'./numberUtils'
	],
	function (
		numberUtils
		) {
		var getRandomInteger = numberUtils.getRandomInteger;

		function getRandomColor () {
			var letters = '0123456789ABCDEF'.split('');
			var color = '#';
			for (var i = 0; i < 6; i++) {
				var randomLetterIndex = getRandomInteger(0, 16);

				color += letters[randomLetterIndex];
			}
			return color;
		}

		function getWindowSize () {
			return {
				width: window.innerWidth || document.body.clientWidth,
				height: window.innerHeight || document.body.clientHeight
			}
		}

		return {
			getRandomColor: getRandomColor,
			getWindowsSize: getWindowSize
		};
	});