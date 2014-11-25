define([
		'./Game',
		'./Position',
		'./Size',
		'./Tile',
		'./TileGraphics'
	], function (
		Game,
		Position,
		Size,
		Tile,
		TileGraphics
	) {
		var tileGraphics = new TileGraphics('#f00', '#fff');
		var position = new Position(20, 20);
		var size = new Size(20, 20);
		var tile = new Tile(position, size , tileGraphics);
		var game = new Game();
		game.graphics.drawTile(tile);

		game.graphics.update();
});