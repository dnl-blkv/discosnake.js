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

		function relCoords(element, absoluteX, absoluteY){
			var totalOffsetX = 0;
			var totalOffsetY = 0;
			var canvasX, canvasY;
			var currentElement = element;

			do{
				totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
				totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
			}
			while(currentElement = currentElement.offsetParent);

			canvasX = absoluteX - totalOffsetX;
			canvasY = absoluteY - totalOffsetY;

			return {
				x: canvasX,
				y: canvasY
			}
		}

		function relMouseCoords (element, event) {
			var absoluteX = event.pageX;
			var absoluteY = event.pageY;

			return relCoords(element, absoluteX, absoluteY);
		}

		function relLastTouchCoords (element, touchEvent) {
			var lastTouchId = touchEvent.touches.length - 1;

			return relTouchCoords(element, touchEvent.touches[lastTouchId]);
		}

		function relTouchCoords (element, touch) {
			var absoluteX = touch.clientX;
			var absoluteY = touch.clientY;

			return relCoords(element, absoluteX, absoluteY);
		}

		return {
			getRandomCssColor: getRandomCssColor,
			getRandomPsychedelicColor: getRandomPsychedelicColor,
			getWindowsSize: getWindowSize,
			relCoords: relCoords,
			relLastTouchCoords: relLastTouchCoords,
			relMouseCoords: relMouseCoords,
			relTouchCoords: relTouchCoords
		};
	});