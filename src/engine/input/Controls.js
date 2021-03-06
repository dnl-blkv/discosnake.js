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
         * @param {number} keyCode
         * @param {string} commandCode
         */
        Controls.prototype.bindKeyDown = function(keyCode, commandCode) {
            this.keyDownCommandMap[keyCode] = commandCode;
        };

        /**
         * @param {number} keyCode
         *
         * @returns {string}
         */
        Controls.prototype.getKeyDownBinding = function(keyCode) {
            return this.keyDownCommandMap[keyCode];
        };

        /**
         * @param {number} keyCode
         */
        Controls.prototype.unbindKeyDown = function(keyCode) {
            this.keyDownCommandMap[keyCode] = KeyCode.NULL_KEY;
        };

        /**
         * @param {number} keyCode
         * @param {string} commandCode
         */
        Controls.prototype.bindKeyUp = function(keyCode, commandCode) {
            this.keyUpCommandMap[keyCode] = commandCode;
        };

        /**
         * @param {number} keyCode
         *
         * @returns {string}
         */
        Controls.prototype.getKeyUpBinding = function(keyCode) {
            return this.keyUpCommandMap[keyCode];
        };

        /**
         * @param {number} keyCode
         */
        Controls.prototype.unbindKeyUp = function(keyCode) {
            this.keyUpCommandMap[keyCode] = KeyCode.NULL_KEY;
        };

        return Controls;
    });