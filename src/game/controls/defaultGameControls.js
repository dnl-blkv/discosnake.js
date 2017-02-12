define([
        '../commands/CommandCode',
        'engine'
    ],
    function(
        CommandCode,
        engine
    ) {

        var Controls = engine.input.Controls;
        var KeyCode = engine.input.KeyCode;

        function createDefaultControls() {
            var defaultControls = new Controls();
            defaultControls.bindKeyDown(KeyCode.LEFT, CommandCode.DIRECT_SNAKE_LEFT);
            defaultControls.bindKeyDown(KeyCode.UP, CommandCode.DIRECT_SNAKE_UP);
            defaultControls.bindKeyDown(KeyCode.RIGHT, CommandCode.DIRECT_SNAKE_RIGHT);
            defaultControls.bindKeyDown(KeyCode.DOWN, CommandCode.DIRECT_SNAKE_DOWN);
            defaultControls.bindKeyDown(KeyCode.SPACE, CommandCode.TOGGLE_PAUSE);

            return defaultControls;
        }

        return createDefaultControls();
    });