define([
		'./numberUtils'
	],
	function (
		numberUtils
		) {
		var getRandomInteger = numberUtils.getRandomInteger;

		function Color (red, green, blue) {
			this.red = red;
			this.green = green;
			this.blue = blue;
		}

		Color.prototype.getHexString = function () {
			var hexString = '#';
			hexString += this.getHexRed();
			hexString += this.getHexBlue();
			hexString += this.getHexGreen();

			return hexString;
		}

		Color.prototype.getRed = function () {
			return this.red;
		}

		Color.prototype.getHexRed = function () {
			var red = this.getRed();

			return Color.toHexChannel(red);
		}

		Color.prototype.setRed = function (red) {
			this.red = red;
		}

		Color.prototype.getGreen = function () {
			return this.green;
		}

		Color.prototype.getHexGreen = function () {
			var green = this.getGreen();

			return Color.toHexChannel(green);
		}

		Color.prototype.setGreen = function (green) {
			this.green = green;
		}

		Color.prototype.getBlue = function () {
			return this.blue;
		}

		Color.prototype.getHexBlue = function () {
			var blue = this.getBlue();

			return Color.toHexChannel(blue);
		}

		Color.prototype.setBlue = function (blue) {
			this.blue = blue;
		}

		Color.prototype.copy = function () {
			return (new Color(this.getRed(), this.getGreen(), this.getBlue()));
		}

		Color.prototype.blend = function (anotherColor, ratio) {
			var newColor = this.copy();

			if (ratio === undefined) {
				ratio = 0.5;
			}

			newColor.setRed(Math.floor((newColor.getRed() * ratio + anotherColor.getRed() * (1 - ratio))));
			newColor.setGreen(Math.floor((newColor.getGreen() * ratio + anotherColor.getGreen() * (1 - ratio))));
			newColor.setBlue(Math.floor((newColor.getBlue() * ratio + anotherColor.getBlue() * (1 - ratio))));

			console.log(ratio, newColor);

			return newColor;
		}

		/**
		 * HSV values in [0..1[
		 * returns [r, g, b] values from 0 to 255
		 */
		Color.fromHSV = function (h, s, v) {

			var coefficients = [0, 0, 0];

			var h_i = Math.floor(h * 6);
			var f = h * 6 - h_i;
			var p = v * (1 - s);
			var q = v * (1 - f * s);
			var t = v * (1 - (1 - f) * s);

			switch (h_i) {
				case 0:
					coefficients = [v, t, p];
					break;
				case 1:
					coefficients = [q, v, p];
					break;
				case 2:
					coefficients = [p, v, t];
					break;
				case 3:
					coefficients = [p, q, v];
					break;
				case 4:
					coefficients = [t, p, v];
					break;
				case 5:
					coefficients = [v, p, q];
					break;
				default:
					break;
			}


			var r = Math.round(256 * coefficients[0]);
			var g = Math.round(256 * coefficients[1]);
			var b = Math.round(256 * coefficients[2]);

			var newColor =  new Color(r, g ,b);

			return newColor;
		}

		Color.fromHexString = function (hexString) {
			var colorCode = hexString.substring(1);

			var hexChannels = colorCode.match(/.{2}/g);

			var red = parseInt(hexChannels[0], 16);
			var green = parseInt(hexChannels[1], 16);
			var blue = parseInt(hexChannels[2], 16);

			return (new Color(red, green, blue));
		}

		Color.getRandomColor = function (h, s, v) {
			if (h == 1) {
				h = Math.random();
			}

			if (s == 1) {
				s = Math.random();
			}

			if (v == 1) {
				v = Math.random();
			}

			return (Color.fromHSV(h, s, v));
		}

		Color.toHexChannel = function (decChannel) {
			return (('0' + decChannel.toString(16)).substr(-2));
		}

		Color.getRandomPsychedelicColor = function () {
			var color = Color.getRandomColor(1, 0.99, 0.99);

			return color;
		}

		return Color;
	});