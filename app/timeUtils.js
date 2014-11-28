define([],
	function () {
		// Cross-browser support for requestAnimationFrame
		var w = window;
		var requestAnimationFrame = w.requestAnimationFrame ||
									w.webkitRequestAnimationFrame ||
									w.msRequestAnimationFrame ||
									w.mozRequestAnimationFrame;

		function timeNow () {
			var currentTimestamp = window.performance.now ?
				(performance.now() + performance.timing.navigationStart) :
				Date.now();

			return currentTimestamp;
		}

		return {
			timeNow: timeNow,
			requestAnimationFrame: requestAnimationFrame
		};
	});
