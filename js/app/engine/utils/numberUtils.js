define([],
    function() {
        'use strict';

        /**
         * Returns a random integer from 'from' to 'to' excluding the latter one.
         *
         * @param from
         * @param to
         * @returns {number}
         */
        function getRandomInteger(from, to) {

            var range = to - from;

            var randomPart = Math.floor(Math.random() * range);

            var base = Math.floor(from);

            var randomInteger = base + randomPart;

            return randomInteger;
        }

        function getRandomNumber(from, to) {
            var range = to - from;

            var randomPart = Math.random() * range;

            var base = from;

            var randomNumber = base + randomPart;

            return randomNumber;
        }

        function roundDownToMultiple(number, divisor) {
            var roundedNumber = number;

            if (number > 0) {
                roundedNumber = Math.ceil(number / divisor) * divisor;
            } else if (number < 0) {
                roundedNumber = Math.floor(number / divisor) * divisor;
            }

            return roundedNumber;
        }

        function roundUpToMultiple(number, divisor) {
            var roundedNumber = number;

            if (number > 0) {
                roundedNumber = Math.floor(number / divisor) * divisor;
            } else if (number < 0) {
                roundedNumber = Math.ceil(number / divisor) * divisor;
            }

            return roundedNumber;
        }

        return {
            getRandomInteger: getRandomInteger,
            getRandomNumber: getRandomNumber,
            roundDownToMultiple: roundDownToMultiple,
            roundUpToMultiple: roundUpToMultiple
        };
    });