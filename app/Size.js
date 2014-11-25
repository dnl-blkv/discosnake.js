define([],
function() {
	function Size (width, height) {
		// Set the properties
		this.width = width;
		this.height = height;
	}
	
	Size.prototype.setWidth = function (width) {
		this.width = width;
	}
	
	Size.prototype.setHeight = function (height) {
		this.height = height;
	}
	
	return Size;
});