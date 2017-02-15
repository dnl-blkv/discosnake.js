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
            expect(color.generateRgbaString(0.5)).toEqual('rgba(0, 127, 255, 0.5)');
        });
    });
});