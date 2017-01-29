define([],
    function () {
        'use strict';

        function centreElement (element) {
            var width = document.documentElement.clientWidth;
            var height = document.documentElement.clientHeight;

            element.style.position = 'absolute';
            element.style.left = (width - element.offsetWidth)/2 + 'px';
            element.style.top = (height - element.offsetHeight)/2 + window.pageYOffset + 'px';
        }

        function buildFontString (fontSize, fontName) {
            var fontString = '' + fontSize + 'px ' + fontName;

            return fontString;
        }

        function relCoords(element, absoluteX, absoluteY){
            var totalOffsetX = 0;
            var totalOffsetY = 0;
            var currentElement = element;

            do {
                totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
                totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
            }
            while (currentElement = currentElement.offsetParent);

            var xOnElement = absoluteX - totalOffsetX;
            var yOnElement = absoluteY - totalOffsetY;

            return {
                x: xOnElement,
                y: yOnElement
            }
        }

        function relMouseCoords (element, event) {
            var absoluteX = event.pageX;
            var absoluteY = event.pageY;

            return relCoords(element, absoluteX, absoluteY);
        }

        function relLastTouchCoords (element, touchEvent) {
            var lastTouchId = touchEvent.touches.length - 1;

            return relTouchCoords(element, touchEvent.touches[lastTouchId]);
        }

        function relTouchCoords (element, touch) {
            var absoluteX = touch.clientX;
            var absoluteY = touch.clientY;

            return relCoords(element, absoluteX, absoluteY);
        }

        function getWindowSize () {
            return {
                width: window.innerWidth || document.body.clientWidth,
                height: window.innerHeight || document.body.clientHeight
            }
        }

        function getBody () {
            return document.getElementsByTagName('body')[0];
        }

        return {
            centreElement: centreElement,
            buildFontString: buildFontString,
            relCoords: relCoords,
            relLastTouchCoords: relLastTouchCoords,
            relMouseCoords: relMouseCoords,
            relTouchCoords: relTouchCoords,
            getWindowsSize: getWindowSize,
            getBody: getBody
        };
    });

