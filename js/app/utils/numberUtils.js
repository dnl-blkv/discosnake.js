define([],
	function () {
		'use strict';

		/**
		 * Returns a random integer from 'from' to 'to' excluding the latter one.
		 *
		 * @param from
		 * @param to
		 * @returns {number}
		 */
		function getRandomInteger (from, to) {

			var range = to - from;

			var randomPart = Math.floor(Math.random() * range);

			var base = Math.floor(from);

			var randomInteger = base + randomPart;

			return randomInteger;
		}

		function getRandomNumber (from, to) {
			var range = to - from;

			var randomPart = Math.random() * range;

			var base = from;

			var randomNumber = base + randomPart;

			return randomNumber;
		}

		return {
			getRandomInteger: getRandomInteger,
			getRandomNumber: getRandomNumber
		};
	});