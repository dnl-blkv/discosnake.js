define([
	],
	function (
		) {
		'use strict';

		function DisplayObject(x, y, width, height) {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
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

		DisplayObject.prototype.setWidth = function (width) {
			this.width = width;
		}

		DisplayObject.prototype.getWidth = function () {
			return this.width;
		}

		DisplayObject.prototype.setHeight = function (height) {
			this.height = height;
		}

		DisplayObject.prototype.getHeight = function () {
			return this.height;
		}

		return DisplayObject;
	});