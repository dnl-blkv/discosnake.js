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

            window.addEventListener(InputEvent.KEY_DOWN, createOnKeyDownEventListener(this), false);
            window.addEventListener(InputEvent.KEY_UP, createOnKeyUpEventListener(this), false);
        }

        /**
         * @param {Manipulator} manipulator
         *
         * @returns {function}
         */
        function createOnKeyDownEventListener(manipulator) {
            return function(event) {
                manipulator.onKeyDown(event);
            };
        }

        /**
         * @param {Manipulator} manipulator
         *
         * @returns {function}
         */
        function createOnKeyUpEventListener(manipulator) {
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
         * @param {number} keyCode
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
         * @param {number} keyCode
         * @param {string} commandCode
         */
        Manipulator.prototype.bindKeyDown = function(keyCode, commandCode) {
            this.controls.bindKeyDown(keyCode, commandCode);
        };

        /**
         * @param {number} keyCode
         */
        Manipulator.prototype.unbindKeyDown = function(keyCode) {
            this.controls.unbindKeyDown(keyCode);
        };

        /**
         * @param {number} keyCode
         * @param {string} commandCode
         */
        Manipulator.prototype.bindKeyUp = function(keyCode, commandCode) {
            this.controls.bindKeyUp(keyCode, commandCode);
        };

        /**
         * @param {number} keyCode
         */
        Manipulator.prototype.unbindKeyUp = function(keyCode) {
            this.controls.unbindKeyUp(keyCode);
        };

        /**
         * @param {Manipulator} manipulator
         * @param {Event} event
         * @returns {string}
         */
        function getCommandCode(manipulator, event) {
            var keyCode = event.keyCode;
            var type = event.type;
            var commandCode = NULL_COMMAND;
            var controls = manipulator.controls;

            switch (type) {
                case InputEvent.KEY_DOWN:
                    commandCode = controls.getKeyDownBinding(keyCode);
                    break;
                case InputEvent.KEY_UP:
                    commandCode = controls.getKeyUpBinding(keyCode);
                    break;
                default:
                    break;
            }

            if (commandCode === undefined) {
                commandCode = NULL_COMMAND;
            }

            return commandCode;
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