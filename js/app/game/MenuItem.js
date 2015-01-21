define([
		'engine/graphics/TextObject'
	],
	function (
		TextObject
		) {
		'use strict';

		function MenuItem (text, fontSize, fontFamily, defaultColor, selectedColor, maxWidth) {
			// Save the colors
			this.defaultColor = defaultColor;
			this.selectedColor = selectedColor;

			// Create the text object
			this.textObject = new TextObject(text, fontSize, fontFamily, defaultColor, maxWidth);

		}

		return MenuItem;
	});