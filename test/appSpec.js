define(['engine/graphics/Color'], function(Color) {
    'use strict';

    /**
     * @var {Color}
     */
    var color;

    beforeEach(function() {
        color = new Color(0, 127, 255);
    });

    describe('Color', function() {
        it('gets HEX values of channels', function() {
            expect(color.getRedHex()).toEqual('00');
            expect(color.getGreenHex()).toEqual('7F');
            expect(color.getBlueHex()).toEqual('FF');
        });

        it('generates HEX string', function() {
            expect(color.generateHexString()).toEqual('#007FFF');
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