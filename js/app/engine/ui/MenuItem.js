define([
		'engine/graphics/DisplayObject',
		'engine/graphics/TextObject'
	],
	function (
		DisplayObject,
		TextObject
		) {
		'use strict';

		function MenuItem (text, fontSize, fontFamily, defaultColor, focusedColor, maxWidth) {
			DisplayObject.call(this, 0, 0, 0, 0);

			// Save the colors
			this.defaultColor = defaultColor;
			this.focusedColor = focusedColor;
			this.nextItem = null;
			this.previousItem = null;
			this.focused = false;

			// Create the text object
			this.textObject = new TextObject(text, fontSize, fontFamily, defaultColor, maxWidth);
			this.setHeight(this.textObject.getHeight());
		}

		MenuItem.prototype = Object.create(DisplayObject.prototype);
		MenuItem.prototype.constructor = MenuItem;

		function setTextColor (menuItem, textColor) {
			var textObject = menuItem.textObject;

			textObject.setFontColor(textColor);
		}

		MenuItem.prototype.getWidth = function (graphics) {
			return this.textObject.getWidth(graphics);
		}

		MenuItem.prototype.draw = function (graphics) {
			var width = this.getWidth(graphics);
			this.setWidth(width);

			this.textObject.setX(this.getX());
			this.textObject.setY(this.getY());

			this.textObject.draw(graphics);
		}

		MenuItem.prototype.focus = function () {
			this.focused = true;

			var focusedColor = this.focusedColor;

			setTextColor(this, focusedColor);
		}

		MenuItem.prototype.unfocus = function () {
			this.focused = false;

			var defaultColor = this.defaultColor;

			setTextColor(this, defaultColor);
		}

		MenuItem.prototype.isFocused = function () {
			return this.focused;
		}

		MenuItem.prototype.setNextItem = function (nextItem) {
			this.nextItem = nextItem;
		}

		MenuItem.prototype.getNextItem = function () {
			return this.nextItem;
		}

		MenuItem.prototype.setPreviousItem = function (previousItem) {
			this.previousItem = previousItem;
		}

		MenuItem.prototype.getPreviousItem = function () {
			return this.previousItem;
		}

		return MenuItem;
	});