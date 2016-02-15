'use strict';

const fs = require('fs');

const errorFileName = 'maplesyrup_error.log';
const expectedInput = `
<# of patterns>
<pattern1>
<patternN>
<# of paths>
<path1>
<pathN>
`;

const errors = {
    INPUT: `The input was incorrect, expected the following format:${expectedInput}`,
    PATH: `No match for invalid path`,
    PATTERN: `Skipping invalid pattern`
}

//create types object where { error_key: error_key } for each key in `errors`
const types = Object.keys(errors).reduce((o,k) => { o[k] = k; return o; }, {});

/**
 * Write an error with a time stamp to a file.
 * 
 * @param  {String} type  an all caps string representing the type of error
 * @param  {String} value an optional value to print after the error message
 * @return {void}
 */
function logError(type, value) {
    const now = new Date().toTimeString().split(' ')[0];//hh:mm:ss
    fs.appendFile(errorFileName, `[${now}]: ${errors[type]} ${value}\n`, () => { /* ignore errors while writing to error log */ });
}

module.exports = {
    logError,
    types
};