# maplesyrup

## Requirements

NodeJS v4.3.0

## Installation

`npm install -g maplesyrup`

## Usage

`maplesyrup < input_file > output_file`

## Task:

Given a list of patterns and a list paths, for each path find a pattern from the list of patterns that best describes the path.

## Solution:

To help us think about the problem, let's give a definition to few things:

1. Number of paths is N
1. Number of patterns is M
1. A path delimiter is one of: forward slash, beginning of line, end of line
1. A pattern delimiter is one of: comma, beginning of line, end of line
1. A path segment is a single piece of path that is contained between two path delimiters
1. A pattern segment is a single piece of pattern that is contained between two path delimiters
1. A length of pattern or a path is the number of segments they have
1. Index of a segment is its position from left to right
1. Avarage length of a path is K
1. Average length of a pattern is P

Let's also assume that in order for a pattern to match a path:

1. They must have the same length
1. Each segment of a path must match a segment of a pattern of the same index

### The obvious way

We have to check each path against each pattern which gives us O(N * M) or more precisely O(N * K * M).

### Using a tree 

Using a tree allows us to minimize number of possible matches for each consecutive segment.

1. Construct a pattern tree in O(M * log(M * P)).
1. Traverse the tree once for each path in O(N * K * log(M))

### Further optimizations

It might be possible to further optimize the algorithm by comparing the size of N and M. For example, for a really large M and small N it would be faster to skip the tree construction.

### Notes

- Referencing children using a hashmap inside the pattern tree plays a big role in performance gains. It allows us to not enumerate through all the patterns and instead only look at the ones with matching segments.

- To learn about a specific term, open the corresponding file in lib. For example, a `path` is defined in *./lib/path.js*

- Next step for this project is to create automated unit tests.
