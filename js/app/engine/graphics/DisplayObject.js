define([
	],
	function (
		) {
		'use strict';

		function DisplayObject() {
			this.x = 0;
			this.y = 0;
			this.width = 0;
			this.height = 0;
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