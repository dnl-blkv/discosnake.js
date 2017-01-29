define([
        'engine/input/InputEvent',
        'engine/utils/HtmlUtils'
    ],
    function (
        InputEvent,
        htmlUtils
        ) {
        'use strict';

        var centreElement = htmlUtils.centreElement;
        var buildFontString = htmlUtils.buildFontString;

        function Graphics (width, height, backgroundColor) {

            // Initialize the underlying canvas
            var canvas = document.createElement('canvas');

            // Set the canvas size
            canvas.width = width;
            canvas.style.width = width + "px";
            canvas.height = height;
            canvas.style.height = height + "px";

            // Set up the default properties
            canvas.class = 'graphics';
            canvas.style.backgroundColor = backgroundColor;

            // Make z-index variable
            canvas.style.zIndex = -1;

            // Set up the context
            var context = canvas.getContext('2d');
            context.translate(0.5, 0.5);
            context.lineWidth = 0.75;

            // Append the canvas to body
            // TODO: dirty way of appending graphics to body, centralize
            var body = document.getElementsByTagName('body')[0];
            body.appendChild(canvas);

            // Centre the canvas
            window.addEventListener (InputEvent.RESIZE, function () {
                centreElement(canvas);
            });

            centreElement(canvas);

            // Save the canvas reference
            this.canvas = canvas;
        }

        Graphics.prototype.reset = function () {
            var context = this.getContext();
            // Clear the canvas content
            // Store the current transformation matrix
            context.save();

            // Use the identity matrix while clearing the canvas
            context.setTransform(1, 0, 0, 1, 0, 0);

            var width = this.getWidth();
            var height = this.getHeight();

            context.clearRect(0, 0, width, height);

            // Restore the transform
            context.restore();
        }

        Graphics.prototype.getWidth = function () {
            return this.canvas.width;
        }

        Graphics.prototype.getHeight = function () {
            return this.canvas.height;
        }

        Graphics.prototype.getContext = function () {
            var context = this.canvas.getContext('2d');

            return context;
        }

        Graphics.prototype.drawRect = function (x, y, width, height, fillStyle, lineStyle) {

            var context = this.getContext();

            context.beginPath();

            context.rect(x, y, width, height);

            context.fillStyle = fillStyle;

            context.fill();

            context.strokeStyle = lineStyle;

            context.stroke();
        }

        Graphics.prototype.drawText = function (x, y, text, fontSize, fontName, fontColor, maxWidth) {
            var context = this.getContext();

            context.beginPath();

            context.font = buildFontString(fontSize, fontName);

            context.textBaseline = 'middle';

            // TODO: Dirty Magic String, generalize
            context.textAlign = 'left';

            context.fillStyle = fontColor;

            context.fillText(text, x, y, maxWidth);
        }

        // TODO: consider maxWidth1!1!!11
        // TODO: deal with fontFamily / fontName naming convention
        Graphics.prototype.getTextWidth = function (text, fontSize, fontName) {
            var context = this.getContext();

            var fontString = buildFontString(fontSize, fontName);

            context.font = fontString;

            var textMetrics = context.measureText(text);

            var width = textMetrics.width;

            return width;
        }

        return Graphics;
    });