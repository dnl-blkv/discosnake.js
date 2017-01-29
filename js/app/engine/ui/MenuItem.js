define([
        'engine/graphics/DisplayObject',
        'engine/graphics/TextObject'
    ],
    function(
        DisplayObject,
        TextObject
        ) {
        'use strict';

        function MenuItem(actionCode, text, fontSize, fontFamily, defaultColor, focusedColor, maxWidth) {
            DisplayObject.call(this, 0, 0, 0, 0);

            this.actionCode = actionCode || 'nullActionCode';
            this.defaultFontSize = fontSize;
            this.defaultColor = defaultColor;
            this.focusedColor = focusedColor;
            this.focused = false;
            this.selectedFontSizeMultiplier = 1.5;

            // Create the text object
            this.textObject = new TextObject(text, fontSize, fontFamily, defaultColor, maxWidth);

            this.updateHTMLStyle();

            updateHeight(this);
        }

        MenuItem.prototype = Object.create(DisplayObject.prototype);
        MenuItem.prototype.constructor = MenuItem;

        function updateHeight(menuItem) {
            var textObject = menuItem.textObject;

            var height = textObject.getHeight();

            menuItem.setHeight(height);
        }

        function setTextColor(menuItem, textColor) {
            var textObject = menuItem.textObject;

            textObject.setFontColor(textColor);
        }

        MenuItem.prototype.getActionCode = function() {
            return this.actionCode;
        };

        MenuItem.prototype.getWidth = function(graphics) {
            return this.textObject.getWidth(graphics);
        };

        MenuItem.prototype.draw = function(graphics) {
            var width = this.getWidth(graphics);
            this.setWidth(width);

            this.textObject.setX(this.getX());
            this.textObject.setY(this.getY());

            this.textObject.draw(graphics);
        };

        MenuItem.prototype.focus = function() {
            if (!this.focused) {
                this.focused = true;

                var focusedColor = this.focusedColor;

                setTextColor(this, focusedColor);

                var textObject = this.textObject;

                textObject.setFontSize(this.defaultFontSize * this.selectedFontSizeMultiplier);

                updateHeight(this);

                this.textObject.updateHTMLStyle();
            }
        };

        MenuItem.prototype.unfocus = function() {
            if (this.focused) {
                this.focused = false;

                var defaultColor = this.defaultColor;

                setTextColor(this, defaultColor);

                var textObject = this.textObject;

                textObject.setFontSize(this.defaultFontSize);

                updateHeight(this);

                this.textObject.updateHTMLStyle();
            }
        };

        MenuItem.prototype.updateHTMLStyle = function() {
            var html = this.getHTML();

            html.style.display = 'block';
        };

        MenuItem.prototype.getHTML = function() {
            return this.textObject.getHTML();
        };

        return MenuItem;
    });