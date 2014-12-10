define([
		'./htmlUtils',
		'./InputEvent'
	],
	function (
		htmlUtils,
		InputEvent
		) {
		var centreElement = htmlUtils.centreElement;

		function GameGraphics (width, height) {
			this.canvas = document.createElement('canvas');

			// Set default width
			this.width;
			this.setWidth(width);

			// Set default height
			this.height;
			this.setHeight(height);

			// Set up the default properties
			this.canvas.class = "gameGraphics";
			this.canvas.style.backgroundColor = '#000000';

			// Make z-index variable
			this.canvas.style.zIndex = 8;

			// Set up the context
			var context = this.getContext();
			context.translate(0.5, 0.5);
			context.lineWidth = 0.75;

			// Append the canvas to body
			var body = document.getElementsByTagName("body")[0];
			body.appendChild(this.canvas);

			// TODO: Cleanup the centering code
			// Centering
			var gameGraphics = this;

			window.addEventListener (InputEvent.RESIZE, function () {
				centreCanvas(gameGraphics);
			});

			centreCanvas(gameGraphics);
		}

		function centreCanvas (gameGraphics) {
			centreElement(gameGraphics.canvas);
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
			this.canvas.width = width;
			this.canvas.style.width = width + "px";
		}

		GameGraphics.prototype.getWidth = function () {
			return this.width;
		}

		GameGraphics.prototype.setHeight = function (height) {
			this.height = height;
			this.canvas.height = height;
			this.canvas.style.height = height + "px";
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

		// TODO: Move to utils
		GameGraphics.prototype.buildFontString = function (fontSize, fontName) {
			var fontString = '' + fontSize + 'px ' + fontName;

			return fontString;
		}

		GameGraphics.prototype.drawText = function (x, y, text, fontSize, fontName, fontColor, maxWidth) {
			var context = this.getContext();

			context.beginPath();

			context.font = this.buildFontString(fontSize, fontName);

			// TODO: Dirty Magic String, generalize
			context.textAlign = 'left';

			context.fillStyle = fontColor;

			context.fillText(text, x, y, maxWidth);
		}

		return GameGraphics;
	});