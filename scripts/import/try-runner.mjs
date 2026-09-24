import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pythonHarness } from "../../src/lib/pyodide/harness.ts";

const [codePath, testsPath, mode = "pyodide"] = process.argv.slice(2);
const source = fs.readFileSync(codePath, "utf8");
const tests = fs.readFileSync(testsPath, "utf8");

let payload;

if (mode === "cpython") {
  const harnessPath = path.join(os.tmpdir(), "ink-harness-cpython.py");
  fs.writeFileSync(harnessPath, pythonHarness, "utf8");

  const driver = [
    "import json, sys",
    "ns = {}",
    "exec(compile(open(sys.argv[1], encoding='utf-8').read(), 'harness', 'exec'), ns)",
    "print(ns['_ink_run_tests'](sys.argv[2], sys.argv[3]))",
  ].join("; ");

  const out = execFileSync(
    "python",
    ["-c", driver, harnessPath, source, tests],
    {
      encoding: "utf8",
      maxBuffer: 10 * 1024 * 1024,
    },
  );

  fs.rmSync(harnessPath, { force: true });
  payload = JSON.parse(out);
} else {
  const out = execFileSync(process.execPath, ["src/server/verify-runner.mjs"], {
    input: JSON.stringify({ harness: pythonHarness, code: source, tests }),
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024,
  });

  const line = out
    .split("\n")
    .find((entry) => entry.startsWith("__INK_RESULT__"));

  if (!line) {
    console.error(out);
    process.exit(1);
  }

  payload = JSON.parse(line.slice("__INK_RESULT__".length));
}

const failing = payload.tests.filter((test) => !test.passed);

console.log(
  `status=${payload.status} ${failing.length === 0 ? "PASS" : "FAIL"} ${payload.tests.length - failing.length}/${payload.tests.length}`,
);

if (payload.error) {
  console.log(payload.error);
}

for (const test of payload.tests) {
  console.log(
    `  ${test.passed ? "ok  " : "fail"} ${test.name}${test.passed ? "" : ` — ${test.message}`}`,
  );
}
