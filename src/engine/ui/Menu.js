define([
        'engine/graphics/DisplayObject',
        './UiEventType'
    ],
    function(
        DisplayObject,
        UiEventType
    ) {
        'use strict';

        /**
         * @type {string}
         */
        var BACKGROUND_COLOR = '#000000';

        /**
         * @type {string}
         */
        var BACKGROUND_BORDER_COLOR = '#FFFFFF';

        /**
         * @type {number}
         */
        var MENU_PADDING_TOP = 10;
        var MENU_PADDING_RIGHT = 20;
        var MENU_PADDING_BOTTOM = 15;
        var MENU_PADDING_LEFT = 27;

        /**
         * @param {Graphics} graphics
         *
         * @constructor
         * @extends DisplayObject
         */
        function Menu(graphics) {
            DisplayObject.call(this, 0, 0, 0, 0);
            this.graphics = graphics;
            this.items = [];
            this.focusedItemId = 0;
            this.itemSelectedListener = null;
            this.itemSelectedListenerArguments = null;
            this.backgroundColor = BACKGROUND_COLOR;
            this.backgroundBorderColor = BACKGROUND_BORDER_COLOR;
            this.html = document.createElement('div');
            addItemAddedEventListener(this);
            this.updateHtmlStyle();
            this.hide();
        }

        Menu.prototype = Object.create(DisplayObject.prototype);
        Menu.prototype.constructor = Menu;

        /**
         * @param {Menu} menu
         */
        function addItemAddedEventListener(menu) {
            menu.html.addEventListener(UiEventType.DOM_NODE_INSERTED, createDomNodeInsertedEventListener(menu), false);
        }

        /**
         * @param {Menu} menu
         *
         * @returns {function}
         */
        function createDomNodeInsertedEventListener(menu) {
            return function() {
                rescale(menu);
            };
        }

        /**
         * @param {Menu} menu
         */
        function rescale(menu) {
            updateWidth(menu);
            updateHeight(menu);
        }

        /**
         * @param {Menu} menu
         */
        function updateWidth(menu) {
            var graphics = menu.graphics;
            var menuWidth = 0;
            var itemsCount = menu.getItemsCount();

            for (var i = 0; i < itemsCount; i += 1) {
                var focusedItem = getFocusedItem(menu);
                var focusedItemWidth = focusedItem.determineWidth(graphics);

                if (menuWidth < focusedItemWidth) {
                    menuWidth = focusedItemWidth;
                }

                menu.focusNextItem();
            }

            menu.setWidth(Math.round(menuWidth));
        }

        /**
         * @param {number} width
         */
        Menu.prototype.setWidth = function(width) {
            console.log(width);
            DisplayObject.prototype.setWidth.call(this, width + MENU_PADDING_LEFT + MENU_PADDING_RIGHT);
            this.html.style.width = width + 'px';
        };

        /**
         * @param {Menu} menu
         */
        function updateHeight(menu) {
            var height = 0;
            var itemsCount = menu.getItemsCount();

            for (var i = 0; i < itemsCount; i += 1) {
                var item = menu.getItemById(i);
                var itemHTML = item.getHtml();

                height += itemHTML.offsetHeight;
            }

            menu.setHeight(height);
        }

        /**
         * @param {number} height
         */
        Menu.prototype.setHeight = function(height) {
            DisplayObject.prototype.setHeight.call(this, height + MENU_PADDING_BOTTOM + MENU_PADDING_TOP);
            this.html.style.height = height + 'px';
        };

        /**
         * @param {Menu} menu
         * @param {number} itemId
         */
        function focusItemById(menu, itemId) {
            var focusedItem = getFocusedItem(menu);

            if (focusedItem) {
                focusedItem.deselect();
            }

            var itemsCount = menu.getItemsCount();

            if (itemsCount !== 0) {
                menu.focusedItemId = (itemId + itemsCount) % itemsCount;
            } else {
                throw 'Could not select a menu item: no items added!';
            }

            var itemToFocus = getFocusedItem(menu);

            if (itemToFocus) {
                itemToFocus.select();
            }
        }

        /**
         */
        Menu.prototype.focusNextItem = function() {
            focusItemById(this, this.focusedItemId + 1);
        };

        /**
         */
        Menu.prototype.focusPreviousItem = function() {
            focusItemById(this, this.focusedItemId - 1);
        };

        /**
         */
        Menu.prototype.focusFirstItem = function() {
            focusItemById(this, 0);
        };

        /**
         * @return {MenuItem}
         */
        function getFocusedItem(menu) {
            return menu.getItemById(menu.focusedItemId);
        }

        /**
         */
        Menu.prototype.setItemSelectedListener = function() {
            var args = Array.prototype.slice.call(arguments);
            this.itemSelectedListener = args[0];
            this.itemSelectedListenerArguments = args.slice(1, args.length);
        };

        /**
         */
        Menu.prototype.selectCurrentItem = function() {
            var itemSelectedListener = this.itemSelectedListener;
            var itemSelectedListenerArguments = this.itemSelectedListenerArguments.slice(0);
            var focusedItem = getFocusedItem(this);
            var focusedItemActionCode = focusedItem.getActionCode();
            itemSelectedListenerArguments.push(focusedItemActionCode);
            this.itemSelectedListener.apply(itemSelectedListener, itemSelectedListenerArguments);
        };

        /**
         * @param {MenuItem} item
         */
        Menu.prototype.addItem = function(item) {
            if (this.getItemsCount() === 0) {
                item.select();
            }

            this.items.push(item);
            var itemHtml = item.getHtml();
            this.html.appendChild(itemHtml);
        };

        /**
         * @returns {number}
         */
        Menu.prototype.getItemsCount = function() {
            return this.items.length;
        };

        /**
         * @param {number} index
         *
         * @returns {MenuItem}
         */
        Menu.prototype.getItemById = function(index) {
            return this.items[index];
        };

        /**
         * @returns {Element}
         */
        Menu.prototype.getHtml = function() {
            return this.html;
        };

        /**
         */
        Menu.prototype.hide = function() {
            this.html.style.visibility = 'hidden';
        };

        /**
         */
        Menu.prototype.reveal = function() {
            this.html.style.visibility = 'visible';
        };

        /**
         * @returns {boolean}
         */
        Menu.prototype.isVisible = function() {
            return this.html.style.visibility === 'visible';
        };

        /**
         */
        Menu.prototype.updateHtmlStyle = function() {
            var html = this.html;
            html.className = 'menu unselectable default-cursor';
            html.style.borderColor = this.backgroundBorderColor;
            html.style.borderStyle = 'solid';
            html.style.borderWidth = '1px';
            updatePadding(this, [MENU_PADDING_TOP, MENU_PADDING_RIGHT, MENU_PADDING_BOTTOM, MENU_PADDING_LEFT]);
            html.style.backgroundColor = this.backgroundColor;
            html.style.position = 'absolute';
            html.style.whiteSpace = 'nowrap';
            html.style.left = '50%';
            html.style.top = '50%';
        };

        function updatePadding(menu, paddings) {
            menu.html.style.padding = generatePixelPaddingString(paddings);
        }

        function generatePixelPaddingString(paddings) {
            paddings.push('');

            return paddings.join('px ');
        }

        /**
         */
        Menu.prototype.center = function() {
            var html = this.html;
            html.style.marginTop = '-' + this.getHeight() / 2 + 'px';
            html.style.marginLeft = '-' + this.getWidth() / 2 + 'px';
        };

        return Menu;
    });