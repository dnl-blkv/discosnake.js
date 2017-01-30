define([
        'engine'
    ],
    function(
        engine
    ) {
        'use strict';
        var MenuItem = engine.ui.MenuItem;
        var colorUtils = engine.utils.colorUtils;

        /**
         * @param actionCode
         * @param text
         * @param fontSize
         * @param fontFamily
         * @param defaultColor
         * @param maxWidth
         * @constructor
         * @extends {MenuItem}
         */
        function DiscoSnakeMenuItem(actionCode, text, fontSize, fontFamily, defaultColor, maxWidth) {

            var randomPsychedelicColor = colorUtils.pickRandomPsychedelicColor();
            var focusedColor = randomPsychedelicColor.generateHexString();

            MenuItem.call(this, actionCode, text, fontSize, fontFamily, defaultColor, focusedColor, maxWidth);
        }

        DiscoSnakeMenuItem.prototype = Object.create(MenuItem.prototype);
        DiscoSnakeMenuItem.prototype.constructor = DiscoSnakeMenuItem;

        DiscoSnakeMenuItem.prototype.select = function() {
            var randomPsychedelicColor = colorUtils.pickRandomPsychedelicColor();

            this.focusedColor = randomPsychedelicColor.generateHexString();

            MenuItem.prototype.select.call(this);
        };

        DiscoSnakeMenuItem.prototype.updateHtmlStyle = function() {
            MenuItem.prototype.updateHtmlStyle.call(this);

            var html = this.getHtml();

            html.style.lineHeight = '95%';
        };

        return DiscoSnakeMenuItem;
    });