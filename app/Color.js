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

		function getRandomColorWithLimits (redFrom, redTo, greenFrom, greenTo, blueFrom, blueTo) {
			var red = getRandomInteger(redFrom, redTo);
			var green = getRandomInteger(greenFrom, greenTo);
			var blue = getRandomInteger(blueFrom, blueTo);

			return (new Color(red, green, blue));
		}

		function getRandomColorWith3MLimits () {
			var fromToLimits = [
				{
					'from': 0,
					'to': 64
				},
				{
					'from': 0,
					'to': 256
				},
				{
					'from': 192,
					'to': 256
				}
			];

			var fromToLimitsCount = fromToLimits.length;
			var channels = {
				'R': 0,
				'G': 0,
				'B': 0
			};
			var channelString = 'RGB';

			for (var i = 0; i < fromToLimitsCount; i ++) {

				var fromTo = fromToLimits[i];
				var channelsLeft = channelString.length;

				var channelNumber = getRandomInteger(0, channelsLeft);

				var channelToSet = channelString[channelNumber];
				channels[channelToSet] = getRandomInteger(fromTo.from, fromTo.to);

				channelString = channelString.replace(channelToSet, '');
			}

			return (new Color(channels.R, channels.G, channels.B));
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

		Color.fromHexString = function (hexString) {
			var colorCode = hexString.substring(1);

			var hexChannels = colorCode.match(/.{2}/g);

			var red = parseInt(hexChannels[0], 16);
			var green = parseInt(hexChannels[1], 16);
			var blue = parseInt(hexChannels[2], 16);

			return (new Color(red, green, blue));
		}

		Color.getRandomColor = function () {
			return getRandomColorWithLimits(0, 256, 0, 256, 0, 256);
		}

		Color.toHexChannel = function (decChannel) {
			return (('0' + decChannel.toString(16)).substr(-2));
		}

		Color.getRandomPsychedelicColor = function () {
			var color = getRandomColorWith3MLimits();

			return color;
		}

		return Color;
	});