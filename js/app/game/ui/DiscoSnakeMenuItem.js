define([
        'engine'
    ],
    function (
        engine
    ) {
        'use strict';
        var MenuItem = engine.ui.MenuItem;
        var colorUtils = engine.utils.colorUtils;

        function DiscoSnakeMenuItem (actionCode, text, fontSize, fontFamily, defaultColor, maxWidth) {

            var randomPsychedelicColor = colorUtils.pickRandomPsychedelicColor();
            var focusedColor = randomPsychedelicColor.generateHexString();

            MenuItem.call(this, actionCode, text, fontSize, fontFamily, defaultColor, focusedColor, maxWidth);
        }

        DiscoSnakeMenuItem.prototype = Object.create(MenuItem.prototype);
        DiscoSnakeMenuItem.prototype.constructor = DiscoSnakeMenuItem;

        DiscoSnakeMenuItem.prototype.focus = function () {
            var randomPsychedelicColor = colorUtils.pickRandomPsychedelicColor();

            this.focusedColor = randomPsychedelicColor.generateHexString();

            MenuItem.prototype.focus.call(this);
        };

        DiscoSnakeMenuItem.prototype.updateHTMLStyle = function () {
            MenuItem.prototype.updateHTMLStyle.call(this);

            var html = this.getHTML();

            html.style.lineHeight = '95%';
        };

        return DiscoSnakeMenuItem;
    });