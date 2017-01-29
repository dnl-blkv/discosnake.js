define([
    './Controls',
    './InputEvent',
    './KeyCode',
    './Manipulator'
], function(
        Controls,
        InputEvent,
        KeyCode,
        Manipulator
    ) {
    'use strict';

    return {
        Controls: Controls,
        InputEvent: InputEvent,
        KeyCode: KeyCode,
        Manipulator: Manipulator
    }
});