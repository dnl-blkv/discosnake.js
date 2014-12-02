define([
		'./Tile'
	],
	function (
		Tile
		) {

		function Apple(size, cellX, cellY) {
			// Convert the basic properties
			var fillStyle = '#8f0';
			var lineStyle = '#fff';

			// Call the super constructor
			Tile.call(this, size, cellX, cellY, fillStyle, lineStyle);
		}

		Apple.prototype = Object.create(Tile.prototype);
		Apple.prototype.constructor = Apple;

		return Apple;
	});