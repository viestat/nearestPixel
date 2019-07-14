import { nearestPixel } from "./nearestPixel";
import { formatOutput, parseInput } from "./util";

process.stdin.resume();
process.stdin.setEncoding("ascii");

let input = "";

/**
 * Chunks from readable stream will be colected here
 */
process.stdin.on("data", (chunk) => {
  input += chunk;
});

/**
 * Process the input once there is nothing else to read in stdin
 */
process.stdin.on("end", () => {
  const cases = parseInput(input);
  /**
   * Format the 2D array from nearestPixel into a collection of lines of integers denoting
   * the distance to the nearest white pixel, separated by a `white space`
   */
  const results = cases
    .map(({ n, m, matrix }) => {
      return formatOutput(nearestPixel(n, m, matrix));
    })
    .join("\n\n");

  /* tslint:disable: no-console */
  console.clear();
  console.log(results);
});
