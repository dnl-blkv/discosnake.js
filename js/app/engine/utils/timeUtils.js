define([],
    function() {
        'use strict';

        /**
         * @returns {Number}
         */
        function timeNow() {
            /**
             * @var {Performance} performance
             */
            if (performance.now) {
                return performance.now() + performance.timing.navigationStart;
            } else {
                return Date.now();
            }
        }

        /**
         * Redefine Date.now for our purposes.
         */
        (function() {
            if (!Date.now) {
                Date.now = function() {
                    (new Date()).getTime();
                };
            }
        })();

        /**
         * Define if needed requestAnimationFrame and cancelAnimationFrame.
         */
        (function() {
            /**
             * Cross-browser support for requestAnimationFrame
             * Adapted from https://gist.github.com/paulirish/1579671 which derived from
             * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
             * http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
             *
             * requestAnimationFrame polyfill by Erik Möller.
             * Fixes from Paul Irish, Tino Zijdel, Andrew Mao, Klemen Slavič, Darius Bacon
             * MIT license
             */

            var vendors = ['webkit', 'moz'];

            for (var i = 0; i < vendors.length && !window.requestAnimationFrame; i += 1) {
                var vp = vendors[i];
                window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
                window.cancelAnimationFrame = (
                    window[vp + 'CancelAnimationFrame'] ||
                    window[vp + 'CancelRequestAnimationFrame']
                );
            }

            if (
                /iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || // iOS6 is buggy
                !window.requestAnimationFrame || !window.cancelAnimationFrame
            ) {
                var lastTime = 0;

                window.requestAnimationFrame = function(callback) {
                    var now = timeNow();
                    var nextTime = Math.max(lastTime + 16, now);

                    return setTimeout(
                        function() {
                            callback(lastTime = nextTime);
                        },
                        nextTime - now
                    );
                };

                window.cancelAnimationFrame = clearTimeout;
            }
        }());

        return {
            timeNow: timeNow,
            requestAnimationFrame: window.requestAnimationFrame,
            cancelAnimationFrame: window.cancelAnimationFrame
        };
    });
