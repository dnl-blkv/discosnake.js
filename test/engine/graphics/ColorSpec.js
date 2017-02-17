define(['../../../src/engine/graphics/Color'], function(Color) {
    'use strict';

    /**
     * @var {Color}
     */
    var color;

    describe('Color', function() {
        beforeEach(function() {
            color = createTestColor();
        });

        /**
         * @returns {Color}
         */
        function createTestColor() {
            var testColor = new Color(0, 127, 255);
            testColor.setAlpha(0.8);

            return testColor;
        }

        it('gets HEX values of channels', function() {
            expect(color.getRedHex()).toEqual('00');
            expect(color.getGreenHex()).toEqual('7F');
            expect(color.getBlueHex()).toEqual('FF');
        });

        it('generates HEX string', function() {
            expect(color.generateHexString()).toEqual('#007FFF');
        });

        it('generates RGBA string', function() {
            expect(color.generateRgbaString()).toEqual('rgba(0, 127, 255, 0.8)');
        });

        it('is equal to a similar Color', function() {
            expect(color.equals(createTestColor())).toEqual(true);
        });

        it('is not equal to a Color with a different color channel value', function() {
            expect(color.equals(new Color(0, 128, 255))).toEqual(false);
        });

        it('is not equal to a Color with different Alpha value', function() {
            expect(color.equals(copyColorWithDifferentAlpha())).toEqual(false);
        });

        /**
         * @returns {Color}
         */
        function copyColorWithDifferentAlpha() {
            var newColor = color.copy();
            var newAlpha = (newColor.getAlpha() + 0.9) % 1;
            newColor.setAlpha(newAlpha);

            return newColor;
        }

        it('can be copied', function() {
            expect(color.equals(color.copy())).toEqual(true);
        });

        it('instantiates from HEX string', function() {
            expect(color.equals(createTestColorFromHexString())).toEqual(true);
        });

        /**
         * @returns {Color}
         */
        function createTestColorFromHexString() {
            var testColor = Color.createFromHexString('#007FFF');
            testColor.setAlpha(0.8);

            return testColor;
        }

        it('instantiates from HSV', function() {
            expect(Color.createFromHsv(30, 0.8, 1).generateHexString()).toEqual('#FF9933');
            expect(Color.createFromHsv(90, 0.7, 0.9).generateHexString()).toEqual('#95E645');
            expect(Color.createFromHsv(150, 0.6, 0.6).generateHexString()).toEqual('#3D996B');
            expect(Color.createFromHsv(210.1, 1, 1).generateHexString()).toEqual('#007FFF');
            expect(Color.createFromHsv(270, 0.2, 0.9).generateHexString()).toEqual('#CFB8E6');
            expect(Color.createFromHsv(330, 0, 0.1).generateHexString()).toEqual('#1A1A1A');
        });

        it('blends', function() {
            expect(color.blend(new Color(192, 1, 1), 0.5).generateHexString()).toEqual('#604080');
        });
    });
});