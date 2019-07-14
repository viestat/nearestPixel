import { parseInput } from "../src/util";

describe("Utilities", () => {
  describe("parseInput", () => {
    test("Should parse whith one case", () => {
      const input = "1\n3 4\n0001\n0011\n0110";
      const expected = {
        cases: [
          {
            m: 4,
            matrix: [[0, 0, 0, 1], [0, 0, 1, 1], [0, 1, 1, 0]],
            n: 3,
          },
        ],
        t: 1,
      };
      const result = parseInput(input);
      expect(result).toEqual(expected);
    });
    test("Should parse whith two cases", () => {
      const input = "2\n3 3\n000\n001\n011\n\n3 4\n0001\n0011\n0110";
      const expected = {
        cases: [
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
        ],
        t: 2,
      };
      const result = parseInput(input);
      expect(result).toEqual(expected);
    });
    describe("Should parse whith multiple cases", () => {
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
          expected: {
            cases: genExpectedCases(20),
            t: 20,
          },
          input: genInput(20),
        },
        {
          expected: {
            cases: genExpectedCases(400),
            t: 400,
          },
          input: genInput(400),
        },
        {
          expected: {
            cases: genExpectedCases(1000),
            t: 1000,
          },
          input: genInput(1000),
        },
      ];

      const testGen = (spec: { input: any; expected: any }, i: number) => {
        const { input, expected } = spec;
        test(`Case ${i + 1}: Should parse whith ${expected.t} cases`, () => {
          const result = parseInput(input);
          expect(result).toEqual(expected);
        });
      };

      testCases.forEach(testGen);
    });
    test("Should fail if input has wrong shape", () => {
      const input = "2\n4 3\n0001\n0011\n0110";
      expect(() => {
        parseInput(input);
      }).toThrow();
    });
  });
});
