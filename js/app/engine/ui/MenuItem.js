define([
        'engine/graphics/DisplayObject',
        'engine/graphics/TextObject',
        './MenuActionCode'
    ],
    function(
        DisplayObject,
        TextObject,
        MenuActionCode
    ) {
        'use strict';

        /**
         * @param {string} actionCode
         * @param {string} text
         * @param {number} fontSize
         * @param {string} fontFamily
         * @param {string} defaultColor
         * @param {string} focusedColor
         * @param {number} maxWidth
         *
         * @constructor
         * @extends {DisplayObject}
         */
        function MenuItem(actionCode, text, fontSize, fontFamily, defaultColor, focusedColor, maxWidth) {
            DisplayObject.call(this, 0, 0, 0, 0);
            this.actionCode = actionCode || MenuActionCode.NULL_ACTION;
            this.defaultFontSize = fontSize;
            this.defaultColor = defaultColor;
            this.focusedColor = focusedColor;
            this.isSelected = false;
            this.selectedFontSizeMultiplier = 1.5;
            this.textObject = new TextObject(text, fontSize, fontFamily, defaultColor, maxWidth);
            this.updateHtmlStyle();
            updateHeight(this);
        }

        MenuItem.prototype = Object.create(DisplayObject.prototype);
        MenuItem.prototype.constructor = MenuItem;

        /**
         * @param {MenuItem} menuItem
         */
        function updateHeight(menuItem) {
            var textObject = menuItem.textObject;
            var height = textObject.getHeight();
            menuItem.setHeight(height);
        }

        /**
         * @param {MenuItem} menuItem
         * @param {string} textColor
         */
        function setTextColor(menuItem, textColor) {
            var textObject = menuItem.textObject;

            textObject.setFontColor(textColor);
        }

        /**
         * @returns {string}
         */
        MenuItem.prototype.getActionCode = function() {
            return this.actionCode;
        };

        /**
         * @param {Graphics} graphics
         *
         * @returns {Number}
         */
        MenuItem.prototype.determineWidth = function(graphics) {
            return this.textObject.determineWidth(graphics);
        };

        /**
         * @param {Graphics} graphics
         */
        MenuItem.prototype.draw = function(graphics) {
            var width = this.determineWidth(graphics);
            this.setWidth(width);
            this.textObject.setX(this.getX());
            this.textObject.setY(this.getY());
            this.textObject.draw(graphics);
        };

        /**
         */
        MenuItem.prototype.select = function() {
            if (!this.isSelected) {
                this.isSelected = true;
                var focusedColor = this.focusedColor;
                setTextColor(this, focusedColor);
                var textObject = this.textObject;
                textObject.setFontSize(this.defaultFontSize * this.selectedFontSizeMultiplier);
                updateHeight(this);
                this.textObject.updateHtmlStyle();
            }
        };

        /**
         */
        MenuItem.prototype.deselect = function() {
            if (this.isSelected) {
                this.isSelected = false;
                var defaultColor = this.defaultColor;
                setTextColor(this, defaultColor);
                var textObject = this.textObject;
                textObject.setFontSize(this.defaultFontSize);
                updateHeight(this);
                this.textObject.updateHtmlStyle();
            }
        };

        /**
         */
        MenuItem.prototype.updateHtmlStyle = function() {
            var html = this.getHtml();
            html.style.display = 'block';
        };

        /**
         * @returns {HTMLElement}
         */
        MenuItem.prototype.getHtml = function() {
            return this.textObject.getHtml();
        };

        return MenuItem;
    });