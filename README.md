# nearestPixel

Solution to **distance to the nearest white pixel** task.

[![CircleCI](https://circleci.com/gh/viestat/nearestPixel.svg?style=svg)](https://circleci.com/gh/viestat/nearestPixel)

## Intro
Given a rectangular bitmap of size `n*m`. Each pixel of the bitmap is either white (denoted by a `1`) or black (denoted by a `0`), with at least one white present.

The pixel in i-th line and j-th column is called the pixel `(i,j)`. The distance between two pixels `p1=(i1,j1)` and `p2=(i2,j2)` is defined as `d(p1,p2)=|i1-i2|+|j1-j2|`.

The program should read the description of the bitmap from the __standard input__ and for each pixel, compute the **distance to the nearest white**. It should write the results to the __standard output__.

## Overview
* [Requirements](#requirements)
* [Quick start](#quick-start)
* [Input Details](#input-details)
* [Ouput Details](#ouput-details)

## Requirements
The following needs to be installed in order to run this program:
- Node >= `v12.6.0`
- npm >= `6.9.0`

## Quick start

1. Download or clone the repo
1. `cd` into the root directory of the project
1. Install the dependencies by running: ` npm install`
1. Run: ` npm build` 
1. Run: ` npm start`
1. Enter your input and signal exit with `<Ctrl>+D`

## Input Details
The input should comply to the following format:
- The first line contains the number of test cases `t` (`1≤t≤1000`).
The following lines contain `t` test cases separated by an empty line, where each is structured as follows:
  - The first line contains the dimensions of the bitmap, representend by a pair of numbers `n` and `m` separated by a single space (`1<=n <=182` and `1<=m<=182`).
  - The following `n` lines of the test case are each the description of one line (of size `m`) of the bitmap.

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

## Ouput Details
The program will only print to the `stdout` once there is nothing else read in the `stdin`. This is trigered by using `<Ctrl>+D`.

The output is a collection of lines of integers denoting the distance to the nearest white pixel, separated by a `white space`. The position of the integers corresponds to the location of the pixels in each input case. So the output for the [input shown in the previous section](#input-details) would look like this:
```
0 1
1 0

3 2 1 0
2 1 0 0
1 0 0 1

```


