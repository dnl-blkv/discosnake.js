define([],
    function() {
        'use strict';

        return {
            // Null command
            NULL_COMMAND: 'nullCommand',

            // Snake control commands
            DIRECT_SNAKE_DOWN: 'turnSnakeDown',
            DIRECT_SNAKE_LEFT: 'turnSnakeLeft',
            DIRECT_SNAKE_RIGHT: 'turnSnakeRight',
            DIRECT_SNAKE_UP: 'turnSnakeUp',

            // Game management commands
            TOGGLE_PAUSE: 'togglePause',

            // Menu navigation commands
            NEXT_MENU_ITEM: 'nextMenuItem',
            PREVIOUS_MENU_ITEM: 'previousMenuItem',
            SELECT_MENU_ITEM: 'selectMenuItem',

            // Menu actions commands
            CONTINUE_GAME: 'continueGame',
            NEW_GAME: 'newGame'
        }
    });