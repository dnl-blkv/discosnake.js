define([
        './KeyCode'
    ],
    function(
        KeyCode
    ) {
        'use strict';

        /**
         * @constructor
         */
        function Controls() {
            /**
             * @type {Object}
             */
            this.keyDownCommandMap = {};

            /**
             * @type {Object}
             */
            this.keyUpCommandMap = {};
        }

        /**
         * @param {Number} keyCode
         * @param {string} commandCode
         */
        Controls.prototype.bindKeyDown = function(keyCode, commandCode) {
            this.keyDownCommandMap[keyCode] = commandCode;
        };

        /**
         * @param {Number} keyCode
         *
         * @returns {string}
         */
        Controls.prototype.getKeyDownBinding = function(keyCode) {
            return this.keyDownCommandMap[keyCode];
        };

        /**
         * @param {Number} keyCode
         */
        Controls.prototype.unbindKeyDown = function(keyCode) {
            this.keyDownCommandMap[keyCode] = KeyCode.NULL_KEY;
        };

        /**
         * @param {Number} keyCode
         * @param {string} commandCode
         */
        Controls.prototype.bindKeyUp = function(keyCode, commandCode) {
            this.keyUpCommandMap[keyCode] = commandCode;
        };

        /**
         * @param {Number} keyCode
         *
         * @returns {string}
         */
        Controls.prototype.getKeyUpBinding = function(keyCode) {
            return this.keyUpCommandMap[keyCode];
        };

        /**
         * @param {Number} keyCode
         */
        Controls.prototype.unbindKeyUp = function(keyCode) {
            this.keyUpCommandMap[keyCode] = KeyCode.NULL_KEY;
        };

        return Controls;
    });