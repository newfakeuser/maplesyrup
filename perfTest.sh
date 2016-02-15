#!/bin/bash
#
# unpack the sampleData100kx100k.7z and sampleData800kx800k.7z before executing

for i in {1..10}
do
    node index.js < sampleData10kx10k > output
done

for i in {1..10}
do
    node index.js < sampleData100kx100k > output
done

for i in {1..10}
do
    node index.js < sampleData800kx800k > output
done