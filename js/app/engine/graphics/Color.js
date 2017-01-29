define([
        'engine/utils/numberUtils'
    ],
    function (numberUtils) {
        'use strict';

        var getRandomNumber = numberUtils.getRandomNumber;

        function Color(red, green, blue) {
            this.red = red;
            this.green = green;
            this.blue = blue;
        }

        Color.prototype.getHexString = function () {
            var hexString = '#';
            hexString += this.getHexRed();
            hexString += this.getHexGreen();
            hexString += this.getHexBlue();

            return hexString;
        };

        Color.prototype.toRGBAString = function (alpha) {
            var rgbaString = 'rgba(';
            rgbaString += this.getRed() + ', ';
            rgbaString += this.getGreen() + ', ';
            rgbaString += this.getBlue() + ', ';
            rgbaString += alpha + ')';

            return rgbaString;
        };

        Color.prototype.setRed = function (red) {
            this.red = red;
        };

        Color.prototype.getRed = function () {
            return this.red;
        };

        Color.prototype.getHexRed = function () {
            var red = this.getRed();

            return Color.toHexChannel(red);
        };

        Color.prototype.setGreen = function (green) {
            this.green = green;
        };

        Color.prototype.getGreen = function () {
            return this.green;
        };

        Color.prototype.getHexGreen = function () {
            var green = this.getGreen();

            return Color.toHexChannel(green);
        };

        Color.prototype.setBlue = function (blue) {
            this.blue = blue;
        };

        Color.prototype.getBlue = function () {
            return this.blue;
        };

        Color.prototype.getHexBlue = function () {
            var blue = this.getBlue();

            return Color.toHexChannel(blue);
        };

        Color.prototype.copy = function () {
            return (new Color(this.getRed(), this.getGreen(), this.getBlue()));
        };

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
        };

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

            return new Color(r, g, b);
        };

        Color.fromHexString = function (hexString) {
            var colorCode = hexString.substring(1);

            var hexChannels = colorCode.match(/.{2}/g);

            var red = parseInt(hexChannels[0], 16);
            var green = parseInt(hexChannels[1], 16);
            var blue = parseInt(hexChannels[2], 16);

            return (new Color(red, green, blue));
        };

        Color.getRandomColor = function (limits) {
            // Generate the random dimensions
            var hLimits = limits.h;
            var h = getRandomNumber(hLimits.from, hLimits.to);

            var sLimits = limits.s;
            var s = getRandomNumber(sLimits.from, sLimits.to);

            var vLimits = limits.v;
            var v = getRandomNumber(vLimits.from, vLimits.to);

            return Color.fromHSV(h, s, v);
        };

        Color.toHexChannel = function (decChannel) {
            return (('0' + decChannel.toString(16)).substr(-2));
        };

        Color.getRandomPsychedelicColor = function () {

            var dimensionLimits = {
                'h': {
                    'from': 0,
                    'to': 0.99
                },
                's': {
                    'from': 0.85,
                    'to': 0.99
                },
                'v': {
                    'from': 0.99,
                    'to': 0.99
                }
            };

            return Color.getRandomColor(dimensionLimits);
        };

        return Color;
    });