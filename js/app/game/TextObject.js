define([
		'graphics/DisplayObject'
	],
	function (
		DisplayObject
		) {

		function TextObject(text, fontSize, fontFamily, fontColor, maxWidth) {
			this.x = 0;
			this.y = 0;

			this.text = text;

			this.fontSize = fontSize || 12;
			this.fontFamily = fontFamily || 'Arial';
			this.fontColor = fontColor || 'black';

			this.maxWidth = maxWidth || (5 * fontSize);

			this.width = 0;
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

		TextObject.prototype.getWidth = function () {
			return this.width;
		}

		TextObject.prototype.getHeight = function () {
			return this.fontSize;
		}

		TextObject.prototype.draw = function (graphics) {
			graphics.drawText(this.getX(), this.getY(), this.text, this.fontSize, this.fontFamily, this.fontColor, this.maxWidth);
		}

		return TextObject;
	});