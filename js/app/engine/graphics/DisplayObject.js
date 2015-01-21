define([
	],
	function (
		) {
		'use strict';

		function DisplayObject() {
			this.x = 0;
			this.y = 0;
		}

		DisplayObject.prototype.setX = function (x) {
			this.x = x;
		}

		DisplayObject.prototype.getX = function () {
			return this.x;
		}

		DisplayObject.prototype.setY = function (y) {
			this.y = y;
		}

		DisplayObject.prototype.getY = function () {
			return this.y;
		}

		return DisplayObject;
	});