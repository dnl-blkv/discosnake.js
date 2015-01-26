define([
		'engine/graphics/DisplayObject'
	],
	function (
		DisplayObject
		) {
		'use strict';

		function TextObject(text, fontSize, fontFamily, fontColor, maxWidth) {
			DisplayObject.call(this, 0, 0, 0, 0);

			// TextObject Specifics
			this.text = text;

			this.setFontSize(fontSize || 12);

			this.fontFamily = fontFamily || 'Arial';
			this.fontColor = fontColor || 'black';
			this.maxWidth = maxWidth || (5 * fontSize);

		}

		TextObject.prototype = Object.create(DisplayObject.prototype);
		TextObject.prototype.constructor = TextObject;

		TextObject.prototype.setText = function (text) {
			this.text = text;
		}

		TextObject.prototype.getText = function () {
			return this.text;
		}

		TextObject.prototype.setFontSize = function (fontSize) {
			this.fontSize = fontSize;

			this.setHeight(fontSize);
		}

		TextObject.prototype.getFontSize = function () {
			return this.fontSize;
		}

		TextObject.prototype.setFontName = function (fontName) {
			this.fontFamily = fontName;
		}

		TextObject.prototype.getFontName = function () {
			return this.fontFamily;
		}

		TextObject.prototype.setFontColor = function (fontColor) {
			this.fontColor = fontColor;
		}

		TextObject.prototype.getFontColor = function () {
			return this.fontColor;
		}

		TextObject.prototype.setMaxWidth = function (maxWidth) {
			this.maxWidth = maxWidth;
		}

		TextObject.prototype.getMaxWidth = function () {
			return this.maxWidth;
		}

		TextObject.prototype.getWidth = function (graphics) {
			var context = graphics.getContext();

			var fontString = graphics.buildFontString(this.fontSize, this.fontFamily);

			context.font = fontString;

			var text = this.text;

			var textMetrics = context.measureText(text);

			var width = textMetrics.width;

			return width;
		}

		TextObject.prototype.draw = function (graphics) {
			var width = this.getWidth(graphics);

			this.setWidth(width);

			graphics.drawText(this.getX(), this.getY(), this.text, this.fontSize, this.fontFamily, this.fontColor, this.maxWidth);
		}

		return TextObject;
	});