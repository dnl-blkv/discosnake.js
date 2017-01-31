define([],
    function() {
        'use strict';

        /**
         * @param {Number} min
         * @param {Number} max
         *
         * @returns {Number}
         */
        function getRandomInteger(min, max) {
            return min + Math.floor(Math.random() * (max - min + 1));
        }

        /**
         * @param {Number} min
         * @param {Number} max
         *
         * @returns {Number}
         */
        function getRandomNumber(min, max) {
            return min + Math.random() * (max - min);
        }

        /**
         * @param {Number} number
         * @param {Number} divisor
         *
         * @returns {Number}
         */
        function roundDownToMultiple(number, divisor) {
            if (0 < number) {
                return Math.ceil(number / divisor) * divisor;
            } else if (number < 0) {
                return Math.floor(number / divisor) * divisor;
            }
        }

        /**
         * @param {Number} number
         * @param {Number} divisor
         *
         * @returns {Number}
         */
        function roundUpToMultiple(number, divisor) {
            if (0 < number) {
                return Math.floor(number / divisor) * divisor;
            } else if (number < 0) {
                return Math.ceil(number / divisor) * divisor;
            }
        }

        return {
            getRandomInteger: getRandomInteger,
            getRandomNumber: getRandomNumber,
            roundDownToMultiple: roundDownToMultiple,
            roundUpToMultiple: roundUpToMultiple
        };
    });