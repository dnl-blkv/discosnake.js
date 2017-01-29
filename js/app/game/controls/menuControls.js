define([
        'game/commands/CommandCode',
        'engine'
    ],
    function (
        CommandCode,
        engine
    ) {

        var Controls = engine.input.Controls;
        var KeyCode = engine.input.KeyCode;

        function createMenuControls () {
            var menuControls = new Controls();

            menuControls.bindKeyDown(KeyCode.DOWN, CommandCode.NEXT_MENU_ITEM);
            menuControls.bindKeyDown(KeyCode.ENTER, CommandCode.SELECT_MENU_ITEM);
            menuControls.bindKeyDown(KeyCode.SPACE, CommandCode.TOGGLE_PAUSE);
            menuControls.bindKeyDown(KeyCode.UP, CommandCode.PREVIOUS_MENU_ITEM);

            return menuControls;
        }

        return createMenuControls();
    });