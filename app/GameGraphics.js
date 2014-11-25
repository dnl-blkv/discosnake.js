define([
	],
	function() {
		function GameGraphics () {
			this.canvas = document.createElement('canvas');

			// Set default width
			this.width;
			this.setWidth(800);

			// Set default height
			this.height;
			this.setHeight(600);

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

		GameGraphics.prototype.reset = function() {
			// Clear the canvas content
				// Store the current transformation matrix
			this.getContext().save();

			// Use the identity matrix while clearing the canvas
			this.getContext().setTransform(1, 0, 0, 1, 0, 0);
			this.getContext().clearRect(0, 0, this.canvas.width, this.canvas.height);

			// Restore the transform
			this.getContext().restore();
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

		GameGraphics.prototype.drawRect = function (x, y, width, height, tileGraphics) {

			var context = this.getContext();

			context.fillStyle = tileGraphics.fillStyle;

			context.strokeStyle = tileGraphics.lineStyle;

			context.rect(x, y, width, height);
		}

		GameGraphics.prototype.drawTile = function (tile) {
			this.drawRect(tile.getX(), tile.getY(), tile.getWidth(), tile.getHeight(), tile.getGraphiccs());
		}

		GameGraphics.prototype.update = function () {
			var context = this.getContext();

			context.fill();
			context.stroke();
		}

		return GameGraphics;
	});