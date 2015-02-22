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

		return {
			getRandomCssColor: getRandomCssColor,
			getRandomPsychedelicColor: getRandomPsychedelicColor
		};
	});