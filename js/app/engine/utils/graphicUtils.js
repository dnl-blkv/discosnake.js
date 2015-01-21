define([
		'engine/graphics/Color'
	],
	function (
		Color
		) {
		'use strict';

		function getRandomCssColor () {
			var color = Color.getRandomColor();

			return color.getHexString();
		}

		function getRandomPsychedelicColor () {
			var color = Color.getRandomPsychedelicColor();

			return color;
		}

		function getWindowSize () {
			return {
				width: window.innerWidth || document.body.clientWidth,
				height: window.innerHeight || document.body.clientHeight
			}
		}

		return {
			getRandomCssColor: getRandomCssColor,
			getRandomPsychedelicColor: getRandomPsychedelicColor,
			getWindowsSize: getWindowSize
		};
	});