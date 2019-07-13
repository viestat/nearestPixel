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
  process.stdout.write(input);
});
