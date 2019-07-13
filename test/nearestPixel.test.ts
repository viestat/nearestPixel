import { nearestPixel } from "../src/nearestPixel";
describe("NearestPixel", () => {
  describe("Returns the right value for each input", () => {
    const testCases = [
      {
        expected: [
          [0],
        ],
        input: [
          [1],
        ],
        size: [1, 1],
      },
      {
        expected: [
          [0, 1],
          [1, 0],
        ],
        input: [
          [1, 0],
          [0, 1],
        ],
        size: [2, 2],
      },
      {
        expected: [
          [3, 2, 1, 0],
          [2, 1, 0, 0],
          [1, 0, 0, 1],
        ],
        input: [
          [0, 0, 0, 1],
          [0, 0, 1, 1],
          [0, 1, 1, 0],
        ],
        size: [3, 4],
      },
    ];

    const testGen = (spec: { input: any; expected: any; size: any; }, i: number) => {
      const { input, expected, size } = spec;
      const n = size[0];
      const m = size[1];
      test(`Case ${i + 1}: Bitmap of size ${n}*${m}`, () => {
        const result = nearestPixel(n, m, input);
        expect(result).toEqual(expected);
      });
    };

    testCases.forEach(testGen);
  });
});
