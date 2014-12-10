define([
	],
	function (
		) {

		function TextObject (x, y, text, fontSize, fontFamily, fontColor, maxWidth) {
			this.x = x;
			this.y = y;

			this.text = text;

			this.fontSize = fontSize || 12;
			this.fontFamily = fontFamily || 'Arial';
			this.fontColor = fontColor || 'black';

			this.maxWidth = maxWidth || (5 * fontSize);

			this.width = 0;
		}

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

		TextObject.prototype.draw = function (gameGraphics) {
			gameGraphics.drawText(this.x, this.y, this.text, this.fontSize, this.fontFamily, this.fontColor, this.maxWidth);
		}

		return TextObject;
	});