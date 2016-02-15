'use strict';

/**
 * PatternTreeNode definition:
 * {
 *     segment: {String}                           - name of this node
 *     patternSoFar: {String}                      - complete pattern from the root to this node
 *     children: {HashMap<String, PatterTreeNode>} - children of the current node
 *     parent: {PatternTreeNode}                   - parent of the current node, 
 *                                                   `null` parent means that this node is the root node
 *     rank: {Number}                              - total number of wildcards from the root to this node
 *     isCompletePattern: {Boolean}                - true iff there is a pattern that ends with this node
 * }
 *
 * pattern definition:
 * A segmented string with `,` as a delimiter
 */


const segStr = require('./segmentedString');

const wildCard = '*';
const delimiter = ',';


/**
 * create new PatternTreeNode
 * 
 * @param  {String} segment  a string used to 'name' this node
 * @return {PatternTreeNode} new PatternTreeNode
 */
function createPatternTreeNode(segment) {
    return {
        segment,
        patternSoFar: segment,
        children: {},
        parent: null,
        rank: 0,
        isCompletePattern: false
    };
}

/**
 * normalize segmented string using `,` as delimiter
 * 
 * @param  {String} str string to be normalized
 * @return {String}     a new normalized string
 */
function normalizePattern(str) {
    return segStr.normalizeSegmentedString(str, delimiter);
}

/**
 * check if given string is a segmented string with `,` as delimiter
 * 
 * @param  {String}  str string to be checked
 * @return {Boolean}     true iff string passes the check
 */
function isPattern(str) {
    return segStr.isNormalizedSegmentedString(str, delimiter);
}

/**
 * Adds given pattern to the pattern tree that starts with the given PatternTreeNode
 * 
 * @param {String} pattern a pattern
 * @param {void}
 */
function addPatternToTree(pattern, treeRoot) {
    const nodes = pattern.split(delimiter).map(createPatternTreeNode);
    for (let ii = 0; ii < nodes.length; ii++) {
        const node = nodes[ii];
        const parent = ii ? nodes[ii-1] : treeRoot;
        if (!parent.children[node.segment]) {
            parent.children[node.segment] = node;
            node.parent = parent;
            node.patternSoFar = parent.parent ? `${parent.patternSoFar}${delimiter}${node.segment}` : node.segment;
            node.rank = parent.rank
            if(node.segment === wildCard) {
                node.rank++;
            }
        } else {
            nodes[ii] = parent.children[node.segment];
        }
    }
    nodes[nodes.length - 1].isCompletePattern = true;
}

/**
 * given a segmented string, its delimiter, a root PatternTreeNode
 * find a pattern in the tree that best describes given segmented string
 * 
 * @param  {String} segmentedString          a segmented string for which a pattern must be found
 * @param  {String} segStrDel                a delimiter used in a given segmented string
 * @param  {PatterTreeNode} treeRoot         a PatternTreeNode that is the root of tree to be searched
 * @param  {PatterTreeNode} notFoundTreeNode a PatternTreeNode to use if not pattern was found
 * @return {String}                          a pattern that best describes the given segmented string
 */
function findPatternsInTree(segmentedString, segStrDel, treeRoot, notFoundTreeNode) {
    const segments = segmentedString.split(segStrDel);
    let currentNodes = [treeRoot];
    let nextNodes = [];
    for (let ii = 0; ii < segments.length; ii++) {
        const segment = segments[ii];
        currentNodes.forEach((node) => {
            if(node.children[segment]){
                nextNodes.unshift(node.children[segment]);
            }
            if(node.children[wildCard]){
                nextNodes.push(node.children[wildCard]);
            }
        });
        currentNodes = nextNodes;
        nextNodes = [];
    }
    currentNodes = currentNodes
        .filter(node => node.isCompletePattern)
        .sort((n1, n2) => n2.rank - n1.rank);
    return (currentNodes.pop() || notFoundTreeNode).patternSoFar;
}

module.exports = {
    delimiter,
    isPattern,
    normalizePattern,
    addPatternToTree,
    findPatternsInTree,
    createPatternTreeNode
}