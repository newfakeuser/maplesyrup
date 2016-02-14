'use strict';

let readingPattrens = false;
let readingPaths = false;
const wildCard = '*';
const patternDel = ',';
const pathDel = '/';
const noMatch = 'NO MATCH';
const nodeNotFound = { patternSoFar: 'NO MATCH' };
const patternTreeRoot = {
    isRoot: true,
    children: [],
    rank: 0
};

const expectedInput = `
<# of patterns>
<pattern1>
<patternN>
<# of paths>
<path1>
<pathN>
`;

const errors = {
    wrongInput: `The input was incorrect, expected the following format: ${expectedInput}`
}

function createPatternNode(segment) {
    return {
        segment,
        patternSoFar: segment,
        children: {},
        parent: patternTreeRoot,
        depth: -1,
        isCompletePattern: false
    };
}

function trimChar(str, char) {
    return str.replace(new RegExp(`(^${char}|${char}$)`, 'g'), '');
}

function normalizePattern(line) {
    return trimChar(line.trim().replace(new RegExp(`${patternDel}${patternDel}+`, 'g'), patternDel), patternDel);
}

function normalizePath(line) {
    return trimChar(line.trim().replace(new RegExp(`${pathDel}${pathDel}+`, 'g'), pathDel), pathDel);
}

function isPath(line) {
    return /^[^\/]+(\/[^\/]+)*$/.test(line);
}

function isPattern(line) {
    return /^[^,]+(,[^,]+)*$/.test(line);
}

function addPatternToTree(pattern) {
    const nodes = pattern.split(patternDel).map(createPatternNode);
    for (let ii = 0; ii < nodes.length; ii++) {
        const node = nodes[ii];
        const parent = ii ? nodes[ii-1] : patternTreeRoot;
        if (!parent.children[node.segment]) {
            parent.children[node.segment] = node;
            node.parent = parent;
            node.patternSoFar = parent.isRoot ? node.segment : `${parent.patternSoFar}${patternDel}${node.segment}`;
            node.depth = ii+1;
            node.rank = parent.rank
            if(node.segment === wildCard) {
                node.rank++;
            }
        } else {
            nodes[ii] = parent.children[node.segment];
        }
    }
    nodes[nodes.length - 1].isCompletePattern = true;
    return patternTreeRoot;
}

function findPatternsInTree(path, treeRoot) {
    const segments = path.split(pathDel);
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
    return (currentNodes.pop() || nodeNotFound).patternSoFar;
}

function printTree(tree, indent) {//eslint-disable-line no-unused-vars
    console.log(`${indent || ''}${tree.segment || 'root'} - ${tree.rank}`);
    for(const key in tree.children) {
        printTree(tree.children[key], `${indent || ''}  `);
    }
}

module.exports = function(line) {
    const num = parseInt(line, 10);
    const isNumber = !Number.isNaN(num) && !new RegExp(patternDel).test(line);
    if (readingPattrens && !isNumber) {
        const pattern = normalizePattern(line);
        if (!isPattern(pattern)) {
            //TODO: write errors to file instead
            console.error(`Skipping invalid pattern '${pattern}'`);
        }
        addPatternToTree(pattern);
    } else if (readingPaths) {
        const path = normalizePath(line);
        if (!isPath(path)) {
            //TODO: write errors to file instead
            console.error(`No match for invalid papath '${path}'`);
            console.log(noMatch);
        } else {
            console.log(findPatternsInTree(path, patternTreeRoot));
        }
    } else if (isNumber) {
        if (!readingPattrens) {
            readingPattrens = true;
        } else {
            readingPattrens = false;
            readingPaths = true;
        }
    } else {
        throw new Error(errors.wrongInput)
    }
}
