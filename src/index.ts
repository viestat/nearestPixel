import { nearestPixel } from "./nearestPixel";
import { parseInput } from "./util";

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
  const { cases, t } = parseInput(input);
  const results = cases.map(({ n, m, matrix }) => {
    return nearestPixel(n, m, matrix).map((el) => el.join(" ")).join("\n");
  });

  /* tslint:disable: no-console */
  console.clear();
  console.log(results.join("\n"));
});
