define([
	], 
function() {
	function Tile (position, size, graphics) {
		// Set properties from arguments
		this.position = position;
		this.size = size;
		this.graphics = graphics;
	}

	// Position accessors
	Tile.prototype.setPosition = function (position) {
		this.position = position;
	}

	Tile.prototype.getPosition = function () {
		return this.position;
	}

	// X coordinate accessors
	Tile.prototype.setX = function (x) {
		this.position.width = x;
	}

	Tile.prototype.getX = function () {
		return this.position.width;
	}

	// Y coordinate accessors
	Tile.prototype.setY = function (y) {
		this.position.height = y;
	}

	Tile.prototype.getY = function () {
		return this.position.height;
	}

	// Size acccessors
	Tile.prototype.setSize = function (size) {
		this.size = size;
	}

	Tile.prototype.getSize = function () {
		return this.size;
	}

	// Height accessors
	Tile.prototype.setHeight = function (height) {
		this.size.height = height;
	}

	Tile.prototype.getHeight = function () {
		return this.size.height;
	}

	// Width accessors
	Tile.prototype.setWidth = function (width) {
		this.size.width = width;
	}

	Tile.prototype.getWidth = function () {
		return this.size.width;
	}

	// Graphics accessors
	Tile.prototype.setGraphiccs = function (graphics) {
		this.graphics = graphics;
	}

	Tile.prototype.getGraphiccs = function () {
		return this.graphics;
	}

	return Tile;
});