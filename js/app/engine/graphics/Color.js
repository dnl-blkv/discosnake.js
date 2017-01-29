define([
        "engine/utils/numberUtils"
    ],
    function (numberUtils) {
        "use strict";

        /**
         * @type {function}
         */
        var getRandomNumber = numberUtils.getRandomNumber;

        /**
         * @param {number} red
         * @param {number} green
         * @param {number} blue
         *
         * @constructor
         */
        function Color(red, green, blue) {
            this.red = red;
            this.green = green;
            this.blue = blue;
        }

        /**
         * @returns {string}
         */
        Color.prototype.getHexString = function () {
            var hexString = "#";
            hexString += this.getRedHex();
            hexString += this.getGreenHex();
            hexString += this.getBlueHex();

            return hexString;
        };

        /**
         * @param {number} alpha
         * @returns {string}
         */
        Color.prototype.toRGBAString = function (alpha) {
            var rgbaString = "rgba(";
            rgbaString += this.getRed() + ", ";
            rgbaString += this.getGreen() + ", ";
            rgbaString += this.getBlue() + ", ";
            rgbaString += alpha + ")";

            return rgbaString;
        };

        /**
         * @param {number} red
         */
        Color.prototype.setRed = function (red) {
            this.red = red;
        };

        /**
         * @returns {number}
         */
        Color.prototype.getRed = function () {
            return this.red;
        };

        /**
         * @returns {string}
         */
        Color.prototype.getRedHex = function () {
            return Color.toHexChannel(this.red);
        };

        /**
         * @param green
         */
        Color.prototype.setGreen = function (green) {
            this.green = green;
        };

        /**
         * @returns {number}
         */
        Color.prototype.getGreen = function () {
            return this.green;
        };

        /**
         * @returns {string}
         */
        Color.prototype.getGreenHex = function () {
            return Color.toHexChannel(this.green);
        };

        /**
         * @param {number} blue
         */
        Color.prototype.setBlue = function (blue) {
            this.blue = blue;
        };

        /**
         * @returns {number}
         */
        Color.prototype.getBlue = function () {
            return this.blue;
        };

        /**
         * @returns {string}
         */
        Color.prototype.getBlueHex = function () {
            return Color.toHexChannel(this.blue);
        };

        /**
         * @returns {Color}
         */
        Color.prototype.copy = function () {
            return new Color(this.getRed(), this.getGreen(), this.getBlue());
        };

        /**
         *
         * @param {Color} anotherColor
         * @param {number} ratio
         *
         * @returns {Color}
         */
        Color.prototype.blend = function (anotherColor, ratio) {
            if (ratio === undefined) {
                ratio = 0.5;
            }

            var newColor = this.copy();

            newColor.setRed(Math.floor((newColor.getRed() * ratio + anotherColor.getRed() * (1 - ratio))));
            newColor.setGreen(Math.floor((newColor.getGreen() * ratio + anotherColor.getGreen() * (1 - ratio))));
            newColor.setBlue(Math.floor((newColor.getBlue() * ratio + anotherColor.getBlue() * (1 - ratio))));

            return newColor;
        };

        /**
         * Builds a color object given HSV values in range [0..1].
         *
         * @param {number} hue
         * @param {number} saturation
         * @param {number} value
         *
         * @returns {Color}
         */
        Color.fromHSV = function (hue, saturation, value) {
            var coefficients = [0, 0, 0];
            var hueInterval = Math.floor(hue * 6);
            var f = hue * 6 - hueInterval;
            var p = value * (1 - saturation);
            var q = value * (1 - f * saturation);
            var t = value * (1 - (1 - f) * saturation);

            switch (hueInterval) {
                case 0:
                    coefficients = [value, t, p];
                    break;
                case 1:
                    coefficients = [q, value, p];
                    break;
                case 2:
                    coefficients = [p, value, t];
                    break;
                case 3:
                    coefficients = [p, q, value];
                    break;
                case 4:
                    coefficients = [t, p, value];
                    break;
                case 5:
                    coefficients = [value, p, q];
                    break;
            }

            var red = Math.round(256 * coefficients[0]);
            var green = Math.round(256 * coefficients[1]);
            var blue = Math.round(256 * coefficients[2]);

            return new Color(red, green, blue);
        };

        /**
         * @param {string} hexString
         *
         * @returns {Color}
         */
        Color.fromHexString = function (hexString) {
            var colorCode = hexString.substring(1);

            var hexChannels = colorCode.match(/.{2}/g);

            var red = parseInt(hexChannels[0], 16);
            var green = parseInt(hexChannels[1], 16);
            var blue = parseInt(hexChannels[2], 16);

            return (new Color(red, green, blue));
        };

        /**
         * @param {Object} limits
         *
         * @returns {Color}
         */
        Color.getRandomColor = function (limits) {
            var hLimits = limits.h;
            var h = getRandomNumber(hLimits.from, hLimits.to);

            var sLimits = limits.s;
            var s = getRandomNumber(sLimits.from, sLimits.to);

            var vLimits = limits.v;
            var v = getRandomNumber(vLimits.from, vLimits.to);

            return Color.fromHSV(h, s, v);
        };

        /**
         * @param {number} decChannel
         *
         * @returns {string}
         */
        Color.toHexChannel = function (decChannel) {
            var zeroPaddedHexChannel = "0" + decChannel.toString(16);

            return zeroPaddedHexChannel.substr(-2);
        };

        /**
         * @returns {Color}
         */
        Color.getRandomPsychedelicColor = function () {

            var dimensionLimits = {
                "h": {
                    "from": 0,
                    "to": 0.99
                },
                "s": {
                    "from": 0.85,
                    "to": 0.99
                },
                "v": {
                    "from": 0.99,
                    "to": 0.99
                }
            };

            return Color.getRandomColor(dimensionLimits);
        };

        return Color;
    });