define([
		'engine'
	],
	function (
		engine
	) {
		'use strict';
		var MenuItem = engine.ui.MenuItem;
		var graphicUtils = engine.utils.graphicUtils;

		function DiscoSnakeMenuItem (actionCode, text, fontSize, fontFamily, defaultColor, maxWidth) {

			var randomPsychedelicColor = graphicUtils.getRandomPsychedelicColor();
			var focusedColor = randomPsychedelicColor.getHexString();

			MenuItem.call(this, actionCode, text, fontSize, fontFamily, defaultColor, focusedColor, maxWidth);
		}

		DiscoSnakeMenuItem.prototype = Object.create(MenuItem.prototype);
		DiscoSnakeMenuItem.prototype.constructor = DiscoSnakeMenuItem;

		DiscoSnakeMenuItem.prototype.focus = function () {
			var randomPsychedelicColor = graphicUtils.getRandomPsychedelicColor();

			this.focusedColor = randomPsychedelicColor.getHexString();

			MenuItem.prototype.focus.call(this);
		};

		DiscoSnakeMenuItem.prototype.updateHTMLStyle = function () {
			MenuItem.prototype.updateHTMLStyle.call(this);

			var html = this.getHTML();

			html.style.lineHeight = '95%';
		};

		return DiscoSnakeMenuItem;
	});