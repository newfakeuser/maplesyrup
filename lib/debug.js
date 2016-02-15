'use strict';

const defaultIndent = '  ';

/**
 * Recursively go through every node in a tree and print their segment name to stdout.
 * Each subsequent tree level has one additional indent.
 * 
 * @param  {Object} tree   the patternNode from which to start traversing the tree
 * @param  {String} indent a set of characters used to indent the current node (default: two spaces)
 * @return {void}
 */
function printTree(tree, indent) {
    //default parameter values are not yet supported in node v4, use helper instead
    printTreeHelper(tree, indent || defaultIndent, '')
}

/**
 * Helper for `printTree`
 * Recursively go through every node in a tree and print their segment name to stdout.
 * Each subsequent tree level has one additional indent.
 * 
 * @param  {Object} tree          the patternNode from which to start traversing the tree
 * @param  {String} indent        a set of characters used to indent the current node
 * @param  {String} currentIndent current indentation
 * @return {void}
 */
function printTreeHelper(tree, indent, currentIndent) {
    console.log(`${currentIndent}${tree.segment || 'root'} - ${tree.rank}`);
    for(const key in tree.children) {
        const newIndent = currentIndent + indent;
        printTreeHelper(tree.children[key], indent, newIndent);
    }
}

module.exports = {
    printTree
}