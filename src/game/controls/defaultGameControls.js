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
            var defaultControls = new Controls();
            defaultControls.bindKeyDown(KeyCode.LEFT, CommandCode.DIRECT_SNAKE_LEFT);
            defaultControls.bindKeyDown(KeyCode.UP, CommandCode.DIRECT_SNAKE_UP);
            defaultControls.bindKeyDown(KeyCode.RIGHT, CommandCode.DIRECT_SNAKE_RIGHT);
            defaultControls.bindKeyDown(KeyCode.DOWN, CommandCode.DIRECT_SNAKE_DOWN);
            defaultControls.bindKeyDown(KeyCode.SPACE, CommandCode.TOGGLE_PAUSE);

            return defaultControls;
        })();
    });