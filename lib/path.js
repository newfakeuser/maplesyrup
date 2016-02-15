'use strict';

/**
 * path definition:
 * A segmented string with `/` as a delimiter
 */


const segStr = require('./segmentedString');

const delimiter = '/';

/**
 * normalize segmented string using `/` as delimiter
 * 
 * @param  {String} str string to be normalized
 * @return {String}     a new normalized string
 */
function normalizePath(str) {
    return segStr.normalizeSegmentedString(str, delimiter);
}

/**
 * check if given string is a segmented string with `'` as delimiter
 * @param  {String}  str string to be checked
 * @return {Boolean}     true iff string passes the check
 */
function isPath(str) {
    return segStr.isNormalizedSegmentedString(str, delimiter);
}

module.exports = {
    delimiter,
    normalizePath,
    isPath
};
