define([
	],
	function () {
		function GameGraphics(width, height) {
			this.canvas = document.createElement('canvas');

			// Set default width
			this.width;
			this.setWidth(width);

			// Set default height
			this.height;
			this.setHeight(height);

			// Set up the default properties
			this.canvas.id = "gameGraphics";
			this.canvas.style.backgroundColor = '#333333';

			// Make z-index variable
			this.canvas.style.zIndex = 8;

			// Set up the context
			var context = this.getContext();
			context.translate(1, 1);
			context.scale(2, 2);
			context.lineWidth = 0.75;

			// Append the canvas to body
			var body = document.getElementsByTagName("body")[0];
			body.appendChild(this.canvas);
		}

		GameGraphics.prototype.reset = function () {
			var context = this.getContext();
			// Clear the canvas content
			// Store the current transformation matrix
			context.save();

			// Use the identity matrix while clearing the canvas
			context.setTransform(1, 0, 0, 1, 0, 0);
			context.clearRect(0, 0, this.canvas.width, this.canvas.height);

			// Restore the transform
			context.restore();
		}

		GameGraphics.prototype.setWidth = function (width) {
			this.width = width;
			this.canvas.width = 2 * width;
			this.canvas.style.width = width + "px";
		}

		GameGraphics.prototype.getWidth = function () {
			return this.canvas.width;
		}

		GameGraphics.prototype.setHeight = function (height) {
			this.height = height;
			this.canvas.height = 2 * height;
			this.canvas.style.heigth = height + "px";
		}

		GameGraphics.prototype.getHeight = function () {
			return this.canvas.height;
		}

		GameGraphics.prototype.getContext = function () {
			var context = this.canvas.getContext("2d");

			return context;
		}

		GameGraphics.prototype.drawRect = function (x, y, width, height, fillStyle, lineStyle) {

			var context = this.getContext();

			context.beginPath();

			context.rect(x, y, width, height);

			context.fillStyle = fillStyle;

			context.fill();

			context.strokeStyle = lineStyle;

			context.stroke();
		}

		GameGraphics.prototype.drawTile = function (tile) {
			this.drawRect(tile.getX(), tile.getY(), tile.getSize(), tile.getSize(), tile.getFillStyle(), tile.getLineStyle());
		}

		return GameGraphics;
	});