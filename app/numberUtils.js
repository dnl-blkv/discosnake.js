define([],
	function () {

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

		return {
			getRandomInteger: getRandomInteger
		};
	});