define([
        'engine/graphics/DisplayObject'
    ],
    function(
        DisplayObject
    ) {
        'use strict';

        /**
         * @param {string} text
         * @param {number} fontSize
         * @param {string} fontFamily
         * @param {string} fontColor
         * @param {number} maxWidth
         *
         * @constructor
         */
        function DisplayObjectText(text, fontSize, fontFamily, fontColor, maxWidth) {
            DisplayObject.call(this, 0, 0, 0, 0);
            this.text = text;
            this.setFontSize(fontSize || 12);
            this.fontFamily = fontFamily || 'Arial';
            this.fontColor = fontColor || 'black';
            this.maxWidth = maxWidth || (5 * fontSize);
            this.html = document.createElement('div');
            this.updateHtml();
        }

        DisplayObjectText.prototype = Object.create(DisplayObject.prototype);
        DisplayObjectText.prototype.constructor = DisplayObjectText;

        /**
         * @param {string} text
         */
        DisplayObjectText.prototype.setText = function(text) {
            this.text = text;
            this.updateHtmlText();
        };

        /**
         */
        DisplayObjectText.prototype.updateHtmlText = function() {
            this.html.innerHTML = this.text;
        };

        /**
         * @returns {string}
         */
        DisplayObjectText.prototype.getText = function() {
            return this.text;
        };

        /**
         * @param {number} fontSize
         */
        DisplayObjectText.prototype.setFontSize = function(fontSize) {
            this.setHeight(fontSize);
            this.fontSize = fontSize;
        };

        /**
         * @returns {number}
         */
        DisplayObjectText.prototype.getFontSize = function() {
            return this.fontSize;
        };

        /**
         * @param {string} fontFamily
         */
        DisplayObjectText.prototype.setFontName = function(fontFamily) {
            this.fontFamily = fontFamily;
        };

        /**
         * @returns {string}
         */
        DisplayObjectText.prototype.getFontName = function() {
            return this.fontFamily;
        };

        /**
         * @param {string} fontColor
         */
        DisplayObjectText.prototype.setFontColor = function(fontColor) {
            this.fontColor = fontColor;
        };

        /**
         * @returns {string}
         */
        DisplayObjectText.prototype.getFontColor = function() {
            return this.fontColor;
        };

        /**
         * @param {width} maxWidth
         */
        DisplayObjectText.prototype.setMaxWidth = function(maxWidth) {
            this.maxWidth = maxWidth;
        };

        /**
         * @returns {number}
         */
        DisplayObjectText.prototype.getMaxWidth = function() {
            return this.maxWidth;
        };

        /**
         * @param {Graphics} graphics
         *
         * @returns {Number}
         */
        DisplayObjectText.prototype.determineWidth = function(graphics) {
            return graphics.determineTextWidth(this.text, this.fontSize, this.fontFamily);
        };

        /**
         * @param {Graphics} graphics
         */
        DisplayObjectText.prototype.draw = function(graphics) {
            var width = this.determineWidth(graphics);
            this.setWidth(width);
            var textX = this.getX();
            var textY = this.getY() + (this.fontSize / 2.0);

            graphics.drawText(textX, textY, this.text, this.fontSize, this.fontFamily, this.fontColor, this.maxWidth);
        };

        /**
         * @returns {Element}
         */
        DisplayObjectText.prototype.getHTML = function() {
            return this.html;
        };

        /**
         * @returns {Element}
         */
        DisplayObjectText.prototype.updateHtmlStyle = function() {
            var html = this.html;
            html.className = 'text-object unselectable default-cursor';
            html.style.fontSize = this.fontSize + 'px';
            html.style.color = this.fontColor;
            html.style.fontFamily = this.fontFamily;

            return html;
        };

        /**
         */
        DisplayObjectText.prototype.updateHtml = function() {
            this.html.innerHTML = this.text;
            this.updateHtmlStyle();
        };

        return DisplayObjectText;
    });