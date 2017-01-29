define([
	'./graphicUtils',
	'./htmlUtils',
	'./numberUtils',
	'./timeUtils'
], function (
	graphicUtils,
	htmlUtils,
	numberUtils,
	timeUtils
	) {
	'use strict';

	return {
		graphicUtils: graphicUtils,
		HtmlUtils: htmlUtils,
		numberUtils: numberUtils,
		TimeUtils: timeUtils
	}
});