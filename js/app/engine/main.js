define([
	'./graphics/main',
	'./input/main',
	'./utils/main',
	'./ui/main'
], function (
		graphics,
		input,
		utils,
		ui
	) {
	'use strict';

	return {
		graphics: graphics,
		input: input,
		utils: utils,
		ui: ui
	}
});