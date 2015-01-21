define([
		'graphics/DisplayObject'
	],
	function (
		DisplayObject
		) {
		'use strict';

		// TODO: Add some random element to the menu
		function Menu () {
			this.x = 0;
			this.y = 0;
			this.items = [];
		}

		Menu.prototype = Object.create(DisplayObject.prototype);
		Menu.prototype.constructor = Menu;

		Menu.prototype.center = function (graphics) {
			var width = this.getWidth();
			var graphicsWidth = graphics.getWidth();
			this.x = (graphicsWidth - width) / 2.0;

			var height = this.getHeight();
			var graphicsHeight = graphics.getHeight();
			this.y = (graphicsHeight - height) / 2.0;
		}

		Menu.prototype.getWidth = function () {
			var itemsCount = this.getItemsCount();
			var width = 0;
			var currentItemWidth = 0;

			for (var i = 0; i < itemsCount; i ++) {
				currentItemWidth = this.items[i].getWidth();

				if (width < currentItemWidth) {
					width = currentItemWidth;
				}
			}

			return width;
		}

		Menu.prototype.getHeight = function () {
			var itemsCount = this.getItemsCount();
			var height = 0;
			var currentItemHeight = 0;

			for (var i = 0; i < itemsCount; i ++) {
				currentItemHeight = this.items[i].getHeight();

				height += currentItemHeight;
			}

			return height;
		}

		Menu.prototype.addItem = function (item) {
			this.items.push(item);
		}

		Menu.prototype.getItemsCount = function () {
			return this.items.length;
		}

		Menu.prototype.getItemAt = function (index) {
			return this.items[index];
		}

		Menu.prototype.draw = function (graphics) {
			var itemsCount = this.getItemsCount();
			var currentItem;

			for (var i = 0; i < itemsCount; i ++) {
				currentItem = this.items[i];
				currentItem.draw(graphics);
			}
		}

		return Menu;
	});