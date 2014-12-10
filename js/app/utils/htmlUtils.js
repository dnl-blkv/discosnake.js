define([],
	function () {
		function centreElement (element) {
			var width = document.documentElement.clientWidth;
			var height = document.documentElement.clientHeight;

			element.style.position = 'absolute';
			element.style.left = (width - element.offsetWidth)/2 + 'px';
			element.style.top = (height - element.offsetHeight)/2 + window.pageYOffset + 'px';
		}

		return {
			centreElement: centreElement
		};
	});

