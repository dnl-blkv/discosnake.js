define([],
    function() {
        'use strict';

        /**
         * @param {number} min
         * @param {number} max
         *
         * @returns {number}
         */
        function getRandomInteger(min, max) {
            return min + Math.floor(Math.random() * (max - min + 1));
        }

        /**
         * @param {number} min
         * @param {number} max
         *
         * @returns {number}
         */
        function getRandomNumber(min, max) {
            return min + Math.random() * (max - min);
        }

        /**
         * @param {number} number
         * @param {number} divisor
         *
         * @returns {number}
         */
        function roundDownToMultiple(number, divisor) {
            if (0 < number) {
                return Math.ceil(number / divisor) * divisor;
            } else if (number < 0) {
                return Math.floor(number / divisor) * divisor;
            }
        }

        /**
         * @param {number} number
         * @param {number} divisor
         *
         * @returns {number}
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