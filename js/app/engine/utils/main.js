define([
    './colorUtils',
    './htmlUtils',
    './numberUtils',
    './timeUtils'
], function(
    colorUtils,
    htmlUtils,
    numberUtils,
    timeUtils
    ) {
    'use strict';

    return {
        colorUtils: colorUtils,
        HtmlUtils: htmlUtils,
        numberUtils: numberUtils,
        TimeUtils: timeUtils
    };
});