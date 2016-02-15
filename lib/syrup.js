'use strict';

const error = require('./error');
const pattern = require('./pattern');
const path = require('./path');

const noMatch = 'NO MATCH';
const patternTreeRootNode = pattern.createPatternTreeNode();
const patternTreeNotFoundNode = pattern.createPatternTreeNode(noMatch);

const stages = { INIT: 0, PATTERN_COUNT: 1, READING_PATTERNS: 2, PATH_COUNT: 3, READING_PATHS: 4, FINAL: 4 };
let currentStage = stages.INIT;

function isCount(str) {
    return /^\d+$/.test(str.trim());
}

/**
 * Parse an input line using the following criteria:
 * 1. if line read is an integer
 *     - increment the current stage
 * 2. if the stage is PATH_COUNT or PATTERN_COUNT
 *     - increment the current stage
 *     - ignore the input
 * 3. if the stage is READING_PATTERNS
 *     - try to add pattern to the pattern tree
 * 4. if the stage is READING_PATHS
 *     - try to find a patter that best describes the given path
 *
 * @param  {String} line a string of text that needs to be processed
 * @return {void}
 */
module.exports = function(line) {
    if(isCount(line)) {
        currentStage++;
    }
    switch(currentStage) {
        case stages.PATH_COUNT:
        case stages.PATTERN_COUNT:
            currentStage++;
            break;
        case stages.READING_PATTERNS: {
            const normalizedPattern = pattern.normalizePattern(line);
            if (!pattern.isPattern(normalizedPattern)) {
                error.logError(error.types.PATTERN, line);
            } else {
                pattern.addPatternToTree(normalizedPattern, patternTreeRootNode);
            }
            break;
        }
        case stages.READING_PATHS:
        case stages.FINAL:
        default: {
            const normalizedPath = path.normalizePath(line);
            if (!path.isPath(normalizedPath)) {
                error.logError(error.types.PATH, line);
                console.log(noMatch);
            } else {
                console.log(pattern.findPatternsInTree(normalizedPath, path.delimiter, patternTreeRootNode, patternTreeNotFoundNode));
            }
            break;
        }
    }
}
