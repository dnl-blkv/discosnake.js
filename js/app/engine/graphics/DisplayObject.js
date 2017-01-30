define([],
    function() {
        'use strict';

        /**
         * @param {Number} x
         * @param {Number} y
         * @param {Number} width
         * @param {Number} height
         *
         * @constructor
         */
        function DisplayObject(x, y, width, height) {
            /**
             * @type {Number}
             */
            this.x = x;

            /**
             * @type {Number}
             */
            this.y = y;

            /**
             * @type {Number}
             */
            this.width = width;

            /**
             * @type {Number}
             */
            this.height = height;
        }

        /**
         * @param {Number} x
         */
        DisplayObject.prototype.setX = function(x) {
            this.x = x;
        };

        /**
         * @returns {Number}
         */
        DisplayObject.prototype.getX = function() {
            return this.x;
        };

        /**
         * @param {Number} y
         */
        DisplayObject.prototype.setY = function(y) {
            this.y = y;
        };

        /**
         * @returns {Number}
         */
        DisplayObject.prototype.getY = function() {
            return this.y;
        };

        /**
         * @param {Number} width
         */
        DisplayObject.prototype.setWidth = function(width) {
            this.width = width;
        };

        /**
         * @returns {Number}
         */
        DisplayObject.prototype.determineWidth = function() {
            return this.width;
        };

        /**
         * @param {Number} height
         */
        DisplayObject.prototype.setHeight = function(height) {
            this.height = height;
        };

        /**
         * @returns {Number}
         */
        DisplayObject.prototype.getHeight = function() {
            return this.height;
        };

        return DisplayObject;
    }
);