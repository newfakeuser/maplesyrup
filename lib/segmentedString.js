'use strict';
/**
 * segmented string definition:
 * a string consisted of other strings called segments that are separated by delimiters.
 * 
 * delimiter definition:
 * a single character used as a bread between segments in segmented string
 *
 * segment definition:
 * a string that doesn't contain the delimiter character
 */

/**
 * remove all leading and trailing char from given str
 * 
 * @param  {String} str  string to trim
 * @param  {String} char character to trim
 * @return {String}      a new string
 */
function trimChar(str, char) {
    return str.replace(new RegExp(`(^${char}|${char}$)`, 'g'), '');
}

/**
 * normalize a segmented string in three steps:
 * 1. trim all whitespace from beginning and end
 * 2. replace any occurrences of delimiter repeating more than once in a row
 * 3. trim any leading or trailing delimiters
 * 
 * @param  {String} line the segmented string that needs to be normalized
 * @param  {String} del  the delimiter used to segment the string
 * @return {String}      a new, normalized string
 */
function normalizeSegmentedString(line, del) {
    return trimChar(line.trim().replace(new RegExp(`${del}${del}+`, 'g'), del), del);
}

/**
 * check if the given string is a normalized segmented string
 * 
 * @param  {String}  line the string that needs to be checked
 * @param  {String}  del  the delimiter used to segment the string
 * @return {Boolean}      true if given string is a normalized segmented string, false otherwise
 */
function isNormalizedSegmentedString(line, del) {
    return new RegExp(`^[^${del}]+(${del}[^${del}]+)*$`).test(line);
}

module.exports = {
    normalizeSegmentedString,
    isNormalizedSegmentedString
}