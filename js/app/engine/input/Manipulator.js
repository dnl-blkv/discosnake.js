define([
        './InputEventType',
        './Controls',
        './KeyCode',
        'engine/utils/TimeUtils'
    ],
    function(
        InputEvent,
        Controls,
        KeyCode,
        timeUtils
    ) {
        'use strict';

        /**
         * @type {function}
         */
        var timeNow = timeUtils.timeNow;

        /**
         * @type {string}
         */
        var NULL_COMMAND = 'nullCommand';

        /**
         * @constructor
         */
        function Manipulator() {
            this.commandListener = null;
            this.commandListenerArguments = null;
            this.controls = new Controls();
            this.keyPressedToTimestampMap = {};

            window.addEventListener(InputEvent.KEY_DOWN, createKeyDownEventListener(this), false);
            window.addEventListener(InputEvent.KEY_UP, createKeyUpEventListener(this), false);
        }

        /**
         * @param {Manipulator} manipulator
         *
         * @returns {function}
         */
        function createKeyDownEventListener(manipulator) {
            return function(event) {
                manipulator.onKeyDown(event);
            };
        }

        /**
         * @param {Manipulator} manipulator
         *
         * @returns {function}
         */
        function createKeyUpEventListener(manipulator) {
            return function(event) {
                manipulator.onKeyUp(event);
            };
        }

        /**
         * @param {Controls} controls
         */
        Manipulator.prototype.setControls = function(controls) {
            this.controls = controls;
        };

        /**
         * @returns {Controls}
         */
        Manipulator.prototype.getControls = function() {
            return this.controls;
        };

        /**
         * @param {Number} keyCode
         *
         * @returns {boolean}
         */
        Manipulator.prototype.isKeyDown = function(keyCode) {
            return this.keyPressedToTimestampMap[keyCode];
        };

        /**
         */
        Manipulator.prototype.setCommandListener = function() {
            var args = Array.prototype.slice.call(arguments);
            this.commandListener = args[0];
            this.commandListenerArguments = args.slice(1, args.length);
        };

        /**
         * @param {Event} event
         */
        Manipulator.prototype.onKeyDown = function(event) {
            this.keyPressedToTimestampMap[event.keyCode] = timeNow();
            sendCommand(this, event);
        };

        /**
         * @param {Event} event
         */
        Manipulator.prototype.onKeyUp = function(event) {
            this.keyPressedToTimestampMap[event.keyCode] = 0;
            sendCommand(this, event);
        };

        /**
         * @param {Number} keyCode
         * @param {string} commandCode
         */
        Manipulator.prototype.bindKeyDown = function(keyCode, commandCode) {
            this.controls.bindKeyDown(keyCode, commandCode);
        };

        /**
         * @param {Number} keyCode
         */
        Manipulator.prototype.unbindKeyDown = function(keyCode) {
            this.controls.unbindKeyDown(keyCode);
        };

        /**
         * @param {Number} keyCode
         * @param {string} commandCode
         */
        Manipulator.prototype.bindKeyUp = function(keyCode, commandCode) {
            this.controls.bindKeyUp(keyCode, commandCode);
        };

        /**
         * @param {Number} keyCode
         */
        Manipulator.prototype.unbindKeyUp = function(keyCode) {
            this.controls.unbindKeyUp(keyCode);
        };

        /**
         * @param {Manipulator} manipulator
         * @param {Event} event
         *
         * @returns {string}
         */
        function getCommandCode(manipulator, event) {
            var controls = manipulator.controls;
            var keyCode = event.keyCode;
            var eventType = event.type;

            if (eventType === InputEvent.KEY_DOWN) {
                return controls.getKeyDownBinding(keyCode);
            } else if (eventType === InputEvent.KEY_UP) {
                return controls.getKeyUpBinding(keyCode);
            } else {
                return NULL_COMMAND;
            }
        }

        /**
         * @param {Manipulator} manipulator
         * @param {Event} event
         */
        function sendCommand(manipulator, event) {
            var commandListener = manipulator.commandListener;
            var commandCode = getCommandCode(manipulator, event);

            if (commandCode !== NULL_COMMAND) {
                var commandListenerArguments = Array.prototype.slice.call(manipulator.commandListenerArguments);
                commandListenerArguments.push(commandCode);
                commandListener.apply(commandListener, commandListenerArguments);
            }
        }

        return Manipulator;
    });