define([
	], 
function() {
	function Position (x, y) {
		// Set the properties
		this.width = x;
		this.height = y;
	}
	
	Position.prototype.setX = function (x) {
		this.width = x;
	}
	
	Position.prototype.setY = function (y) {
		this.height = y;
	}
	
	return Position;
});