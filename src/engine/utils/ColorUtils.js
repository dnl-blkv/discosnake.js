define([
        "engine/utils/NumberUtils",
        "engine/graphics/Color"
    ],
    function(
        NumberUtils,
        Color
    ) {
        "use strict";

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
            var h = NumberUtils.getRandomNumber(hLimits.from, hLimits.to);
            var sLimits = limits.s;
            var s = NumberUtils.getRandomNumber(sLimits.from, sLimits.to);
            var vLimits = limits.v;
            var v = NumberUtils.getRandomNumber(vLimits.from, vLimits.to);

            return Color.createFromHSV(h, s, v);
        }

        return {
            pickRandomColor: pickRandomColor,
            pickRandomPsychedelicColor: pickRandomPsychedelicColor
        };
    });