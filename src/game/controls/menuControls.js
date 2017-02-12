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
            var menuControls = new Controls();
            menuControls.bindKeyDown(KeyCode.DOWN, CommandCode.NEXT_MENU_ITEM);
            menuControls.bindKeyDown(KeyCode.ENTER, CommandCode.SELECT_MENU_ITEM);
            menuControls.bindKeyDown(KeyCode.SPACE, CommandCode.TOGGLE_PAUSE);
            menuControls.bindKeyDown(KeyCode.UP, CommandCode.PREVIOUS_MENU_ITEM);

            return menuControls;
        })();
    });