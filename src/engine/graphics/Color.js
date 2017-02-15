define([],
    function() {
        'use strict';

        /**
         * @param {number} red      Channel value in range [0, 255]
         * @param {number} green    Channel value in range [0, 255]
         * @param {number} blue     Channel value in range [0, 255]
         *
         * @constructor
         */
        function Color(red, green, blue) {
            /**
             * @type {number}
             */
            this.red = red;

            /**
             * @type {number}
             */
            this.green = green;

            /**
             * @type {number}
             */
            this.blue = blue;

            /**
             * @type {number}   Alpha value in range [0, 1]
             */
            this.alpha = 1;
        }

        /**
         * @param {number} red      Channel value in range [0, 256)
         */
        Color.prototype.setRed = function(red) {
            this.red = red;
        };

        /**
         * @param {number} green    Channel value in range [0, 256)
         */
        Color.prototype.setGreen = function(green) {
            this.green = green;
        };

        /**
         * @param {number} blue     Channel value in range [0, 256)
         */
        Color.prototype.setBlue = function(blue) {
            this.blue = blue;
        };

        /**
         * @type {number}   Alpha value in range [0, 1]
         */
        Color.prototype.setAlpha = function(alpha) {
            this.alpha = alpha;
        };

        /**
         * @returns {string}
         */
        Color.prototype.generateHexString = function() {
            var hexString = '#';
            hexString += this.getRedHex();
            hexString += this.getGreenHex();
            hexString += this.getBlueHex();

            return hexString;
        };

        /**
         * @returns {string}
         */
        Color.prototype.getRedHex = function() {
            return decChannelToHex(this.getRed());
        };

        /**
         * @param {number} decChannel
         *
         * @returns {string}
         */
        function decChannelToHex(decChannel) {
            var zeroPaddedHexChannel = '0' + decChannel.toString(16).toUpperCase();

            return zeroPaddedHexChannel.substr(-2);
        }

        /**
         * @returns {number}
         */
        Color.prototype.getRed = function() {
            return this.red;
        };

        /**
         * @returns {string}
         */
        Color.prototype.getGreenHex = function() {
            return decChannelToHex(this.getGreen());
        };

        /**
         * @returns {number}
         */
        Color.prototype.getGreen = function() {
            return this.green;
        };

        /**
         * @returns {string}
         */
        Color.prototype.getBlueHex = function() {
            return decChannelToHex(this.getBlue());
        };

        /**
         * @returns {number}
         */
        Color.prototype.getBlue = function() {
            return this.blue;
        };

        /**
         * @returns {string}
         */
        Color.prototype.generateRgbaString = function() {
            return 'rgba(' + toRgbaArrayWithAlpha(this).join(', ') + ')';
        };

        /**
         * @param {Color} color
         *
         * @returns {[number, number, number, number]}
         */
        function toRgbaArrayWithAlpha(color) {
            return [color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha()];
        }

        /**
         * @returns {number}
         */
        Color.prototype.getAlpha = function() {
            return this.alpha;
        };

        /**
         *
         * @param {Color} anotherColor
         * @param {number} ratio
         *
         * @returns {Color}
         */
        Color.prototype.blend = function(anotherColor, ratio) {
            ratio = ratio || 0.5;
            var newColor = this.copy();

            newColor.setRed(Math.floor((newColor.getRed() * ratio + anotherColor.getRed() * (1 - ratio))));
            newColor.setGreen(Math.floor((newColor.getGreen() * ratio + anotherColor.getGreen() * (1 - ratio))));
            newColor.setBlue(Math.floor((newColor.getBlue() * ratio + anotherColor.getBlue() * (1 - ratio))));

            return newColor;
        };

        /**
         * @returns {Color}
         */
        Color.prototype.copy = function() {
            return new Color(this.getRed(), this.getGreen(), this.getBlue());
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
        Color.createFromHSV = function(hue, saturation, value) {
            var hueInterval = Math.floor(hue * 6);
            var f = hue * 6 - hueInterval;
            var p = value * (1 - saturation);
            var q = value * (1 - f * saturation);
            var t = value * (1 - (1 - f) * saturation);
            var coefficients = determineRgbCoefficients(hueInterval, value, p, q, t);
            var red = Math.round(256 * coefficients[0]);
            var green = Math.round(256 * coefficients[1]);
            var blue = Math.round(256 * coefficients[2]);

            return new Color(red, green, blue);
        };

        /**
         * @param {number} hueInterval
         * @param {number} value
         * @param {number} p
         * @param {number} q
         * @param {number} t
         *
         * @returns {number[]}
         */
        function determineRgbCoefficients(hueInterval, value, p, q, t) {
            switch (hueInterval) {
                case 0:
                    return [value, t, p];
                case 1:
                    return [q, value, p];
                case 2:
                    return [p, value, t];
                case 3:
                    return [p, q, value];
                case 4:
                    return [t, p, value];
                case 5:
                    return [value, p, q];
                default:
                    return [0, 0, 0];
            }
        }

        /**
         * @param {string} hexString
         *
         * @returns {Color}
         */
        Color.createFromHexString = function(hexString) {
            var colornumberHex = hexString.substring(1);
            var colorChannelsHex = colornumberHex.match(/.{2}/g);
            var red = parseInt(colorChannelsHex[0], 16);
            var green = parseInt(colorChannelsHex[1], 16);
            var blue = parseInt(colorChannelsHex[2], 16);

            return (new Color(red, green, blue));
        };

        return Color;
    });