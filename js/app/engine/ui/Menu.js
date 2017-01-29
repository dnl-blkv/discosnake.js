define([
        'engine/graphics/DisplayObject',
        './UiEventType'
    ],
    function(
            DisplayObject,
            UiEventType
        ) {
        'use strict';

        function Menu() {
            DisplayObject.call(this, 0, 0, 0, 0);
            this.items = [];
            this.focusedItemId = 0;
            this.itemSelectedListener = null;
            this.itemSelectedListenerArguments = null;
            this.backgroundColor = '#000000';
            this.backgroundBorderColor = '#FFFFFF';
            this.html = document.createElement('div');

            this.html.addEventListener(UiEventType.DOM_NODE_INSERTED, createDomNodeInsertedEventListener(this), false);

            this.updateHtmlStyle();
            this.hide();
        }

        Menu.prototype = Object.create(DisplayObject.prototype);
        Menu.prototype.constructor = Menu;

        /**
         * @param {Menu} menu
         *
         * @returns {function}
         */
        function createDomNodeInsertedEventListener(menu) {
            return function() {
                calculateDimensions(menu);
            };
        }


        function calculateDimensions(menu) {

            // Hide the menu saving the previous state
            var wasRevealed = !menu.isHidden();

            menu.hide();

            // Calculate the menu width
            var width = 0;

            var itemsCount = menu.getItemsCount();

            var i, item, itemHTML, itemWidth, itemHeight;

            // TODO: Bad temporal way to set menu width
            menu.getHTML().style.width = '300px';

            for (i = 0; i < itemsCount; i += 1) {
                item = getFocusedItem(menu);
                itemHTML = item.getHTML();
                itemWidth = itemHTML.offsetWidth;

                if (width < itemWidth) {
                    width = itemWidth;
                }

                menu.focusNextItem();
            }

            var html = menu.getHTML();

            // Save the item width
            menu.setWidth(width);
            html.style.width = width + 'px';

            // Calculate the item height
            var height = 0;

            for (i = 0; i < itemsCount; i += 1) {
                item = menu.getItemAt(i);
                itemHTML = item.getHTML();
                itemHeight = itemHTML.offsetHeight;

                height += itemHeight;
            }

            menu.setHeight(height);
            html.style.height = height + 'px';

            // Restore the menu visibility
            if (wasRevealed) {
                menu.reveal();
            }
        }

        // Focus an item
        function focusItemById(menu, itemId) {

            var oldFocusedItem = getFocusedItem(menu);

            if (oldFocusedItem) {
                oldFocusedItem.unfocus();
            }

            var itemsCount = menu.getItemsCount();

            if (itemsCount !== 0) {
                menu.focusedItemId = (itemId + itemsCount) % itemsCount;
            } else {
                console.log('COULD NOT FOCUS A MENU ITEM: NO ITEMS ADDED');
            }

            var newFocusedItem = getFocusedItem(menu);

            if (newFocusedItem) {
                newFocusedItem.focus();
            }
        }

        Menu.prototype.focusNextItem = function() {
            focusItemById(this, this.focusedItemId + 1);
        };

        Menu.prototype.focusPreviousItem = function() {
            focusItemById(this, this.focusedItemId - 1);
        };

        Menu.prototype.focusFirstItem = function() {
            focusItemById(this, 0);
        };

        function getFocusedItem(menu) {
            var focusedItemId = menu.focusedItemId;

            return menu.getItemAt(focusedItemId);
        }

        Menu.prototype.setItemSelectedListener = function() {
            var args = Array.prototype.slice.call(arguments);

            this.itemSelectedListener = args[0];
            this.itemSelectedListenerArguments = args.slice(1, args.length);
        };

        Menu.prototype.selectCurrentItem = function() {
            var itemSelectedListener = this.itemSelectedListener;
            var itemSelectedListenerArguments = this.itemSelectedListenerArguments.slice(0);

            // Add the action code to the arguments
            var focusedItem = getFocusedItem(this);
            var focusedItemActionCode = focusedItem.getActionCode();

            itemSelectedListenerArguments.push(focusedItemActionCode);

            this.itemSelectedListener.apply(itemSelectedListener, itemSelectedListenerArguments);
        };

        Menu.prototype.addItem = function(item) {
            var itemsCount = this.getItemsCount();

            if (itemsCount === 0) {
                item.focus();
            }

            this.items.push(item);

            // Add Item HTML representation
            var itemHTML = item.getHTML();

            this.html.appendChild(itemHTML);
        };

        Menu.prototype.getItemsCount = function() {
            return this.items.length;
        };

        Menu.prototype.getItemAt = function(index) {
            return this.items[index];
        };

        // ************
        // HTML METHODS
        // ************
        Menu.prototype.getHTML = function() {
            return this.html;
        };

        Menu.prototype.hide = function() {
            this.getHTML().style.visibility = 'hidden';
        };

        Menu.prototype.reveal = function() {
            this.getHTML().style.visibility = 'visible';
        };

        Menu.prototype.isHidden = function() {
            var hidden = this.getHTML().style.visibility === 'hidden';

            return hidden;
        };

        Menu.prototype.updateHtmlStyle = function() {
            var html = this.html;

            html.className = 'menu unselectable default-cursor';
            html.style.borderColor = this.backgroundBorderColor;
            html.style.borderStyle = 'solid';
            html.style.borderWidth = '1px';
            html.style.padding = '10px 10px 15px 17px';
            html.style.backgroundColor = this.backgroundColor;
            html.style.position = 'absolute';
            html.style.whiteSpace = 'nowrap';
            html.style.left = '50%';
            html.style.top = '50%';
        };

        Menu.prototype.center = function()
        {
            var html = this.html;

            html.style.marginTop = '-' + this.getHeight() / 2 + 'px';
            html.style.marginLeft = '-' + this.determineWidth() / 2 + 'px';
        };

        return Menu;
    });