define([
        'engine/input/InputEventType',
        'engine/utils/HtmlUtils'
    ],
    function(
        InputEvent,
        HtmlUtils
    ) {
        'use strict';

        /**
         * @type {function}
         */
        var centreElement = HtmlUtils.centreElement;

        /**
         * @type {function}
         */
        var buildFontString = HtmlUtils.buildFontString;

        /**
         * @type {string}
         */
        var TEXT_ALIGN_LEFT = 'left';

        /**
         * @type {string}
         */
        var TEXT_BASELINE_MIDDLE = 'middle';

        /**
         * @param {number} width
         * @param {number} height
         * @param {string} backgroundColor
         *
         * @constructor
         */
        function Graphics(width, height, backgroundColor) {
            /**
             * @type {HTMLElement}
             */
            this.canvas = createCanvas(width, height, backgroundColor);
            window.addEventListener(InputEvent.RESIZE, createResizeEventListener(this));
        }

        /**
         * @param {number} width
         * @param {number} height
         * @param {string} backgroundColor
         *
         * @returns {HTMLElement}
         */
        function createCanvas(width, height, backgroundColor) {
            var canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.style.width = width + "px";
            canvas.height = height;
            canvas.style.height = height + "px";
            canvas.class = 'graphics';
            canvas.style.backgroundColor = backgroundColor;
            canvas.style.zIndex = -1;
            scaleContext(canvas.getContext('2d'));
            appendToBody(canvas);
            centreElement(canvas);

            return canvas;
        }

        /**
         * @param {HTMLElement} canvas
         */
        function appendToBody(canvas) {
            var body = document.getElementsByTagName('body')[0];
            body.appendChild(canvas);
        }

        /**
         * @param {CanvasRenderingContext2D} context
         */
        function scaleContext(context) {
            context.translate(0.5, 0.5);
            context.lineWidth = 0.75;
        }

        /**
         * @param {Graphics} graphics
         *
         * @returns {function}
         */
        function createResizeEventListener(graphics) {
            return function() {
                centreElement(graphics.canvas);
            };
        }

        /**
         */
        Graphics.prototype.reset = function() {
            var context = this.getContext();
            context.save();
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.clearRect(0, 0, this.determineWidth(), this.getHeight());
            context.restore();
        };

        /**
         * @returns {number}
         */
        Graphics.prototype.determineWidth = function() {
            return this.canvas.width;
        };

        /**
         * @returns {number}
         */
        Graphics.prototype.getHeight = function() {
            return this.canvas.height;
        };

        /**
         * @returns {CanvasRenderingContext2D}
         */
        Graphics.prototype.getContext = function() {
            return this.canvas.getContext('2d');
        };

        /**
         * @param {number} x
         * @param {number} y
         * @param {number} width
         * @param {number} height
         * @param {string} fillStyle
         * @param {string} lineStyle
         */
        Graphics.prototype.drawRect = function(x, y, width, height, fillStyle, lineStyle) {
            var context = this.getContext();
            context.beginPath();
            context.rect(x, y, width, height);
            context.fillStyle = fillStyle;
            context.fill();
            context.strokeStyle = lineStyle;
            context.stroke();
        };

        /**
         * @param {number} x
         * @param {number} y
         * @param {string} text
         * @param {number} fontSize
         * @param {string} fontName
         * @param {string} fontColor
         * @param {number} maxWidth
         */
        Graphics.prototype.drawText = function(x, y, text, fontSize, fontName, fontColor, maxWidth) {
            var context = this.getContext();
            context.beginPath();
            context.font = buildFontString(fontSize, fontName);
            context.textBaseline = TEXT_BASELINE_MIDDLE;
            context.textAlign = TEXT_ALIGN_LEFT;
            context.fillStyle = fontColor;
            context.fillText(text, x, y, maxWidth);
        };

        // TODO: consider using maxWidth.
        // TODO: deal with fontFamily / fontName naming convention
        /**
         * @param {string} text
         * @param {number} fontSize
         * @param {string} fontName
         *
         * @returns {number}
         */
        Graphics.prototype.determineTextWidth = function(text, fontSize, fontName) {
            var context = this.getContext();
            context.font = buildFontString(fontSize, fontName);
            var textMetrics = context.measureText(text);

            return textMetrics.width;
        };

        return Graphics;
    });