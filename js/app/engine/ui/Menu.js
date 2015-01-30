define([
		'engine/graphics/DisplayObject',
		'engine/utils/numberUtils'
	],
	function (
			DisplayObject,
			numberUtils
		) {
		'use strict';

		var roundDownToMultiple = numberUtils.roundDownToMultiple;
		var roundUpToMultiple = numberUtils.roundUpToMultiple;

		function Menu () {
			DisplayObject.call(this, 0, 0, 0, 0);

			this.items = [];
			this.focusFirstItem();
			this.itemSelectedListener = null;
			this.itemSelectedListenerArguments = null;
			this.backgroundColor = '#000000';
			this.backgroundBorderColor = '#FFFFFF';
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

		function drawBackground (menu, graphics) {

			// TODO: Move size rounding to the 'tiled' menu version
			var cellSize = 20;

			var graphicsCellWidth = Math.floor(graphics.getWidth() / cellSize);
			var menuWidth = menu.getWidth(graphics);
			var backgroundCellWidth = Math.ceil(menuWidth / cellSize) + 1;

			if ((backgroundCellWidth % 2) === (graphicsCellWidth % 2)) {
				backgroundCellWidth ++;
			}

			var backgroundWidth = (backgroundCellWidth) * cellSize;
			var backgroundX = ((graphicsCellWidth - backgroundCellWidth) / 2) * cellSize;

			var graphicsCellHeight = Math.floor(graphics.getHeight() / cellSize);
			var menuHeight = menu.getHeight();
			var backgroundCellHeight = Math.ceil(menuHeight / cellSize) + 1;

			if ((backgroundCellHeight % 2) === (graphicsCellHeight % 2)) {
				backgroundCellHeight ++;
			}

			var backgroundHeight = (backgroundCellHeight) * cellSize;
			var backgroundY = ((graphicsCellHeight - backgroundCellHeight) / 2) * cellSize;

			// TODO: CARE! DIRTY CENTERING!
			// Center the menu over the background
			var centerX = Math.floor(backgroundX + (backgroundWidth - menuWidth) / 2 + 3.5);
			menu.setX(centerX);

			var centerY = Math.floor(backgroundY + (backgroundHeight - menuHeight) / 2);
			menu.setY(centerY);

			var backgroundColor = menu.backgroundColor;
			var backgroundBorderColor = menu.backgroundBorderColor;

			graphics.drawRect(backgroundX, backgroundY, backgroundWidth, backgroundHeight, backgroundColor, backgroundBorderColor);
		}

		Menu.prototype.draw = function (graphics) {

			drawBackground(this, graphics);

			var itemsCount = this.getItemsCount();
			var currentX = this.getX();
			var currentY = this.getY();
			var menuWidth = this.getWidth(graphics);

			for (var i = 0; i < itemsCount; i ++) {
				var currentItem = this.items[i];
				var currentItemWidth = currentItem.getWidth(graphics);
				var currentXMargin = (menuWidth - currentItemWidth) / 2;

				currentItem.setX(currentX + currentXMargin);
				currentItem.setY(currentY);
				currentItem.draw(graphics);

				currentY += currentItem.getHeight();
			}
		}

		return Menu;
	});