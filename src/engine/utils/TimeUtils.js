define([],
    function() {
        'use strict';

        /**
         * @returns {number}
         */
        function timeNow() {
            /**
             * @var {Performance} performance
             */
            if (performance.now) {
                return performance.now() + performance.timing.navigationStart;
            } else if (Date.now) {
                return Date.now();
            } else {
                return (new Date()).getTime();
            }
        }

        return {
            timeNow: timeNow
        };
    });
