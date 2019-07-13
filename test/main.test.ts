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
});
