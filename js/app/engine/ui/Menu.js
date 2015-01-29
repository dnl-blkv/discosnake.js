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
			this.focusFirstItem();
			this.itemSelectedListener = null;
			this.itemSelectedListenerArguments = null;
		}

		Menu.prototype = Object.create(DisplayObject.prototype);
		Menu.prototype.constructor = Menu;

		// TODO: generalize next/previous items
		Menu.prototype.focusNextItem = function () {
			var itemsCount = this.getItemsCount();

			var oldFocusedItem = getFocusedItem(this);

			oldFocusedItem.unfocus();

			this.focusedItemId = (this.focusedItemId + itemsCount + 1) % itemsCount;

			var newFocusedItem = getFocusedItem(this);

			newFocusedItem.focus();
		}

		Menu.prototype.focusPreviousItem = function () {
			var itemsCount = this.getItemsCount();

			var oldFocusedItem = getFocusedItem(this);

			oldFocusedItem.unfocus();

			this.focusedItemId = (this.focusedItemId + itemsCount - 1) % itemsCount;

			var newFocusedItem = getFocusedItem(this);

			newFocusedItem.focus();
		}

		Menu.prototype.focusFirstItem = function () {
			var oldFocusedItem = getFocusedItem(this);

			if (oldFocusedItem) {
				oldFocusedItem.unfocus();
			}

			this.focusedItemId = 0;

			var newFocusedItem = getFocusedItem(this);

			if (newFocusedItem) {
				newFocusedItem.focus();
			}
		}


		function getFocusedItem (menu) {
			var focusedItemId = menu.focusedItemId;

			var focusedItem = menu.getItemAt(focusedItemId);

			return focusedItem;
		}

		Menu.prototype.setItemSelectedListener = function () {
			var args = Array.prototype.slice.call(arguments);

			this.itemSelectedListener = args[0];
			this.itemSelectedListenerArguments = args.slice(1, args.length);
		}

		Menu.prototype.selectCurrentItem = function () {
			var itemSelectedListener = this.itemSelectedListener;
			var itemSelectedListenerArguments = this.itemSelectedListenerArguments.slice(0);

			// Add the action code to the arguments
			var focusedItem = getFocusedItem(this);
			var focusedItemActionCode = focusedItem.getActionCode();

			itemSelectedListenerArguments.push(focusedItemActionCode); 

			this.itemSelectedListener.apply(itemSelectedListener, itemSelectedListenerArguments);
		}

		Menu.prototype.center = function (graphics) {
			// TODO: USE canvas' methods for aligning the text dynamically
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
			var itemsCount = this.getItemsCount();
			var focusedItemId = this.focusedItemId;

			if (itemsCount === focusedItemId) {
				item.focus();
			}

			this.items.push(item);
		}

		Menu.prototype.getItemsCount = function () {
			return this.items.length;
		}

		Menu.prototype.getItemAt = function (index) {
			return this.items[index];
		}

		Menu.prototype.draw = function (graphics) {
			// Replace with local, generic updatePosition method
			this.center(graphics);

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