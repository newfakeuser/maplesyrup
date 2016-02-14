'use strict';

const readline = require('readline');
const syrup = require('./lib/syrup');

process.stdin.setEncoding('utf8');

const rl = readline.createInterface({
  input: process.stdin,
  output: null
});

rl.on('line', syrup);
rl.on('close', () => { process.exit(0) });