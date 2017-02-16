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
         * @param {string} hexString
         *
         * @returns {Color}
         */
        Color.createFromHexString = function(hexString) {
            var colorNumberHex = hexString.substring(1);
            var colorChannelsHex = colorNumberHex.match(/.{2}/g);
            var red = parseInt(colorChannelsHex[0], 16);
            var green = parseInt(colorChannelsHex[1], 16);
            var blue = parseInt(colorChannelsHex[2], 16);

            return (new Color(red, green, blue));
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
        Color.createFromHsv = function(hue, saturation, value) {
            var M = 255 * value;
            var m = M * (1 - saturation);
            var reducedHue = hue / 60;
            var z = (M - m) * (1 - Math.abs(reducedHue % 2  - 1));
            var channelValues = getRgbChannelValues(Math.floor(reducedHue), m, M, z);

            return new Color(Math.round(channelValues[0]), Math.round(channelValues[1]), Math.round(channelValues[2]));
        };

        /**
         * @param {number} hueInterval
         * @param {number} m
         * @param {number} M
         * @param {number} z
         *
         * @returns {number[]}
         */
        function getRgbChannelValues(hueInterval, m, M, z) {
            var mz = m + z;

            switch (hueInterval) {
                case 0:
                    return [M, mz, m];
                case 1:
                    return [mz, M, m];
                case 2:
                    return [m, M, mz];
                case 3:
                    return [m, mz, M];
                case 4:
                    return [mz, m, M];
                case 5:
                    return [M, m, mz];
                default:
                    return [0, 0, 0];
            }
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
            return '#' + this.getRedHex() + this.getGreenHex() + this.getBlueHex();
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
            return ('0' + decChannel.toString(16).toUpperCase()).substr(-2);
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
         * @param {Color} otherColor
         *
         * @returns {boolean}
         */
        Color.prototype.equals = function(otherColor) {
            return this.generateRgbaString() === otherColor.generateRgbaString();
        };

        /**
         *
         * @param {Color} mixinColor
         * @param {number} baseToResultRatio    [0, 1]
         *
         * @returns {Color}
         */
        Color.prototype.blend = function(mixinColor, baseToResultRatio) {
            baseToResultRatio = baseToResultRatio || 0.5;

            var newRed = blendChannels(this.getRed(), mixinColor.getRed(), baseToResultRatio);
            var newGreen = blendChannels(this.getGreen(), mixinColor.getGreen(), baseToResultRatio);
            var newBlue = blendChannels(this.getBlue(), mixinColor.getBlue(), baseToResultRatio);

            return new Color(newRed, newGreen, newBlue);
        };

        /**
         * @param {number} baseChannel          [0, 255]
         * @param {number} mixinChannel         [0, 255]
         * @param {number} baseToResultRatio    [0, 1]
         *
         * @returns {number}    [0, 255]
         */
        function blendChannels(baseChannel, mixinChannel, baseToResultRatio) {
            return Math.round(baseChannel * baseToResultRatio + mixinChannel * (1 - baseToResultRatio));
        }

        return Color;
    });