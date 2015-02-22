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

			this.html = document.createElement('div');
			this.updateHTML();

		}

		TextObject.prototype = Object.create(DisplayObject.prototype);
		TextObject.prototype.constructor = TextObject;

		TextObject.prototype.setText = function (text) {
			this.text = text;
			updateHTMLText(this);
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
			var width = graphics.getTextWidth(this.text, this.fontSize, this.fontFamily);

			return width;
		}

		TextObject.prototype.draw = function (graphics) {
			var width = this.getWidth(graphics);

			this.setWidth(width);

			var textX = this.getX();
			var textY = this.getY() + (this.fontSize / 2.0);

			graphics.drawText(textX, textY, this.text, this.fontSize, this.fontFamily, this.fontColor, this.maxWidth);
		}

		TextObject.prototype.getHTML = function () {
			return this.html;
		}

		// TODO: re-consider methods' publicity
		function updateHTMLText (textObject) {
			textObject.html.innerHTML = textObject.text;
		}

		TextObject.prototype.updateHTMLStyle = function () {

			var html = this.html;

			html.className = 'text-object unselectable default-cursor';
			html.style.fontSize = this.fontSize + 'px';
			html.style.color = this.fontColor;
			html.style.fontFamily = this.fontFamily;

			return html;
		}

		TextObject.prototype.updateHTML = function () {
			updateHTMLText(this);
			this.updateHTMLStyle();
		}

		return TextObject;
	});