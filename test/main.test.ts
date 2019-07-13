import { fork } from "child_process";
import path from "path";

describe("Module I/O", () => {
  const modulePath = path.join(__dirname, "..", "dist", "src", "index.js");
  test("Recive input over stdin and returns output over stdout", (done) => {
    const main = fork(modulePath, [], {
      cwd: path.join(__dirname, "..", "src"),
      stdio: "pipe",
    });
    const input = "Any string should do";

    if (!main.stdout || !main.stdin) {
      return;
    }
    main.stdout.on("data", (data) => {
      main.kill("SIGINT");
      expect(data).toBeTruthy();
      done();
    });
    main.stdin.write(input);
    main.stdin.emit("end");
  });
  test("Returns the right output over stdout", (done) => {
    const main = fork(modulePath, [], {
      cwd: path.join(__dirname, "..", "src"),
      stdio: "pipe",
    });
    const input = "1\n3 4\n0001\n0011\n0110";

    if (!main.stdout || !main.stdin) {
      return;
    }
    main.stdout.on("data", (data) => {
      main.kill("SIGINT");
      expect(data.toString()).toBe("3 2 1 0\n2 1 0 0\n1 0 0 1\n");
      done();
    });
    main.stdin.write(input);
    main.stdin.emit("end");
  });
});
