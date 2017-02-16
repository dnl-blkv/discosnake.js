define(['engine/graphics/Color'], function(Color) {
    'use strict';

    /**
     * @var {Color}
     */
    var color;

    describe('Color', function() {
        beforeEach(function() {
            color = new Color(0, 127, 255);
            color.setAlpha(1);
        });

        it('generates HEX string', function() {
            expect(color.generateHexString()).toEqual('#007FFF');
        });

        it('compares to other Color', function() {
            expect(color.equals(color.copy())).toEqual(true);
            expect(color.equals(new Color(0, 128, 255))).toEqual(false);
        });

        it('is not equal to same color with different Alpha', function() {
            var colorWithDifferentAlpha = color.copy();
            colorWithDifferentAlpha.setAlpha(0.5);
            expect(color.equals(colorWithDifferentAlpha)).toEqual(false);
        });

        it('instantiates from HEX string', function() {
            expect(color.equals(Color.createFromHexString('#007FFF'))).toEqual(true);
        });

        it('gets HEX values of channels', function() {
            expect(color.getRedHex()).toEqual('00');
            expect(color.getGreenHex()).toEqual('7F');
            expect(color.getBlueHex()).toEqual('FF');
        });

        it('generates RGBA string', function() {
            color.setAlpha(0.4);
            expect(color.generateRgbaString()).toEqual('rgba(0, 127, 255, 0.4)');
        });

        it('blends', function() {
            expect(color.blend(new Color(192, 1, 1), 0.5).generateHexString()).toEqual('#604080');
        });
    });
});