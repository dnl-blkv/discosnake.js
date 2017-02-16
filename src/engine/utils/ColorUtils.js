define([
        'engine/utils/NumberUtils',
        'engine/graphics/Color'
    ],
    function(
        NumberUtils,
        Color
    ) {
        'use strict';

        /**
         * @returns {Color}
         */
        function pickRandomPsychedelicColor() {
            var dimensionLimits = {
                'hue': {
                    'from': 0,
                    'to': 357
                },
                'saturation': {
                    'from': 0.85,
                    'to': 0.99
                },
                'value': {
                    'from': 0.99,
                    'to': 0.99
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
            var hueRange = limits.hue;
            var hue = NumberUtils.getRandomNumber(hueRange.from, hueRange.to);

            var saturationRange = limits.saturation;
            var saturation = NumberUtils.getRandomNumber(saturationRange.from, saturationRange.to);

            var valueRange = limits.value;
            var value = NumberUtils.getRandomNumber(valueRange.from, valueRange.to);

            return Color.createFromHsv(hue, saturation, value);
        }

        return {
            pickRandomColor: pickRandomColor,
            pickRandomPsychedelicColor: pickRandomPsychedelicColor
        };
    });