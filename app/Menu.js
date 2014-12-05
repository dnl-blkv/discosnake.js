define([
	],
	function (
		) {

		// TODO: Add some random element to the menu
		function Menu (x, y, title, items) {
			this.x = x;
			this.y = y;
			this.title = title || 'Game Menu';
			this.items = items || ['Continue'];
		}

		Menu.prototype.setX = function (x) {
			this.x = x;
		}

		Menu.prototype.getX = function () {
			return this.x;
		}

		Menu.prototype.setY = function (y) {
			this.y = y;
		}

		Menu.prototype.getY = function () {
			return this.y;
		}

		Menu.prototype.setTitle = function (title) {
			this.title = title;
		}

		Menu.prototype.getTitle = function () {
			return this.title;
		}

		Menu.prototype.addItem = function (item) {
			this.items.push(item);
		}

		Menu.prototype.getItemsCount = function (item) {
			return this.items.length;
		}

		Menu.prototype.getItemAt = function (index) {
			return this.items[index];
		}

		return Menu;
	});