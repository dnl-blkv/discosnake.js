define([
        'engine'
    ],
    function(
        engine
    ) {
        'use strict';
        var MenuItem = engine.ui.MenuItem;
        var ColorUtils = engine.utils.ColorUtils;

        /**
         * @param {string} actionCode
         * @param {string} text
         * @param {number} fontSize
         * @param {string} fontFamily
         * @param {string} defaultColor
         * @param {number} maxWidth
         *
         * @constructor
         * @extends MenuItem
         */
        function DiscoSnakeMenuItem(actionCode, text, fontSize, fontFamily, defaultColor, maxWidth) {
            var randomPsychedelicColor = ColorUtils.pickRandomPsychedelicColor();
            var focusedColor = randomPsychedelicColor.generateHexString();

            MenuItem.call(this, actionCode, text, fontSize, fontFamily, defaultColor, focusedColor, maxWidth);
        }

        DiscoSnakeMenuItem.prototype = Object.create(MenuItem.prototype);
        DiscoSnakeMenuItem.prototype.constructor = DiscoSnakeMenuItem;

        /**
         */
        DiscoSnakeMenuItem.prototype.select = function() {
            var randomPsychedelicColor = ColorUtils.pickRandomPsychedelicColor();
            this.focusedColor = randomPsychedelicColor.generateHexString();
            MenuItem.prototype.select.call(this);
        };

        /**
         */
        DiscoSnakeMenuItem.prototype.updateHtmlStyle = function() {
            MenuItem.prototype.updateHtmlStyle.call(this);
            var html = this.getHtml();
            html.style.lineHeight = '95%';
        };

        return DiscoSnakeMenuItem;
    });