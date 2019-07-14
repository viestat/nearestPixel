import { parseInput, formatOutput } from "../src/util";

describe("Utilities", () => {
  describe("parseInput", () => {
    test("Parse whith one case", () => {
      const input = "1\n3 4\n0001\n0011\n0110";
      const expected = [
          {
            m: 4,
            matrix: [[0, 0, 0, 1], [0, 0, 1, 1], [0, 1, 1, 0]],
            n: 3,
          },
        ];
      const result = parseInput(input);
      expect(result).toEqual(expected);
    });
    test("Parse whith two cases", () => {
      const input = "2\n3 3\n000\n001\n011\n\n3 4\n0001\n0011\n0110";
      const expected = [
          {
            m: 3,
            matrix: [[0, 0, 0], [0, 0, 1], [0, 1, 1]],
            n: 3,
          },
          {
            m: 4,
            matrix: [[0, 0, 0, 1], [0, 0, 1, 1], [0, 1, 1, 0]],
            n: 3,
          },
        ];
      const result = parseInput(input);
      expect(result).toEqual(expected);
    });
    describe("Parse whith multiple cases", () => {
      const genInput = (t: number) => {
        let res = `${t}`;
        const str = "\n3 4\n0001\n0011\n0110";
        for (let i = 0; i < t; i++) {
          res = `${res}${str}\n`;
        }

        return res.trim();
      };
      const genExpectedCases = (t: number) => {
        return new Array(t).fill({
          m: 4,
          matrix: [[0, 0, 0, 1], [0, 0, 1, 1], [0, 1, 1, 0]],
          n: 3,
        });
      };
      const testCases = [
        {
          expected: genExpectedCases(20),
          input: genInput(20),
          t: 20,
        },
        {
          expected: genExpectedCases(400),
          input: genInput(400),
          t: 400,
        },
        {
          expected: genExpectedCases(1000),
          input: genInput(1000),
          t: 1000,
        },
      ];

      const testGen = (
        spec: { input: any; expected: any; t: number },
        i: number,
      ) => {
        const { input, expected, t } = spec;
        test(`Case ${i + 1}: Parse whith ${t} cases`, () => {
          const result = parseInput(input);
          expect(result).toEqual(expected);
        });
      };

      testCases.forEach(testGen);
    });
    test("Fail if input has wrong shape", () => {
      const input = "2\n4 3\n0001\n0011\n0110";
      expect(() => {
        parseInput(input);
      }).toThrow();
    });
  });
  describe("formatOutput", () => {
    describe("Format succesfully", () => {
      const testCases = [
        {
          expected: "0 1\n1 0",
          input: [[0, 1], [1, 0]],
        },
        {
          expected: "0 1 1 0\n0 1 1 1\n0 0 1 1\n1 0 1 1",
          input: [[0, 1, 1, 0], [0, 1, 1, 1], [0, 0, 1, 1], [1, 0, 1, 1]],
        },
      ];

      const testGen = (spec: { input: any; expected: string }, i: number) => {
        const { input, expected } = spec;
        test(`Case ${i + 1}`, () => {
          const result = formatOutput(input);
          expect(result).toEqual(expected);
        });
      };
      testCases.forEach(testGen);
    });
  });
});
