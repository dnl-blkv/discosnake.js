define([
	'./Color',
	'./DisplayObject',
	'./Graphics',
	'./TextObject',
	'./Tile'
], function (
	Color,
	DisplayObject,
	Graphics,
	TextObject,
	Tile
	) {
	'use strict';

	return {
		Color: Color,
		DisplayObject: DisplayObject,
		Graphics: Graphics,
		TextObject: TextObject,
		Tile: Tile
	}
});