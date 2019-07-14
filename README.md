# nearestPixel

Solution to **distance to the nearest white pixel** task.

[![CircleCI](https://circleci.com/gh/viestat/nearestPixel.svg?style=svg)](https://circleci.com/gh/viestat/nearestPixel)

## Intro

Given a rectangular bitmap of size `n*m`. Each pixel of the bitmap is either
white (denoted by a `1`) or black (denoted by a `0`), with at least one white
present.

The pixel in i-th line and j-th column is called the pixel `(i,j)`. The distance
between two pixels `p1=(i1,j1)` and `p2=(i2,j2)` is defined as
`d(p1,p2)=|i1-i2|+|j1-j2|`.

The program should read the description of the bitmap from the **standard
input** and for each pixel, compute the **distance to the nearest white**. It
should write the results to the **standard output**.

## Overview

- [Requirements](#requirements)
- [Quick start](#quick-start)
- [Input Details](#input-details)
- [Output Details](#output-details)

## Requirements

The following needs to be installed in order to run this program:

- Node >= `v12.6.0`
- npm >= `6.9.0`

## Quick start

1. Download or clone the repo
1. `cd` into the root directory of the project
1. Install the dependencies by running: `npm install`
1. Run: `npm build`
1. Run: `npm start`
1. Enter your input and signal exit with `<Ctrl>+D`

## Input Details

The input should comply to the following format:

- The first line contains the number of test cases `t` (`1≤t≤1000`). The
  following lines contain `t` test cases separated by an empty line, where each
  is structured as follows:
  - The first line contains the dimensions of the bitmap, represented by a pair
    of numbers `n` and `m` separated by a single space (`1<=n <=182` and
    `1<=m<=182`).
  - The following `n` lines of the test case are each the description of one
    line (of size `m`) of the bitmap.

It should look like this:

```
2
2 2
10
01

3 4
0001
0011
0110
```

## Output Details

The program will only print to the `stdout` once there is nothing else read in
the `stdin`. This is triggered by using `<Ctrl>+D`.

The output is a collection of lines of integers denoting the distance to the
nearest white pixel, separated by a `white space`. The position of the integers
corresponds to the location of the pixels in each input case. So the output for
the [input shown in the previous section](#input-details) would look like this:

```
0 1
1 0

3 2 1 0
2 1 0 0
1 0 0 1

```

## Approach

### Parsing

In order to able to process the input it is convenient to parse it into
something more usable than a string containing all the data. We extract the
following:

- The number of test cases (`t`) as an **integer**
- The dimensions of the bitmap (`n` and `m`) as **integers**
- The bitmap(s) as an **array of arrays** where each internal array is filled
  with **integers** (1's and 0's)

This process is handled by a utility function called `parseInput` located
[here](src/util.ts)

### Processing

The first thing that comes to mind is being able to traverse each pixel and
check if it the pixel or any of its close neighbors are white pixels, doing the
same for each of the neighbors, since we want to check for all the close pixels
before moving this suggests we do a **breath first traversal**. This is easily
achieved by adding the immediate neighbors of the pixel being processed to a
`queue`.

Before processing anything we initialize one queue from a first pass on the
bitmap that enqueues the white pixel locations. This will allow us to have
"different starts" for the traversal - one start for each white pixel. Since we
want to be able to calculate the distance we also need to keep a reference to
the location of the white pixel and pass it on to each of the pixels we
traverse.

Since the problem statement requires that we need to find the nearest distance
to a white pixel, we also need to have something to compare to since we will
have as many different traversals as there are white pixels. We need to know
which of the distances is the minimum. For that we initialize an **array of
arrays** with the same dimensions as the bitmap but filled with `Infinity`
instead since it is the is greater than any other number (we will refer to this
array as `result`).

Now that we have the initial set of pixels to be processed (`queue`) and the
holder of the computed distances (`result`) we can start processing. We will do
so **for as long as there are items in the queue**. We take the first element
from it and, using its location (`i`, `j`) and reference to the original white
pixel (`root`), we can calculate the distance. Knowing this allows us to compare
if the distance we got for pixel (`i`, `j`) is smaller than the one currently
recorded at `result[i][j]` and if it is, replace it with the smaller one.

We then proceed to "discovering" the immediate neighbors. To do so we have
defined their locations in an **array of tuples** called `closePixels`. It
contains 4 possible directions to discover (up, right, down, left). We verify if
the neighbor exists within the dimensions of the bitmap and if its distance to
the root is smaller. If this is the case we replace the distance for that
location in the `result` array and then enqueue the neighbor with the same
`root` reference as the parent.

Once we run out of elements in the queue we should have the `response` array
filled with all the minimum distances from white pixels.

This process is handled by a function called `nearestPixel` located
[here](src/nearestPixel.ts)
