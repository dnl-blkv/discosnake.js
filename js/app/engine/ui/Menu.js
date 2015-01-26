define([
		'engine/graphics/DisplayObject'
	],
	function (
			DisplayObject
		) {
		'use strict';

		function Menu () {
			DisplayObject.call(this, 0, 0, 0, 0);

			this.items = [];
		}

		Menu.prototype = Object.create(DisplayObject.prototype);
		Menu.prototype.constructor = Menu;

		Menu.prototype.center = function (graphics) {
			var width = this.getWidth(graphics);
			var graphicsWidth = graphics.getWidth();
			var centerX = (graphicsWidth - width) / 2.0;
			this.setX(centerX);

			var height = this.getHeight();
			var graphicsHeight = graphics.getHeight();
			var centerY = (graphicsHeight - height) / 2.0;
			this.setY(centerY);
		}

		Menu.prototype.getWidth = function (graphics) {
			var itemsCount = this.getItemsCount();
			var width = 0;

			for (var i = 0; i < itemsCount; i ++) {
				var currentItemWidth = this.items[i].getWidth(graphics);

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
			var currentX = this.getX();
			var currentY = this.getY();

			for (var i = 0; i < itemsCount; i ++) {
				var currentItem = this.items[i];
				currentItem.setX(currentX);
				currentItem.setY(currentY);
				currentItem.draw(graphics);

				currentY += currentItem.getHeight();
			}
		}

		return Menu;
	});