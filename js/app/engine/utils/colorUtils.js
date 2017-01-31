define([
        "engine/utils/numberUtils",
        "engine/graphics/Color"
    ],
    function(
        numberUtils,
        Color
    ) {
        "use strict";

        /**
         * @type {function}
         */
        var getRandomNumber = numberUtils.getRandomNumber;

        /**
         * @returns {Color}
         */
        function pickRandomPsychedelicColor() {
            var dimensionLimits = {
                "h": {
                    "from": 0,
                    "to": 0.99
                },
                "s": {
                    "from": 0.85,
                    "to": 0.99
                },
                "v": {
                    "from": 0.99,
                    "to": 0.99
                }
            };

            return pickRandomColor(dimensionLimits);
        }

        /**
         * @param {Object} limits
         *
         * @returns {Color}
         */
        function pickRandomColor(limits) {
            var hLimits = limits.h;
            var h = getRandomNumber(hLimits.from, hLimits.to);
            var sLimits = limits.s;
            var s = getRandomNumber(sLimits.from, sLimits.to);
            var vLimits = limits.v;
            var v = getRandomNumber(vLimits.from, vLimits.to);

            return Color.createFromHSV(h, s, v);
        }

        return {
            pickRandomColor: pickRandomColor,
            pickRandomPsychedelicColor: pickRandomPsychedelicColor
        };
    });