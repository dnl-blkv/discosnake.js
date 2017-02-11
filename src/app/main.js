define([
    'domReady',
    'game',
    'font!custom,families:[Wendy],urls:[style/style.css]'
],
    function(
        domReady,
        Game
    ) {
    'use strict';

    domReady(runGame);

    function runGame() {
        var cellSize = 20;
        var fieldWidth = 48;
        var fieldHeight = 30;
        var game = new Game(cellSize, fieldWidth, fieldHeight);
    }
});