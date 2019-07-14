/**
 * Calculates distance between two points
 * @param p1 - First point
 * @param p2 - Second point
 * @returns distance between p1 and p2
 */
const calcDistance = (p1: number[], p2: number[]) => {
  return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
};

/**
 * For each pixel, calculates the distance to the nearest white pixel
 * @param n - Number of lines
 * @param m - Number of columns
 * @param bitmap - 2D Array containing the pixels (0: Black, 1: White)
 * @returns 2D Array containing the nearest distance of each pixel(i, j) to a white one
 */
const nearestPixel = (n: number, m: number, bitmap: number[][]): number[][] => {
  // Init result matrix with Infinity for max distance comparison
  const result = new Array(n).fill(null).map(() => new Array(m).fill(Infinity));
  // Relative position of adyacent pixels (respectively: up, right, down, left)
  const closePixels = [[1, 0], [0, 1], [-1, 0], [0, -1]];
  // Init queue with white pixel locations and a reference to itself as root
  const queue = bitmap.reduce(
    (acc: Array<{ location: number[]; root: number[] }>, row, i) => {
      row.forEach((pixel, j) => {
        if (pixel === 1) {
          acc.push({
            location: [i, j],
            root: [i, j],
          });
        } else if (pixel !== 0) {
          throw new Error("Bitmap should only contain either 1 or 0");
        }
      });
      return acc;
    },
    [],
  );

  if (queue.length === 0) {
    throw new Error("Bitmap should contain at least one 1");
  }

  /**
   * Check if the location is valid and if its distance to the root is smaller
   * @param neighbor - location of the pixel to check
   * @param root - location of the root pixel
   */
  const canAdd = (pixel: number[], root: number[]) => {
    const [i, j] = pixel;
    // Check if location is within bitmap dimensions
    if (i >= 0 && i < n && j >= 0 && j < m) {
      // Check for distance to root
      return result[i][j] > calcDistance([i, j], root);
    }
    return false;
  };

  // Start queue processing
  while (queue.length > 0) {
    // Process first element of the queue
    const current = queue.shift();
    const { location, root } = current!;
    // indexes for the current element
    const [currI, currJ] = location;
    // Number of possible neighbouring pixels
    const neighbours = closePixels.length;
    const currentToRoot = calcDistance(root, location);

    if (currentToRoot < result[currI][currJ]) {
      result[currI][currJ] = currentToRoot;
    }

    // Add adyacent pixels to the queue
    for (let i = 0; i < neighbours; i++) {
      const direction = closePixels[i];
      const nextI = direction[0] + currI;
      const nextJ = direction[1] + currJ;
      if (canAdd([nextI, nextJ], root)) {
        result[nextI][nextJ] = calcDistance([nextI, nextJ], root);
        queue.push({
          location: [nextI, nextJ],
          root,
        });
      }
    }
  }
  return result;
};

export { nearestPixel };
