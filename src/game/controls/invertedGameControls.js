define([
        '../commands/CommandCode',
        'engine/input/Controls',
        'engine/input/KeyCode'
    ],
    function(
        CommandCode,
        Controls,
        KeyCode
    ) {
        return (function () {
            var invertedControls = new Controls();
            invertedControls.bindKeyDown(KeyCode.LEFT, CommandCode.DIRECT_SNAKE_RIGHT);
            invertedControls.bindKeyDown(KeyCode.UP, CommandCode.DIRECT_SNAKE_DOWN);
            invertedControls.bindKeyDown(KeyCode.RIGHT, CommandCode.DIRECT_SNAKE_LEFT);
            invertedControls.bindKeyDown(KeyCode.DOWN, CommandCode.DIRECT_SNAKE_UP);
            invertedControls.bindKeyDown(KeyCode.SPACE, CommandCode.TOGGLE_PAUSE);

            return invertedControls;
        })();
    });