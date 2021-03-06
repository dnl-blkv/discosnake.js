define([],
    function() {
        'use strict';

        /**
         * @param {HTMLElement} element
         */
        function centreElement(element) {
            element.style.position = 'absolute';
            var width = document.documentElement.clientWidth;
            element.style.left = (width - element.offsetWidth) / 2 + 'px';
            var height = document.documentElement.clientHeight;
            element.style.top = (height - element.offsetHeight) / 2 + window.pageYOffset + 'px';
        }

        /**
         * @param {number} fontSize
         * @param {string} fontName
         *
         * @returns {string}
         */
        function buildFontString(fontSize, fontName) {
            return '' + fontSize + 'px ' + fontName;
        }

        /**
         * @param {HTMLElement} element
         * @param {number} absoluteX
         * @param {number} absoluteY
         *
         * @returns {{x: number, y: number}}
         */
        function determineRelativeCoordinates(element, absoluteX, absoluteY) {
            var totalOffsetX = 0;
            var totalOffsetY = 0;
            var currentElement = element.offsetParent;

            while (currentElement) {
                totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
                totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
                currentElement = currentElement.offsetParent;
            }

            return {
                x: absoluteX - totalOffsetX,
                y: absoluteY - totalOffsetY
            };
        }

        /**
         * @param {HTMLElement} anchorElement
         * @param {Event} event
         *
         * @returns {{x: number, y: number}}
         */
        function determineRelativeMouseCoordinates(anchorElement, event) {
            return determineRelativeCoordinates(anchorElement, event.pageX, event.pageY);
        }

        // TODO: fix touch event!
        /**
         * @param {HTMLElement} element
         * @param {UIEvent} touchEvent
         *
         * @returns {{x: number, y: number}}
         */
        function determineRelativeLastTouchCoordinates(element, touchEvent) {
            var lastTouchId = touchEvent.touches.length - 1;

            return determineRelativeTouchCoordinates(element, touchEvent.touches[lastTouchId]);
        }

        // TODO: fix touch!
        /**
         * @param {HTMLElement} element
         * @param {Touch} touch
         *
         * @returns {{x: number, y: number}}
         */
        function determineRelativeTouchCoordinates(element, touch) {
            var absoluteX = touch.clientX;
            var absoluteY = touch.clientY;

            return determineRelativeCoordinates(element, absoluteX, absoluteY);
        }

        /**
         * @returns {{width: (number), height: (number)}}
         */
        function getWindowSize() {
            return {
                width: window.innerWidth || document.body.clientWidth,
                height: window.innerHeight || document.body.clientHeight
            };
        }

        /**
         * @returns {HTMLElement}
         */
        function getBody() {
            return document.getElementsByTagName('body')[0];
        }

        return {
            centreElement: centreElement,
            buildFontString: buildFontString,
            determineRelativeCoordinates: determineRelativeCoordinates,
            determineRelativeLastTouchCoordinates: determineRelativeLastTouchCoordinates,
            determineRelativeMouseCoordinates: determineRelativeMouseCoordinates,
            determineRelativeTouchCoordinates: determineRelativeTouchCoordinates,
            getWindowsSize: getWindowSize,
            getBody: getBody
        };
    });

