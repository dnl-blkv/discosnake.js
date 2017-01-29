define(
    [],
    function () {
        'use strict';

        /**
         * @param {number} x
         * @param {number} y
         * @param {number} width
         * @param {number} height
         *
         * @constructor
         */
        function DisplayObject(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }

        /**
         * @param {number} x
         */
        DisplayObject.prototype.setX = function (x) {
            this.x = x;
        };

        /**
         * @returns {number}
         */
        DisplayObject.prototype.getX = function () {
            return this.x;
        };

        /**
         * @param {number} y
         */
        DisplayObject.prototype.setY = function (y) {
            this.y = y;
        };

        /**
         * @returns {number}
         */
        DisplayObject.prototype.getY = function () {
            return this.y;
        };

        /**
         * @param {number} width
         */
        DisplayObject.prototype.setWidth = function (width) {
            this.width = width;
        };

        /**
         * @returns {number}
         */
        DisplayObject.prototype.getWidth = function () {
            return this.width;
        };

        /**
         * @param {number} height
         */
        DisplayObject.prototype.setHeight = function (height) {
            this.height = height;
        };

        /**
         * @returns {number}
         */
        DisplayObject.prototype.getHeight = function () {
            return this.height;
        };

        return DisplayObject;
    }
);