/**
 * Parses the input from a string to an object containig the elemnts for execution
 * @param input - Raw string containing:
 * The number of test cases t (1≤t≤1000) in the first line of input
 * t test cases separated by an empty line, where each is structured as follows:
 * - The first line has a pair of numbers n, m separated by a single space, 1<=n <=182, 1<=m<=182.
 * - The following n lines of the test case is the description of one line of the bitmap.
 * @returns Array of Objects with, each with the following items:
 * - `n` - Number of lines
 * - `m` - Number of colums
 * - `matrix` - 2D Array of integers
 */
const parseInput = (input: string) => {
  const cases = [];
  const lines = input.trim().split("\n");
  const t = parseInt(lines[0], 10);
  const rawCases = lines
    .slice(1)
    .join("\n")
    .split("\n\n");
  for (let i = 0; i < t; i++) {
    const caseLines = rawCases[i].split("\n");
    const [n, m] = caseLines[0].split(" ").map((val) => parseInt(val, 10));
    const matrix = caseLines.slice(1).map((line) => {
      return line.split("").map((val) => parseInt(val, 10));
    });
    cases.push({ n, m, matrix });
  }
  return cases;
};

/**
 * Format the 2D array into a collection of lines of integers denoting
 * the distance to the nearest white pixel, separated by a `white space`
 * @param cases - 2D array of integers
 * @returns String composed by a collection of lines of integers denoting the distance
 * to the nearest white pixel, separated by a `white space`
 */
const formatOutput = (results: number[][]) => {
  return results
    .map((line) => {
      return line.join(" ");
    })
    .join("\n");
};

export { parseInput, formatOutput };
